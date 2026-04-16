/**
 * api.js — Lógica de consumo da API
 *
 * Responsável por fazer requisições ao back-end Python (Flask)
 * para buscar memórias a partir de um código.
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Busca uma memória no servidor a partir do código fornecido.
 *
 * @param {string} codigo - O código encontrado na pétala da rosa.
 * @returns {Promise<Object>} Dados da memória retornados pela API.
 * @throws {Error} Lança erro com mensagens descritivas para cada cenário.
 *
 * Formato esperado de resposta da API (sucesso, status 200):
 * {
 *   "titulo":   "Nosso primeiro encontro",
 *   "tipo":     "texto" | "imagem" | "video",
 *   "conteudo": "Texto da memória..." | "url-da-imagem.jpg" | "url-do-video"
 * }
 *
 * Formato esperado de resposta da API (erro, status 404):
 * {
 *   "erro": "Memória não encontrada."
 * }
 */
async function fetchMemory(codigo) {
    const url = `${API_BASE_URL}/memory/${encodeURIComponent(codigo)}`;

    let response;

    try {
        response = await fetch(url);
    } catch (networkError) {
        throw new Error(
            '🌐 Não foi possível conectar ao servidor. ' +
            'Verifique se o back-end Python está rodando em http://localhost:5000.'
        );
    }

    if (response.status === 404) {
        throw new Error(
            '🔍 Código não encontrado. ' +
            'Verifique se digitou corretamente o código da pétala.'
        );
    }

    if (!response.ok) {
        throw new Error(
            `⚠️ Ocorreu um erro inesperado (status ${response.status}). ` +
            'Tente novamente em alguns instantes.'
        );
    }

    const data = await response.json();
    return data;
}
