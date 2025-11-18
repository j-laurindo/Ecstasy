# Ecstasy - Site de Gerenciamento e Visualização de Filmes

Um projeto de gerenciador de filmes Full-Stack que oferece uma interface de usuário (React/Vite) prática e fluida para a gestão completa (cadastro, edição, listagem e remoção) de filmes. Juntamente de uma estrutura de lógica em Python, que assegura a segurança e a integridade dos dados.

---

## 📖 Introdução

Este repositório contém o código-fonte do site **Ecstasy**, desenvolvido para fins de estudo e prática em desenvolvimento web.

As instruções abaixo orientam como configurar e executar o projeto localmente para desenvolvimento e testes.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Python** ≥ 1.13.5
- **Node.js** ≥ 22.20.0
- **NPM** ≥ 11.6.1
- **MySQL Workbench** ≥ 8.0.43

---

## 🚀 Instalação e Execução

> ⚠️ Importante: o projeto possui dois servidores (Back-End e Front-End) que devem ser executados simultaneamente.
> 
> 
> Utilize **dois terminais diferentes** — um para cada parte.
> 

### 🐍 Back-End

1. Acesse a pasta do back-end:
    
    ```bash
    cd back
    ```
    
2. Crie um ambiente virtual Python:
    
    ```bash
    py -m venv env
    ```
    
3. Ative o ambiente virtual:
    
    ```bash
    ./env/Scripts/activate
    ```
    
4. Instale as dependências:
    
    ```bash
    pip install -r requirements.txt
    ```
    
5. Inicie o servidor:
    
    ```bash
    py ./server.py
    ```
O servidor será executado localmente em:

👉 [**http://localhost:8000/**](http://localhost:8000/)

---

### ⚛️ Front-End

1. Acesse a pasta do front-end:
    
    ```bash
    cd front-end
    ```
    
2. Instale as dependências do projeto:
    
    ```bash
    npm install
    ```
    
3. Inicie o servidor de desenvolvimento:
    
    ```bash
    npm run dev
    ```
    

O site será executado localmente em:

👉 [**http://localhost:5173/**](http://localhost:5173/)

---

## 🧩 Tecnologias Utilizadas

Ferramentas e bibliotecas principais:

- [React](https://react.dev/) — framework para a interface do usuário
- [Node.js](https://nodejs.org/) — framework para execução e gerenciamento de dependências
- [Vite](https://vitejs.dev/) — ferramenta de build e servidor de desenvolvimento
- [Axios](https://axios-http.com/) — cliente HTTP baseado em Promises para comunicação entre Frontend e Backend
- [React Router](https://reactrouter.com/en/main) — biblioteca para roteamento declarativo no React
- [Bootstrap Icons](https://icons.getbootstrap.com/) — framework de UI para estilização e componentes de interface.
- [PyJWT](hhttps://pyjwt.readthedocs.io/en/stable/) — biblioteca para implementação de JSON Web Tokens (JWT) para autenticação
- [Bcrypt](https://pypi.org/project/bcrypt/) — hashing seguro de senhas
- [MySQL Connector](https://dev.mysql.com/doc/connector-python/en/) — drivers para conexão e interação com o banco de dados MySQL
- [CORS](https://expressjs.com/en/resources/middleware/cors.html) — configuração de cabeçalhos de segurança e permitir requisições de outras origens

---

## 👩‍💻 Desenvolvedores

| Nome | Função |
| --- | --- |
| **Julia Roberts Laurindo da Silva** | Front-End & Back-End |

---

## 💡 Observações

- Este projeto foi desenvolvido com fins **educacionais**, como parte de um exercício prático de desenvolvimento web da matéria de Programação Front-End e Programação Back-End, da instituição **Senai Roberto Mange**.