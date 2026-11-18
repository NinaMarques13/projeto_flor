"""
routes.py - Rotas da API.

Le as memórias do mesmo arquivo JSON usado pelo front-end estático,
mantendo os dois modos de execução sincronizados.
"""

import json
import os
import unicodedata
from flask import Blueprint, jsonify, request, send_from_directory, current_app

bp = Blueprint('main', __name__)

def normalizar_codigo(codigo):
    texto = unicodedata.normalize('NFD', codigo.strip().lower())
    return ''.join(char for char in texto if unicodedata.category(char) != 'Mn')


def carregar_memorias():
    frontend_dir = current_app.config['FRONTEND_DIR']
    caminho = os.path.join(frontend_dir, 'data', 'memories.json')
    with open(caminho, 'r', encoding='utf-8') as arquivo:
        return json.load(arquivo)


# ─── Rota: buscar memória ─────────────────────────────────────────────────────

@bp.route('/api/memory/<string:codigo>')
def get_memory(codigo):
    """Retorna os dados de uma memória pelo código/palavra-chave."""
    codigo_normalizado = normalizar_codigo(codigo)
    memorias = carregar_memorias()
    memoria = next(
        (
            dados
            for chave, dados in memorias.items()
            if normalizar_codigo(chave) == codigo_normalizado
        ),
        None,
    )
    if memoria is None:
        return jsonify({"erro": "Memória não encontrada."}), 404

    base_url = request.host_url.rstrip('/')
    cards = []
    for card in memoria.get('cards', []):
        result_card = dict(card)
        imagem = result_card.get('imagem', '')
        if imagem.startswith('./assets/'):
            result_card['imagem'] = base_url + '/' + imagem[2:]
        elif imagem:
            result_card['imagem'] = f"{base_url}/fotos/{os.path.basename(imagem)}"
        cards.append(result_card)

    result = {
        "titulo": memoria.get("titulo", ""),
        "layout": memoria.get("layout"),
        "cards": cards,
    }
    return jsonify(result)


# ─── Rota: servir fotos ───────────────────────────────────────────────────────

@bp.route('/fotos/<path:filename>')
def serve_foto(filename):
    """Serve as imagens da pasta fotos_flor/."""
    return send_from_directory(current_app.config['FOTOS_DIR'], filename)


@bp.route('/assets/<path:filename>')
def serve_asset(filename):
    """Serve os arquivos usados pelo front-end."""
    return send_from_directory(current_app.config['FRONTEND_DIR'], os.path.join('assets', filename))
