"""
routes.py — Rotas da API

Banco de memórias sem SGBD: dicionário Python.
Cada chave é uma palavra-chave digitada pelo usuário.
Cada memória tem um título e uma lista de cards (foto + texto).

► Para adicionar/editar memórias: modifique o dict MEMORIAS abaixo.
► Para trocar palavras-chave: mude as chaves do dict.
► Para adicionar texto nos cards: preencha o campo "texto" de cada card.
"""

import os
from flask import Blueprint, jsonify, request, send_from_directory, current_app

bp = Blueprint('main', __name__)

# ─── Banco de Memórias ────────────────────────────────────────────────────────
# Estrutura:
#   "palavra-chave" → {
#       "titulo": str,
#       "cards":  [{ "foto": filename_em_fotos_flor, "texto": str }, ...]
#   }
#
# Os textos estão em branco — preencha quando quiser.
# ─────────────────────────────────────────────────────────────────────────────

MEMORIAS = {
    "0": {
        "titulo": "Memória 0",
        "cards": [
            {"foto": "foto_0.jpg",      "texto": ""},
            {"foto": "foto_0.1.jpg",    "texto": ""},
            {"foto": "lembrança_0.png", "texto": ""},
        ],
    },
    "1": {
        "titulo": "Memória 1",
        "cards": [
            {"foto": "foto_1.jpg",      "texto": ""},
            {"foto": "foto_1.1.jpg",    "texto": ""},
            {"foto": "foto_1.2.jpg",    "texto": ""},
            {"foto": "lembrança_1.png", "texto": ""},
        ],
    },
    "2": {
        "titulo": "Memória 2",
        "cards": [
            {"foto": "lembrança_2.png", "texto": ""},
        ],
    },
    "3": {
        "titulo": "Memória 3",
        "cards": [
            {"foto": "lembrança_3.png", "texto": ""},
        ],
    },
    "4": {
        "titulo": "Memória 4",
        "cards": [
            {"foto": "lembrança_4.png", "texto": ""},
        ],
    },
    "5": {
        "titulo": "Memória 5",
        "cards": [
            {"foto": "foto_5.jpg",      "texto": ""},
            {"foto": "foto_5.1.jpg",    "texto": ""},
            {"foto": "lembrança_5.png", "texto": ""},
        ],
    },
    "6": {
        "titulo": "Memória 6",
        "cards": [
            {"foto": "lembrança_6.png", "texto": ""},
        ],
    },
    "7": {
        "titulo": "Memória 7",
        "cards": [
            {"foto": "lembrança_7.png", "texto": ""},
        ],
    },
    "8": {
        "titulo": "Memória 8",
        "cards": [
            {"foto": "foto_8.jpg",       "texto": ""},
            {"foto": "foto_8.png",       "texto": ""},
            {"foto": "foto_8.1.png",     "texto": ""},
            {"foto": "lembrança_8.png",  "texto": ""},
            {"foto": "lembrança_8.1.png","texto": ""},
        ],
    },
}


# ─── Rota: buscar memória ─────────────────────────────────────────────────────

@bp.route('/api/memory/<string:codigo>')
def get_memory(codigo):
    """Retorna os dados de uma memória pelo código/palavra-chave."""
    memoria = MEMORIAS.get(codigo.strip().lower())
    if not memoria:
        return jsonify({"erro": "Memória não encontrada."}), 404

    # Constrói URLs absolutas para as imagens usando o host atual
    base_url = request.host_url.rstrip('/')
    result = {
        "titulo": memoria["titulo"],
        "cards": [
            {
                "imagem": f"{base_url}/fotos/{card['foto']}",
                "texto": card["texto"],
            }
            for card in memoria["cards"]
        ],
    }
    return jsonify(result)


# ─── Rota: servir fotos ───────────────────────────────────────────────────────

@bp.route('/fotos/<path:filename>')
def serve_foto(filename):
    """Serve as imagens da pasta fotos_flor/."""
    return send_from_directory(current_app.config['FOTOS_DIR'], filename)
