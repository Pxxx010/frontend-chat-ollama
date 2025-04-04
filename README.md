
# 🤖 Meu Assistente IA

Um projeto em React para criar, editar e interagir com agentes de IA personalizados utilizando modelos locais via Ollama (como LLaMA 3, OpenChat, Mistral, Gemma).

## ✨ Funcionalidades

- Criar agentes personalizados com nome, descrição, modelo e personalidade
- Listar, editar e excluir agentes
- Acessar chats individuais com cada agente
- Histórico de conversas salvo localmente por agente
- Ícones personalizados para cada tipo de agente
- Interface moderna com TailwindCSS

## 🧠 Tecnologias

- React + Vite
- TailwindCSS
- Ollama (modelos locais de IA)
- localStorage

## 🚀 Como rodar

1. Certifique-se de que você tem o [Ollama](https://ollama.com) rodando localmente
2. Clone este repositório
3. Instale as dependências:

```bash
npm install
```

4. Inicie o projeto:

```bash
npm run dev
```

## 📂 Estrutura

```
src/
├── App.jsx
├── pages/
│   ├── Agents.jsx
│   └── AgentChat.jsx
├── components/
└── assets/
```

## ✅ Status

Projeto em desenvolvimento, com suporte a múltiplos agentes e personalidades. Interface pronta para expansão com temas e filtros.

## 📄 Licença

MIT
