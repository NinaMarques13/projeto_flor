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
 *     "cards": [
 *       { "imagem": "./assets/fotos/foto.jpg", "texto": "..." },
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
    } catch {
        throw new Error('⚠️ Não foi possível carregar as memórias. Tente recarregar a página.');
    }

    const memoria = todas[codigo.trim().toLowerCase()];

    if (!memoria) {
        throw new Error(
            '🔍 Código não encontrado. ' +
            'Verifique se digitou corretamente o código da pétala.'
        );
    }

    return memoria;
}
