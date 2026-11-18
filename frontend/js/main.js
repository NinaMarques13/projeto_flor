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
        btnDecode.setAttribute('aria-busy', 'true');
        const buttonText = btnDecode.querySelector('.decoder__button-text');
        if (buttonText) buttonText.textContent = 'Desabrochando...';

        try {
            const memoria = await fetchMemory(codigo);
            renderMemory(memoria);
        } catch (error) {
            showError(error.message);
        } finally {
            btnDecode.disabled = false;
            btnDecode.removeAttribute('aria-busy');
            if (buttonText) buttonText.textContent = 'Desabrochar';
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
        if (memoria.layout === 'birthday') {
            memoryCards.classList.add('memory-cards--birthday');
        }

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

        if (typeof card.texto === 'string' && card.texto) {
            const text = document.createElement('p');
            text.className = 'memory-card__text';
            text.textContent = card.texto;
            body.appendChild(text);
        } else if (card.texto && typeof card.texto === 'object') {
            const formattedText = document.createElement('div');
            formattedText.className = 'memory-card__formatted-text';

            const heading = document.createElement('h3');
            heading.className = 'memory-card__formatted-title';
            heading.textContent = card.texto.titulo;
            formattedText.appendChild(heading);

            const highlight = document.createElement('p');
            highlight.className = 'memory-card__formatted-highlight';
            highlight.textContent = card.texto.destaque;
            formattedText.appendChild(highlight);

            if (Array.isArray(card.texto.fatores) && card.texto.fatores.length) {
                const factorsTitle = document.createElement('h4');
                factorsTitle.className = 'memory-card__formatted-label';
                factorsTitle.textContent = 'Fatores mencionados';
                formattedText.appendChild(factorsTitle);

                const factors = document.createElement('ul');
                factors.className = 'memory-card__formatted-list';
                card.texto.fatores.forEach((factor) => {
                    const item = document.createElement('li');
                    item.textContent = factor;
                    factors.appendChild(item);
                });
                formattedText.appendChild(factors);
            }

            const message = document.createElement('p');
            message.className = 'memory-card__formatted-message';
            message.textContent = card.texto.mensagem;
            formattedText.appendChild(message);
            body.appendChild(formattedText);
        }

        if (card.botao && card.destino) {
            const action = document.createElement('a');
            action.className = 'memory-card__action';
            action.href = card.destino;
            action.textContent = card.botao;
            body.appendChild(action);
        }

        article.appendChild(imageWrap);
        if (body.childElementCount) {
            article.appendChild(body);
        }
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
