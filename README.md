# 🌹 Decodificação de Memórias

Um site interativo e romântico de **"Decodificação de Memórias"** — um presente de namoro onde cada pétala de uma rosa de papel guarda um código secreto. Ao digitar o código no site, uma memória especial é revelada com uma animação delicada.

---

## 📁 Estrutura do Projeto

```
/projeto-rosa
├── backend/                    ← API em Python/Flask (futura implementação)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── models.py
│   ├── requirements.txt
│   └── run.py
│
├── frontend/                   ← Interface do usuário (Vanilla JS)
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css       # Estilos (rosa seco, off-white, dourado)
│   │   └── images/             # Imagens do projeto
│   ├── js/
│   │   ├── api.js              # Consumo da API (fetch)
│   │   └── main.js             # Manipulação de DOM e animações
│   └── index.html              # Página principal
│
└── README.md                   # Este arquivo
```

---

## 🎨 Design

| Elemento   | Valor                                              |
| ---------- | -------------------------------------------------- |
| **Rosa Seco**  | `#DCAE96` — cor primária, tons quentes             |
| **Off-white**  | `#F9F7F2` — fundo suave e clean                   |
| **Dourado**    | `#C9A84C` — destaques e acentos elegantes          |
| **Títulos**    | *Playfair Display* (serifada, clássica)             |
| **Textos**     | *Lato* (sans-serif, moderna e legível)              |

### Recursos visuais
- Pétalas flutuantes animadas em CSS
- Card com glassmorphism (backdrop-filter blur)
- Animação "bloom" ao revelar a memória
- Design totalmente **responsivo** (mobile-first)

---

## 🚀 Como Rodar o Front-end

### Opção 1 — Abrir diretamente no navegador
Basta abrir o arquivo `frontend/index.html` no navegador.

> ⚠️ Sem o back-end rodando, o site exibirá a mensagem de erro de conexão — isso é o comportamento esperado.

### Opção 2 — Servidor local (recomendado)
Para evitar possíveis restrições de CORS ao testar com a API:

```bash
# Na pasta do projeto
cd frontend

# Python 3
python -m http.server 8080

# Acesse: http://localhost:8080
```

---

## 🔌 Integração com a API

O front-end consome a seguinte rota REST:

```
GET http://localhost:5000/api/memory/{codigo}
```

### Resposta esperada (sucesso — `200 OK`)

```json
{
  "titulo": "Nosso primeiro encontro",
  "tipo": "texto",
  "conteudo": "Foi naquele café, no canto da janela..."
}
```

**Tipos suportados** no campo `tipo`:

| Tipo     | Comportamento do Front-end                           |
| -------- | ---------------------------------------------------- |
| `texto`  | Exibe o texto com estilo itálico elegante             |
| `imagem` | Renderiza uma `<img>` com a URL de `conteudo`         |
| `video`  | Incorpora um `<iframe>` (suporta YouTube embed auto)  |

### Resposta esperada (erro — `404`)

```json
{
  "erro": "Memória não encontrada."
}
```

---

## 🐍 Back-end (Futura Implementação)

O back-end será desenvolvido em **Python com Flask** e deverá:

1. **Servir a API REST** na porta `5000`
2. **Armazenar as memórias** em um banco de dados (SQLite ou PostgreSQL)
3. **Implementar as rotas** conforme descrito na seção de integração

### Estrutura esperada:

- `backend/app/__init__.py` — Inicialização do app Flask
- `backend/app/routes.py` — Definição das rotas da API
- `backend/app/models.py` — Modelos do banco de dados
- `backend/requirements.txt` — Dependências Python
- `backend/run.py` — Ponto de entrada do servidor

### Para instalar e rodar (quando implementado):

```bash
cd backend
pip install -r requirements.txt
python run.py
```

---

## 📋 Tecnologias Utilizadas

| Camada     | Tecnologia                  |
| ---------- | --------------------------- |
| Front-end  | HTML5, CSS3, JavaScript ES6 |
| Back-end   | Python, Flask *(planejado)* |
| Fontes     | Google Fonts                |
| Hospedagem | Localhost (desenvolvimento) |

---

<p align="center">Feito com ♥</p>
