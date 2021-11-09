# API RestFul - OKR

<center> 

![Logo personagens clássicos](https://www.db1group.com/wp-content/uploads/2020/07/logo-db1-group-color.png) 

</center>

>API criada para um sistema de OKR's, utilizando NestJS, TypeORM, PostgreSQL e Docker. Nesta API é possível criar usuários, objetivos e key-results. Bem como fazer consultas.

O OKR é um sistema para definição e acompanhamento dos objetivos de uma empresa/equipe e seus resultados. O OKR possui dois componentes: Os objetivos são descrições qualitativas memoráveis do que deseja alcançar e os Key Results são um conjunto de métricas que medem o seu progresso em direção ao Objetivo. 

Todos os Key Results devem ser quantitativos e mensuráveis.

## Executando o projeto

*Essa API utiliza o Postgres como banco de dados e o TypeORM como ORM focado em Typescript. Devido a utilização do Docker não é necessário instalação prévia de nenhuma aplicação para testá-la. Para execução de testes siga os passos a seguir:

Para instalação de todos os módulos listados como dependência, digite no terminal:

* `npm i`

Para executar o projeto com o node, digite no terminal:

* `npm run start:dev`


## Testando a API

Você pode utilizar algumas ferramentas para teste, porém durante a construção desta API foi utilizado o Insomnia, que é simples, porém muito poderoso. E também o Beekeeper Studio que é um editor SQL de código aberto e um aplicativo de gerenciamento de banco de dados.

### Exemplos de URLs:

* Essa é a URL de teste padrão para buscar todos os usuários: 

    http://localhost:3000/users

* Para buscar todos os objetivos:

     http://localhost:3000/objectives


### Exemplos de estruturas JSON:

Essa é a estrutura JSON para criar um usuário:

```json
{
	"email": "user@gmail.com",
	"username": "user",
	"password": "Senha123@",
	"passwordConfirmation": "Senha123@"
}
```

Essa é a estrutura JSON para fazer o POST e o PUT dos objetivos:

```json
{
    "objective": "Aumentar 10% do faturamento anual",
	"type": "Aumentar valor",
	"initial_date": "01/01/2021",
	"end_date": "31/12/2021",
	"unity": "Gestão",
	"area": "RH",
	"owner": "af5f8afb-c019-4eab-9cfc-e01f27e4294c"
}
```

Essa é a estrutura JSON para fazer o POST e o PUT dos key-results:

```json
{
    "key_result": "Fechar 10 vendas por dia",
	"type": "Entregável",
	"frequency": "Semanal",
	"rating": "Alta",
	"initial_value": 1,
	"goal_value": 3,
	"comment": "Melhorar índice de conversão",
	"owner": "af5f8afb-c019-4eab-9cfc-e01f27e4294c"
}
```

Essa é a estrutura JSON para fazer o POST e o PUT dos checkins:

```json
{
    "date": "04/10/2021",
	"current_value": "Cancelado",
	"key_result": "67d3a3c8-9c6d-43e3-8f0c-24de921324a6"
}
```