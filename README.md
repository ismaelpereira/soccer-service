# Soccer service - EN_US

Collaborative repository to create a system to manage Monday soccer statistics

## Installation and execution

```sh
npm i
npm run build
npm run dev
# The above command runs the frontend and backend simultaneously
```

To run only the backend

```sh
npm i
npm run build
npm run dev:backend
# The above command runs the frontend and backend simultaneously
```
To run only the frontend

```sh
npm i
npm run build
npm run dev:frontend
# The above command runs the frontend and backend simultaneously
```

## How to use

First, you need to create a file called .env in the root of the project and add the following variable

```env
DATABASE_URL=<postgres url>
```

After that, you will be able to run both projects simultaneously and interact between them

## Needed Tasks

### Backend
- [ ] Create a function to save player statistics and return the overall
- [ ] Create a domain to create a match and add players
- [ ] Create a function to add statistics to the match
- [ ] Add unit tests
- [ ] Adicionar e2e tests

### Frontend

- [ ] Improve the page design
- [ ] Make the mutation automatically update the player list after running
- [ ] Create screens for each domain above


### Projeto em geral

- [ ] Dockerize
- [ ] Create CI/CD
- [ ] Deploy on AWS

## How to colaborate

The main branch is protected, to collaborate you must clone the repository, open a new branch and request a code review, once merged you will be added as a collaborator below

### Collaborators

- Ismael Pereira

# Soccer service - PT_BR

Repositório colaborativo para criar o sistema para gerenciar as estatíticas do futebol de segunda-feira

## Instalação e execução

```sh
npm i
npm run build
npm run dev
# Esse comando acima executa o frontend e o backend ao mesmo tempo
```

Para executar apenas o backend

```sh
npm i
npm run build
npm run dev:backend
# Esse comando acima executa o frontend e o backend ao mesmo tempo
```

Para executar apenas o backend

```sh
npm i
npm run build
npm run dev:frontend
# Esse comando acima executa o frontend e o backend ao mesmo tempo
```

## Como utilizar

Primeiramente você deve criar uma arquivo chamado `.env` na root do projeto e adicionar a seguinte variável

```env
DATABASE_URL=<postgres url>
```

E após isso você será capaz de executar ambos os projetos ao mesmo tempo e interagir entre eles

## Tarefas necessárias

### Backend
- [ ] Criar função para salvar estatisticas de jogador e retornar o quoeficiente
- [ ] Criar domínio para criar partida e adicionar
- [ ] Criar função de adicionar estatisticas na partida
- [ ] Adicionar testes unitários
- [ ] Adicionar testes e2e

### Frontend

- [ ] Melhorar o design da página
- [ ] Fazer a mutation após rodar atualizar automaticamente a lista de jogadores
- [ ] Criar telas pra cada domínio acima


### Projeto em geral

- [ ] Dockerizar
- [ ] Criar CI/CD
- [ ] Deploy AWS


## Como colaborar

A branch main está protegida, para coloborar você deve clonar o repositório, abrir uma branch nova e pedir code review, após mergeado você será inserido como um colaborador abaixo

### Colaboradores

- Ismael Pereira


