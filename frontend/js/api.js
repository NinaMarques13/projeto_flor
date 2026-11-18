/**
 * api.js — Lógica de consumo dos dados de memórias
 *
 * Versão estática para GitHub Pages:
 * Os dados são carregados do arquivo local data/memories.json.
 * Nenhum servidor back-end é necessário.
 *
 * Formato de memories.json:
 * {
 *   "palavra-chave": {
 *     "titulo": "Nome da memória",
 *     "layout": "birthday", // opcional: layout especial de aniversário
 *     "cards": [
 *       { "imagem": "./assets/fotos/foto.jpg", "texto": "..." },
 *       { "imagem": "./assets/fotos/foto.jpg", "texto": {
 *         "titulo": "...", "destaque": "...", "fatores": ["..."], "mensagem": "..."
 *       } },
 *       ...
 *     ]
 *   }
 * }
 */

/**
 * Busca uma memória a partir do código digitado.
 *
 * @param {string} codigo - O código encontrado na pétala da rosa.
 * @returns {Promise<Object>} Dados da memória: { titulo, cards[] }
 * @throws {Error} Mensagens descritivas para código inválido ou falha de leitura.
 */
async function fetchMemory(codigo) {
    let todas;

    try {
        const response = await fetch('./data/memories.json');
        if (!response.ok) throw new Error('file_not_found');
        todas = await response.json();
        if (!todas || typeof todas !== 'object' || Array.isArray(todas)) {
            throw new Error('invalid_data');
        }
    } catch {
        throw new Error('⚠️ Não foi possível carregar as memórias. Tente recarregar a página.');
    }

    const codigoNormalizado = normalizarCodigo(codigo);
    const memoria = Object.entries(todas)
        .find(([chave]) => normalizarCodigo(chave) === codigoNormalizado)?.[1];

    if (!memoria) {
        throw new Error(
            '🔍 Código não encontrado. ' +
            'Verifique se digitou corretamente o código da pétala.'
        );
    }

    if (!Array.isArray(memoria.cards)) {
        throw new Error('⚠️ Esta memória está com o conteúdo indisponível. Tente novamente.');
    }

    return memoria;
}

function normalizarCodigo(codigo) {
    return codigo.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
