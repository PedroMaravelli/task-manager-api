

# Task Manager API

> API RESTful para gerenciamento de tarefas com autenticação via JWT construída com NestJS, Prisma e PostgreSQL.

---

## Índice

* [Descrição](#descrição)
* [Tecnologias](#tecnologias)
* [Funcionalidades](#funcionalidades)
* [Arquitetura e Estrutura](#arquitetura-e-estrutura)
* [Instalação](#instalação)
* [Configuração](#configuração)
* [Execução](#execução)
* [Endpoints](#endpoints)
* [Autenticação](#autenticação)
* [Testes](#testes)
* [Boas práticas e padrões](#boas-práticas-e-padrões)


---

## Descrição

Esta API foi desenvolvida para permitir o cadastro, autenticação e gerenciamento de tarefas para usuários autenticados. Cada usuário pode criar, listar, atualizar e deletar suas tarefas individuais. A autenticação é feita usando JWT, garantindo que somente usuários autenticados possam manipular seus dados.

---

## Tecnologias

* **NestJS** - Framework Node.js progressivo para construção de APIs escaláveis.
* **TypeScript** - Tipagem estática para maior segurança e legibilidade.
* **Prisma ORM** - ORM moderno para trabalhar com PostgreSQL.
* **PostgreSQL** - Banco de dados relacional.
* **JWT** - Autenticação e autorização via tokens.
* **class-validator** - Validação dos DTOs para manter dados consistentes.
* **Jest** - Framework para testes unitários e end-to-end.

---

## Funcionalidades

* Cadastro e login de usuários com senha criptografada.
* Geração e validação de tokens JWT para autenticação.
* Criação, listagem, atualização e exclusão de tarefas.
* Cada tarefa tem: id (UUID), título, descrição, status (enum: PENDING, IN\_PROGRESS, DONE), timestamps.
* Rotas protegidas por autenticação JWT.
* Validações robustas via DTOs.
* Testes automatizados cobrindo serviços e endpoints.

---

## Arquitetura e Estrutura

* Modularização clara em `auth`, `users` e `tasks`.
* Controllers responsáveis pelas rotas e requisições.
* Services contendo toda regra de negócio e interação com o banco via Prisma.
* Guards para proteger rotas com JWT.
* DTOs aplicando validações de entrada.
* Prisma centralizado com provider próprio para injeção.
* Uso de Pipes e Decorators para validação e autenticação.

---

## Instalação

### Pré-requisitos

* Node.js (>= 16.x)
* PostgreSQL (>= 12.x)
* npm ou yarn

### Passos

```bash
git clone https://github.com/PedroMaravelli/task-managemr-api.git
cd task-managemr-api
npm install
```

---

## Configuração

Variáveis principais:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
JWT_SECRET=seuSegredoSuperSecreto

```

## Execução

Para rodar em modo desenvolvimento com hot reload:

```bash
npm run start:dev
```

Para executar a migração do banco:

```bash
npx prisma migrate dev --name init
```

Para rodar a aplicação em produção:

```bash
npm run start:prod
```

---

## Endpoints

### Autenticação

| Método | Endpoint         | Descrição                  | Corpo da Requisição                   |
| ------ | ---------------- | -------------------------- | ------------------------------------- |
| POST   | `/auth/register` | Cadastro de usuário        | `{ email: string, password: string }` |
| POST   | `/auth/login`    | Login com retorno de token | `{ email: string, password: string }` |

### Tarefas (requer Bearer Token JWT)

| Método | Endpoint     | Descrição                | Corpo da Requisição                                     |              |          |
| ------ | ------------ | ------------------------ | ------------------------------------------------------- | ------------ | -------- |
| POST   | `/tasks`     | Cria uma nova tarefa     | \`{ title: string, description: string, status: PENDING | IN\_PROGRESS | DONE }\` |
| GET    | `/tasks`     | Lista tarefas do usuário | —                                                       |              |          |
| PATCH  | `/tasks/:id` | Atualiza tarefa pelo id  | Campos opcionais para atualização                       |              |          |
| DELETE | `/tasks/:id` | Remove tarefa pelo id    | —                                                       |              |          |

---

## Testes

* Testes unitários com Jest para serviços e guardas.
* Testes e2e para rotas de autenticação e tarefas.

### Comandos

```bash
npm run test          # Testes unitários
npm run test:e2e      # Testes end-to-end

```

---

## Boas práticas e padrões

* Segue princípios SOLID.
* Código modular e organizado para fácil manutenção.
* Validações aplicadas nos DTOs para garantir segurança.
* Autenticação JWT implementada com guardas e estratégias específicas.
* Testes automatizados para garantir qualidade.
* Prisma gerencia esquema e migrações do banco.
* Uso de variáveis de ambiente para configuração sensível.


