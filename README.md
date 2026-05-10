# 🌹 Decodificação de Memórias

Um site interativo e romântico onde cada pétala de uma rosa de papel guarda uma **palavra-chave secreta**. Ao digitá-la no site, uma memória especial é revelada com fotos e textos numa animação delicada.

---

## 📁 Estrutura do Projeto

```
/projeto_flor
├── .github/
│   └── workflows/
│       └── static.yml          # Deploy automático no GitHub Pages (só frontend/)
│
├── backend/                    # Esqueleto Flask (uso local / futuro)
│   ├── app/
│   │   ├── __init__.py         # App factory com CORS
│   │   ├── routes.py           # Rotas da API + dict MEMORIAS
│   │   └── models.py           # Placeholder
│   ├── requirements.txt        # flask, flask-cors
│   └── run.py                  # python3 run.py
│
├── frontend/                   # Site estático (GitHub Pages)
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css       # Estilos completos
│   │   └── fotos/              # Todas as fotos e ilustrações
│   ├── data/
│   │   └── memories.json       # ← Edite aqui as memórias e textos
│   ├── js/
│   │   ├── api.js              # Lê memories.json localmente
│   │   └── main.js             # Renderiza os cards no DOM
│   └── index.html              # Página única
│
├── fotos_flor/                 # Fonte original das fotos (backup)
└── README.md
```

---

## 🎨 Design

| Elemento       | Valor                                                   |
| -------------- | ------------------------------------------------------- |
| **Rosa Seco**  | `#DCAE96` — cor primária, tons quentes                  |
| **Off-white**  | `#F9F7F2` — fundo suave e clean                         |
| **Dourado**    | `#C9A84C` — destaques e acentos elegantes               |
| **Títulos**    | *Playfair Display* (serifada, clássica)                  |
| **Corpo**      | *Lato* (sans-serif, moderna e legível)                  |
| **Textos card**| *Alegreya* (serifada expressiva, tamanho 1.15rem)       |

### Recursos visuais
- Pétalas flutuantes animadas em CSS
- Card com glassmorphism (`backdrop-filter: blur`)
- Animação `card-bloom` escalonada ao revelar as memórias
- Cards adaptativos — o tamanho é ditado pela foto, sem cortes
- Design totalmente **responsivo** (mobile-first)
- Grid de 2 colunas em telas ≥ 580px

---

## 🚀 Como Rodar

### Opção 1 — Abrir diretamente no navegador
> ⚠️ Algumas funcionalidades podem não funcionar sem servidor (restrições de CORS ao carregar JSON local). Use a opção 2.

### Opção 2 — Servidor local (recomendado)

```bash
cd frontend
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

### Opção 3 — GitHub Pages
O deploy é automático via GitHub Actions a cada push na branch `main`.  
O workflow serve **apenas a pasta `frontend/`**.

---

## 📝 Como Editar as Memórias

Abra `frontend/data/memories.json`. Cada chave é a **palavra-chave** que o usuário digita:

```json
{
  "palavra-chave": {
    "titulo": "Título exibido na tela",
    "cards": [
      {
        "imagem": "./assets/fotos/nome-do-arquivo.jpg",
        "texto": "Texto que aparece embaixo da foto."
      }
    ]
  }
}
```

**Dicas:**
- A ordem dos cards no array é a ordem de exibição (a ilustração/lembrança vem primeiro)
- Para adicionar uma nova memória, adicione uma nova chave ao JSON
- Para alterar a palavra-chave, renomeie a chave
- Para adicionar texto, preencha o campo `"texto"` de cada card

---

## 🖼️ Como Adicionar Fotos

1. Coloque o arquivo em `frontend/assets/fotos/`
2. Referencie no JSON como `"./assets/fotos/nome-do-arquivo.jpg"`

> As fotos também estão disponíveis na pasta `fotos_flor/` na raiz do projeto (backup original).

---

## 🐍 Back-end Local (opcional)

O back-end Flask existe como alternativa para uso local. Ele serve as fotos diretamente de `fotos_flor/` via API REST.

```bash
cd backend
python3 run.py
# API disponível em: http://localhost:5000/api/memory/<codigo>
```

> Para instalar as dependências: `python3 -m pip install flask flask-cors`

---

## 📋 Tecnologias

| Camada     | Tecnologia                          |
| ---------- | ----------------------------------- |
| Front-end  | HTML5, CSS3, JavaScript ES6         |
| Dados      | JSON estático (`data/memories.json`)|
| Fontes     | Google Fonts (Playfair, Lato, Alegreya) |
| Back-end   | Python + Flask *(uso local)*        |
| Hospedagem | GitHub Pages                        |

---

<p align="center">Feito com ♥</p>
