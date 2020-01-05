Desafio Final Bootcamp Rocketseat - Aplicação completa (Backend, Frontend e Mobile) para gerenciamento de academias.

<h1 align="center">
<img src="https://github.com/thelukscolor/gympoint/blob/master/gympoint-frontend/src/assets/logo.png">
</h1>
<h3 align="center">
GoStack Bootcamp <a href="https://rocketseat.com.br" target="__blank">Rocketseat</a>
</h3>

<h1>Instalação</h1>
<p>ATENÇÃO: Para rodar a aplicação é necessário a instalação do Mysql.</p>

## Pré requisitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v10.16](https://nodejs.org/)
- Yarn [Yarn v1.13]
- MySQL
- Google Chrome Browser [Google]

# PASSO A PASSO

### Clone o repositório:
git clone https://github.com/thelukscolor/gympoint.git

obs.: haverá tres pastas: (gympoint-backend) - (gympoint-frontend) - (gympoint-mobile)


## BACKEND
### Vamos iniciar o backend da aplicação

1) Va na pasta (gympoint-backend) e execute o comando: yarn install

2) Haverá um arquivo chamado ".env-sample" duplique o conteúdo desse arquivo em um novo arquivo chamado ".env" e coloque as credenciais do seu ambiente.
   ex.: cp .env.sample .env
   
3) Agora vc precisa criar uma base de dados Mysql por exemplo chamado: gympoint

4) Depois de criado a base de dados iremos executar o comando que irá gerar as tabelas do banco de dados: 
    yarn sequelize db:migrate
    
5) Agora você já tem as tabelas criadas, vamos populá-las com registros de exemplos para facilitar, basta executar o comando abaixo:
   yarn sequelize db:seed:all
   
6) Pronto!! Agora temos nossa base de dados populada facilitando usarmos o sistema posteriormente. 

7) Vamos ligar nosso Backend!!! Execute o comando:  yarn dev  obs.: Nosso backend estará rodando na porta 3333;



## FRONTEND
### Vamos iniciar o frontend da aplicação

1) Va na pasta (gympoint-frontend) e execute o comando: yarn install

2) Haverá um arquivo chamado ".env-sample" duplique o conteúdo desse arquivo em um novo arquivo chamado ".env" e coloque a url do backend. ex.: http://localhost:3333   já vai estar preparado.
   ex.: cp .env.sample .env

3) Vamos ligar nosso FrontEnd!!! Execute o comando:  yarn start  Ele deverá abrir na url: http://localhost:3000/  

4) Agora que você viu a tela de login entre com as seguintes credenciais:

```bash

# credenciais de acesso
user: admin@gympoint.com
password: 123456
```
## Principais bibliotecas utilizadas

- [Styled Components](https://www.styled-components.com/)
- [Date-Fns](https://date-fns.org/)
- [Yup](https://github.com/jquense/yup)
- [React Toastfy](https://www.npmjs.com/package/react-toastify)
- [React Icons](https://react-icons.netlify.com/#/)
- [React Router Dom](https://reacttraining.com/react-router/web/guides/quick-start)
- [React Redux](https://github.com/reduxjs/react-redux)
- [Redux Saga](https://github.com/redux-saga/redux-saga)


## MOBILE (App ANDROID)
### Vamos iniciar o frontend da aplicação

App desenvolvido em React Native para o acesso dos alunos onde ele faz o checkin e envia pedido de auxílio para a academia.

1) Va na pasta (gympoint-mobile) e execute o comando: yarn install   obs.: Esse processo demora pois irá baixar diversas dependências, vá tomar um cafezinho :-)

-- Caso ainda não tenha configurado um ambiente android em sua máquina siga esse tutorial [https://facebook.github.io/react-native/docs/getting-started]

2) Depois de tdo configurado rode: react-native run-android , pronto se apresentado o projeto no emulador \o/

#### Principais bibliotecas utilizadas

- [React Native](https://github.com/facebook/react-native)
- [Axios](https://github.com/axios/axios)
- [Styled Components](https://www.styled-components.com/)
- [Date-Fns](https://date-fns.org/)
- [React Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [React Router Dom](https://reacttraining.com/react-router/web/guides/quick-start)
- [React Redux](https://github.com/reduxjs/react-redux)
- [Redux Saga](https://github.com/redux-saga/redux-saga)

