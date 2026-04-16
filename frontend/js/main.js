/**
 * main.js — Manipulação de DOM
 *
 * Controla a interação do usuário com o decodificador de memórias:
 *  - Captura o clique no botão e a tecla Enter
 *  - Exibe o loader durante a requisição
 *  - Renderiza o resultado (texto, imagem ou vídeo) com animação
 *  - Exibe mensagens de erro personalizadas
 */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Elementos ───────────────────────────────────────
    const inputCode    = document.getElementById('memory-code');
    const btnDecode    = document.getElementById('btn-decode');
    const loader       = document.getElementById('loader');
    const resultArea   = document.getElementById('result-area');
    const resultContent = document.getElementById('result-content');
    const errorArea    = document.getElementById('error-area');
    const errorText    = document.getElementById('error-text');

    // ─── Event Listeners ─────────────────────────────────
    btnDecode.addEventListener('click', handleDecode);

    inputCode.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleDecode();
        }
    });

    // ─── Handler principal ───────────────────────────────
    async function handleDecode() {
        const codigo = inputCode.value.trim();

        if (!codigo) {
            showError('✏️ Por favor, digite um código antes de desabrochar.');
            inputCode.focus();
            return;
        }

        // Reset UI
        hideError();
        hideResult();
        showLoader();
        btnDecode.disabled = true;

        try {
            const memoria = await fetchMemory(codigo);
            renderMemory(memoria);
        } catch (error) {
            showError(error.message);
        } finally {
            hideLoader();
            btnDecode.disabled = false;
        }
    }

    // ─── Renderização de Memória ─────────────────────────

    /**
     * Renderiza o conteúdo de memória retornado pela API.
     * Suporta os tipos: texto, imagem e video.
     *
     * @param {Object} memoria - Objeto com { titulo?, tipo, conteudo }
     */
    function renderMemory(memoria) {
        resultContent.innerHTML = '';

        // Título (se presente)
        if (memoria.titulo) {
            const title = document.createElement('h2');
            title.className = 'memory-title';
            title.textContent = memoria.titulo;
            resultContent.appendChild(title);
        }

        // Conteúdo por tipo
        switch (memoria.tipo) {
            case 'texto':
                renderText(memoria.conteudo);
                break;

            case 'imagem':
                renderImage(memoria.conteudo, memoria.titulo);
                break;

            case 'video':
                renderVideo(memoria.conteudo);
                break;

            default:
                // Fallback: trata como texto
                renderText(memoria.conteudo);
        }

        showResult();
    }

    function renderText(conteudo) {
        const p = document.createElement('p');
        p.className = 'memory-text';
        p.textContent = conteudo;
        resultContent.appendChild(p);
    }

    function renderImage(url, alt) {
        const img = document.createElement('img');
        img.className = 'memory-image';
        img.src = url;
        img.alt = alt || 'Memória em imagem';
        img.loading = 'lazy';
        resultContent.appendChild(img);
    }

    function renderVideo(url) {
        // Detecta se é um link do YouTube e converte para embed
        const embedUrl = convertToEmbed(url);

        const iframe = document.createElement('iframe');
        iframe.className = 'memory-video';
        iframe.src = embedUrl;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.title = 'Vídeo de memória';
        resultContent.appendChild(iframe);
    }

    /**
     * Converte URLs de YouTube (watch, youtu.be, shorts) para o formato embed.
     * Se não for YouTube, retorna a URL original.
     */
    function convertToEmbed(url) {
        let videoId = null;

        // youtube.com/watch?v=ID
        const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
        if (watchMatch) videoId = watchMatch[1];

        // youtu.be/ID
        if (!videoId) {
            const shortMatch = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            if (shortMatch) videoId = shortMatch[1];
        }

        // youtube.com/shorts/ID
        if (!videoId) {
            const shortsMatch = url.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
            if (shortsMatch) videoId = shortsMatch[1];
        }

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }

        return url;
    }

    // ─── UI Helpers ──────────────────────────────────────

    function showLoader() {
        loader.hidden = false;
    }

    function hideLoader() {
        loader.hidden = true;
    }

    function showResult() {
        resultArea.hidden = false;
        // Re-trigger bloom animation
        resultArea.style.animation = 'none';
        // Force reflow
        void resultArea.offsetHeight;
        resultArea.style.animation = '';
    }

    function hideResult() {
        resultArea.hidden = true;
        resultContent.innerHTML = '';
    }

    function showError(message) {
        hideResult();
        errorText.textContent = message;
        errorArea.hidden = false;
        // Re-trigger fade-in
        errorArea.style.animation = 'none';
        void errorArea.offsetHeight;
        errorArea.style.animation = '';
    }

    function hideError() {
        errorArea.hidden = true;
        errorText.textContent = '';
    }
});
