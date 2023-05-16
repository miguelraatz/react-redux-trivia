## Descrição

Este projeto foi desenvolvido durante o período de Curso da Trybe 🚀

O projeto tem por objetivo a avaliação e prática dos conhecimentos adquiridos na Trybe, visando o cumprimento do requisitos solicitados.

:warning: Projeto desenvolvido em um squad de 4 integrantes.

### :star: [Acesse](https://game-trivia-rust.vercel.app/) a aplicação agora mesmo!

---

## Sumário

- [Habilidades](#habilidades-requeridas)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Tecnologias usadas](#tecnologias-usadas)
- [Antes de inicializar a aplicação](#antes-de-inicializar-a-aplicação)
- [API de Trivia](#api-de-trivia)
- [Gravatar](#gravatar)
- [Linter](#linter)

---

## Habilidades requeridas

- Criar um store Redux em aplicações React;

- Criar reducers no Redux em aplicações React;

- Criar actions no Redux em aplicações React;

- Criar dispatchers no Redux em aplicações React;

- Conectar Redux aos componentes React;

- Criar actions assíncronas na sua aplicação React que faz uso de Redux;

---

## O que foi desenvolvido

Foi implementado um jogo de perguntas e respostas baseado no jogo Trivia (tipo um show do milhão americano) utilizando React e Redux, desenvolvendo em grupo suas funcionalidades de acordo com as demandas definidas em um quadro Kanban. Desse modo o grupo se organizou utilizando o quadro para maior eficiência e para que se minimizem os conflitos que a união de vários códigos trouxe. A partir dessas demandas, temos uma aplicação onde a pessoa usuária poderá:

- Logar no jogo e, se o email tiver cadastro no site Gravatar, ter sua foto associada ao perfil da pessoa usuária.

- Acessar a página referente ao jogo, onde se deverá escolher uma das respostas disponíveis para cada uma das perguntas apresentadas.

- A resposta deve ser marcada antes do contador de tempo chegar a zero, caso contrário a resposta deverá ser considerada errada.

- Ser redirecionada, após 5 perguntas respondidas, para a tela de score, onde o texto mostrado depende do número de acertos.

- Visualizar a página de ranking, se quiser, ao final de cada jogo.

---

## Tecnologias usadas

- `javascript`, `jsx`, `React`, `Redux` e `css`.

---

## ANTES DE INICIALIZAR A APLICAÇÃO:

1. Clone o repositório
  * `git clone git@github.com:miguelraatz/react-redux-trivia.git`
  * Entre na pasta do repositório na sua máquina:
    * `react-redux-trivia`

2. Instale as dependências
   * `npm install`

3.  Inicialize o projeto
    * Utilize o comando `npm start` dentro da pasta `Trybe-project-trivia-react-redux` para rodar o projeto em sua máquina.

---

### API de Trivia

A [API do Trivia](https://opentdb.com/api_config.php) é bem simples. Temos 2 endpoints que vamos precisar utilizar para esse exercício.

* **Pegar o token de sessão da pessoa que está jogando**
* **Pegar perguntas e respostas**

Primeiro, é necessário fazer um GET request para:

```
https://opentdb.com/api_token.php?command=request
```

Esse endpoint te retornará o token que vai ser utilizado nas requisições seguintes. A resposta dele será:

```
{
   "response_code":0,
   "response_message":"Token Generated Successfully!",
   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}
```

Para pegar as perguntas, você deve realizar um GET request para o seguinte endpoint:

```
https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// Recomendação
https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
```

Recomendamos pedir 5 perguntas de uma vez e controlar a disposição delas no código. Essa API te retorna as perguntas no seguinte formato:

```
// Pergunta de múltipla escolha
{
   "response_code":0,
   "results":[
      {
         "category":"Entertainment: Video Games",
         "type":"multiple",
         "difficulty":"easy",
         "question":"What is the first weapon you acquire in Half-Life?",
         "correct_answer":"A crowbar",
         "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
         ]
      }
   ]
}
```

```
// Pergunta de verdadeiro ou falso
{
   "response_code":0,
   "results":[
      {
         "category":"Entertainment: Video Games",
         "type":"boolean",
         "difficulty":"hard",
         "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
         "correct_answer":"False",
         "incorrect_answers":[
            "True"
         ]
      }
   ]
}
```
O token expira em 6 horas e te retornará um `response_code: 3` caso esteja expirado. **Atenção para que seu código contemple isso!** Caso o token seja inválido, essa será a resposta da API:

```
{
   "response_code":3,
   "results":[]
}
```

---

### Gravatar

O Gravatar é um serviço que permite deixar o avatar global a partir do email cadastrado, ele mostra sua foto cadastrada em qualquer site vinculado. Na tela de **Inicio**, a pessoa que joga pode colocar um e-mail que deve fazer uma consulta a API do [Gravatar](https://br.gravatar.com/site/implement/images/).

A Implementação é feita baseada no e-mail. Esse email deve ser transformado em uma hash `MD5` (https://br.gravatar.com/site/implement/hash/). Para gerar tal hash, recomendamos utilizar o [CryptoJs](https://github.com/brix/crypto-js).

Por exemplo:
  - Garantida a instalação do CryptoJS no projeto, importe o MD5:
    `import md5 from 'crypto-js/md5';`

  - Converta o email do usuário:
    `md5(emailDoUsuário).toString();`

**Atenção:** Precisamos utilizar o `toString()` ao final da conversão.

Após a geração da hash, basta adicionar o valor gerado no final da URL:

```
// Formato de URL necessário:
https://www.gravatar.com/avatar/${hash-gerada}

// Exemplo de URL com hash de uma pessoa
https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50

// Exemplo de imagem exibida com a URL
<img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />

```
---

### Linter

Para garantir a qualidade do código, foi utilizado neste projeto os linters `ESLint` e `StyleLint`.
Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível
e de fácil manutenção! Para rodá-los localmente no projeto, execute os comandos abaixo:

```bash
npm run lint
npm run lint:styles
```

Quando é executado o comando `npm run lint:styles`, ele irá avaliar se os arquivos com a extensão `CSS` estão com o padrão correto.

Quando é executado o comando `npm run lint`, ele irá avaliar se os arquivos com a extensão `JS` e `JSX` estão com o padrão correto.
