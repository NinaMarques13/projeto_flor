/**
 * main.js — Manipulação de DOM
 *
 * Controla a interação do usuário com o decodificador de memórias:
 *  - Captura o clique no botão e a tecla Enter
 *  - Exibe o loader durante a requisição
 *  - Renderiza os cards da memória (foto + texto) com animação escalonada
 *  - Exibe mensagens de erro personalizadas
 */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Elementos ────────────────────────────────────────
    const inputCode     = document.getElementById('memory-code');
    const btnDecode     = document.getElementById('btn-decode');
    const errorArea     = document.getElementById('error-area');
    const errorText     = document.getElementById('error-text');
    const memorySection = document.getElementById('memory-section');
    const memoryTitle   = document.getElementById('memory-title');
    const memoryCards   = document.getElementById('memory-cards');

    // ─── Event Listeners ──────────────────────────────────
    btnDecode.addEventListener('click', handleDecode);

    inputCode.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleDecode();
        }
    });

    // ─── Handler principal ────────────────────────────────
    async function handleDecode() {
        const codigo = inputCode.value.trim();

        if (!codigo) {
            showError('✏️ Por favor, digite um código antes de desabrochar.');
            inputCode.focus();
            return;
        }

        hideError();
        hideMemory();
        btnDecode.disabled = true;

        try {
            const memoria = await fetchMemory(codigo);
            renderMemory(memoria);
        } catch (error) {
            showError(error.message);
        } finally {
            btnDecode.disabled = false;
        }
    }

    // ─── Renderização ─────────────────────────────────────

    /**
     * Renderiza a memória como um grid de cards (foto + texto).
     *
     * @param {Object} memoria - { titulo: string, cards: Array<{ imagem: string, texto: string }> }
     */
    function renderMemory(memoria) {
        memoryCards.innerHTML = '';

        // Título da memória
        memoryTitle.textContent = memoria.titulo || '';

        // Grid: single ou multi-coluna
        const isSingle = memoria.cards.length === 1;
        memoryCards.className = isSingle
            ? 'memory-cards memory-cards--single'
            : 'memory-cards';

        // Renderiza cada card com delay escalonado via CSS custom property
        memoria.cards.forEach((card, index) => {
            const article = createCard(card, index, memoria.titulo);
            memoryCards.appendChild(article);
        });

        showMemory();
    }

    /**
     * Cria um elemento <article> para um único card.
     *
     * @param {Object} card   - { imagem: string, texto: string }
     * @param {number} index  - posição no array (para animação escalonada)
     * @param {string} titulo - título da memória (para alt da imagem)
     */
    function createCard(card, index, titulo) {
        const article = document.createElement('article');
        article.className = 'memory-card';
        article.style.setProperty('--card-index', index);
        article.setAttribute('role', 'listitem');

        // Imagem
        const imageWrap = document.createElement('div');
        imageWrap.className = 'memory-card__image-wrap';

        const img = document.createElement('img');
        img.className = 'memory-card__image';
        img.src = card.imagem;
        img.alt = titulo
            ? `${titulo} — foto ${index + 1}`
            : `Memória, foto ${index + 1}`;
        img.loading = 'lazy';
        imageWrap.appendChild(img);

        // Texto
        const body = document.createElement('div');
        body.className = 'memory-card__body';

        const text = document.createElement('p');
        text.className = 'memory-card__text';
        text.textContent = card.texto || '';
        body.appendChild(text);

        article.appendChild(imageWrap);
        article.appendChild(body);
        return article;
    }

    // ─── UI Helpers ───────────────────────────────────────

    function showMemory() {
        memorySection.hidden = false;
        // Re-trigger entrada animation
        memorySection.style.animation = 'none';
        void memorySection.offsetHeight;
        memorySection.style.animation = '';
        // Scroll suave até a seção de memórias
        setTimeout(() => {
            memorySection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 80);
    }

    function hideMemory() {
        memorySection.hidden = true;
        memoryCards.innerHTML = '';
    }

    function showError(message) {
        hideMemory();
        errorText.textContent = message;
        errorArea.hidden = false;
        errorArea.style.animation = 'none';
        void errorArea.offsetHeight;
        errorArea.style.animation = '';
    }

    function hideError() {
        errorArea.hidden = true;
        errorText.textContent = '';
    }
});
