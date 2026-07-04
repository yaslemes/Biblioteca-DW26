<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:4169E1,100:339933&height=200&section=header&text=API%20Biblioteca&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Sistema%20de%20gerenciamento%20de%20bibliotecas&descAlignY=55&descSize=18" width="100%">

<br>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=4169E1&center=true&vCenter=true&width=600&lines=API+REST+com+Node.js+%2B+Fastify;Arquitetura+em+camadas+desacoplada;PostgreSQL+%2B+Swagger%2FOpenAPI;Projeto+acad%C3%AAmico+-+Desenvolvimento+Web)](https://git.io/typing-svg)

<p>

<img src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/Fastify-5.x-000000?style=for-the-badge&logo=fastify">
<img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger">
<img src="https://img.shields.io/badge/License-Academic-blue?style=for-the-badge">

</p>

API REST desenvolvida para gerenciamento de bibliotecas.

Projeto desenvolvido para a disciplina de **Desenvolvimento Web**.

<br>

</div>

---

# 📑 Índice

- [📖 Sobre](#-sobre)
- [🎯 Objetivos](#-objetivos)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠 Tecnologias](#-tecnologias)
- [🏛 Arquitetura](#-arquitetura)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🗄 Banco de Dados](#-banco-de-dados) 
- [📷 Prints do Swagger](#-prints-do-swagger) -em andamento
- [🚀 Como Executar](#-como-executar)
- [📄 Documentação](#-documentação)
- [🔗 Endpoints](#-endpoints) -em andamento
- [📈 Fluxo da Aplicação](#-fluxo-da-aplicação)
- [👥 Equipe](#-equipe)


---

# 📖 Sobre

A **API Biblioteca** é uma API REST desenvolvida para gerenciar uma biblioteca de forma organizada e eficiente.

O sistema permite o cadastro de usuários, autores, livros e empréstimos, além de disponibilizar consultas relacionais utilizando **JOIN**, documentação automática com **Swagger** e uma arquitetura baseada em boas práticas de desenvolvimento backend.

Durante o projeto foram aplicados conceitos como:

- Repository Pattern
- Service Layer
- Controller
- Injeção de Dependência
- Vertical Slice Architecture
- Tratamento centralizado de erros
- Documentação OpenAPI

---

# 🎯 Objetivos

- Gerenciar usuários
- Gerenciar autores
- Gerenciar livros
- Gerenciar empréstimos
- Aplicar PostgreSQL
- Utilizar Swagger
- Desenvolver uma API REST
- Aplicar arquitetura em camadas

---

# ✨ Funcionalidades

## 👤 Usuários

- Cadastro
- Consulta
- Atualização
- Exclusão

## ✍️ Autores

- Cadastro
- Consulta
- Atualização
- Exclusão

## 📚 Livros

- Cadastro
- Consulta
- Atualização
- Exclusão
- Associação de autores
- Consulta utilizando JOIN

## 📦 Empréstimos

- Cadastro
- Consulta
- Atualização
- Exclusão
- Consulta utilizando JOIN

## ✅ Funcionalidades implementadas

- CRUD completo
- Relacionamentos 1:1
- Relacionamentos 1:N
- Relacionamentos N:N
- Consultas com JOIN
- Swagger/OpenAPI
- Injeção de Dependência
- Repository Pattern
- Service Layer
- Tratamento centralizado de erros

---

# 🛠 Tecnologias

| Tecnologia | Utilização |
|------------|------------|
| Node.js | Ambiente JavaScript |
| Fastify | Framework Backend |
| PostgreSQL | Banco de Dados |
| Swagger | Documentação |
| Dotenv | Variáveis de Ambiente |
| Nodemon | Desenvolvimento |

---

# 🏛 Arquitetura

O projeto segue uma arquitetura em camadas, onde cada camada possui uma única responsabilidade, tornando o sistema desacoplado, organizado e de fácil manutenção.

```mermaid
flowchart TD
    A[Cliente] -->|HTTP Request| B[Fastify]
    B --> C[Routes]
    C --> D[Controller]
    D --> E[Service]
    E --> F[Repository]
    F --> G[(PostgreSQL)]
    G -->|Dados| F
    F -->|Dados| E
    E -->|Resultado| D
    D -->|HTTP Response| A

    style A fill:#4169E1,color:#fff
    style G fill:#339933,color:#fff
```

---

# 📂 Estrutura do Projeto

```text
Biblioteca-DW26/
│
├── database.sql
├── package.json
├── package-lock.json
├── README.md
├── .env
├── .gitignore
│
└── src/
    │
    ├── server.js
    │
    ├── config/
    │   └── env.js
    │
    ├── database/
    │   └── connection.js
    │
    ├── docs/
    │   └── swagger.js
    │
    ├── errors/
    │   ├── AppError.js
    │   └── AppErrorHandler.js
    │
    ├── routes/
    │   └── index.js
    │
    └── features/
        │
        ├── usuarios/
        │   ├── index.js
        │   ├── UsuarioController.js
        │   ├── UsuarioService.js
        │   ├── UsuarioRepository.js
        │   └── usuario.routes.js
        │
        ├── autores/
        │   ├── index.js
        │   ├── AutorController.js
        │   ├── AutorService.js
        │   ├── AutorRepository.js
        │   └── autor.routes.js
        │
        ├── livros/
        │   ├── index.js
        │   ├── LivroController.js
        │   ├── LivroService.js
        │   ├── LivroRepository.js
        │   └── livro.routes.js
        │
        └── emprestimos/
            ├── index.js
            ├── EmprestimoController.js
            ├── EmprestimoService.js
            ├── EmprestimoRepository.js
            └── emprestimo.routes.js
```

---

# 🗄 Banco de Dados

O sistema utiliza **PostgreSQL**.

## Relacionamentos

```mermaid
erDiagram
    USUARIOS ||--|| ENDERECOS : possui
    USUARIOS ||--o{ EMPRESTIMOS : realiza
    LIVROS }o--o{ AUTORES : escreve
    LIVROS ||--o{ EMPRESTIMOS : emprestado
    LIVROS }o--|| CATEGORIAS : pertence
```

## Tabelas

| Tabela | Descrição |
|---------|-----------|
| usuarios | Cadastro dos usuários |
| enderecos | Endereço dos usuários |
| autores | Cadastro dos autores |
| categorias | Categorias dos livros |
| livros | Cadastro dos livros |
| livros_autores | Relação entre livros e autores |
| emprestimos | Controle dos empréstimos |

---

# 🚀 Como Executar

## Clonar o projeto

```bash
git clone https://github.com/SEU-USUARIO/Biblioteca-DW26.git
```

## Entrar na pasta

```bash
cd Biblioteca-DW26
```

## Instalar dependências

```bash
npm install
```

## Configurar o `.env`

```env
PORT=3333

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=biblioteca_db
```

## Executar o banco

Execute o arquivo:

```text
database.sql
```

## Rodar a aplicação

```bash
npm run dev
```

Servidor:

```text
http://localhost:3333
```

Swagger:

```text
http://localhost:3333/docs
```

---

# 📄 Documentação

A API possui documentação automática utilizando **Swagger/OpenAPI**.

Após iniciar a aplicação:

```text
http://localhost:3333/docs
```

No Swagger é possível:

- Visualizar todos os endpoints;
- Testar requisições;
- Consultar parâmetros;
- Verificar respostas da API.

---

# 🔗 Endpoints

## Usuários

| Método | Endpoint |
|---------|----------|
| POST | `/usuarios` |
| GET | `/usuarios` |
| GET | `/usuarios/:id` |
| PUT | `/usuarios/:id` |
| DELETE | `/usuarios/:id` |

## Autores

| Método | Endpoint |
|---------|----------|
| POST | `/autores` |
| GET | `/autores` |
| GET | `/autores/:id` |
| PUT | `/autores/:id` |
| DELETE | `/autores/:id` |

## Livros

| Método | Endpoint |
|---------|----------|
| POST | `/livros` |
| GET | `/livros` |
| GET | `/livros/detalhes` |
| GET | `/livros/:id` |
| PUT | `/livros/:id` |
| DELETE | `/livros/:id` |
| POST | `/livros/:id/autores` |

## Empréstimos

| Método | Endpoint |
|---------|----------|
| POST | `/emprestimos` |
| GET | `/emprestimos` |
| GET | `/emprestimos/:id` |
| GET | `/emprestimos/:id/detalhes` |
| PUT | `/emprestimos/:id` |
| DELETE | `/emprestimos/:id` |

---

# 📈 Fluxo da Aplicação

```mermaid
sequenceDiagram
    participant C as Cliente
    participant F as Fastify
    participant R as Routes
    participant Ctrl as Controller
    participant S as Service
    participant Rep as Repository
    participant DB as PostgreSQL

    C->>F: HTTP Request
    F->>R: Roteia requisição
    R->>Ctrl: Chama controller
    Ctrl->>S: Executa regra de negócio
    S->>Rep: Solicita acesso a dados
    Rep->>DB: Query SQL
    DB-->>Rep: Retorno dos dados
    Rep-->>S: Dados processados
    S-->>Ctrl: Resultado
    Ctrl-->>F: Resposta formatada
    F-->>C: HTTP Response
```

---

# 👥 Equipe

| Integrante | Responsabilidades |
|------------|-------------------|
| **Yasmym Lemes** | Desenvolvimento dos módulos de Livros e Empréstimos, consultas com JOIN, Swagger, Injeção de Dependência e documentação |
| **Isabely** | Modelagem do banco de dados, módulos de Usuários e Autores, configuração inicial e tratamento de erros |

---

### ⭐ Obrigado por visitar este repositório!

Desenvolvido com ❤️ utilizando **Node.js**, **Fastify** e **PostgreSQL**.
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:339933,100:4169E1&height=120&section=footer" width="100%">


</div>
