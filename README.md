## README

#### Rodando projeto:

para rodar o projeto você vai precisar de um mongodb rodando localmente pode ser em docker, ou o proprio docker e subir o backend com o arquivo de docker-compose

##### localmente:

você precisa fornecer uma URI de conexão do mongodb por variavel de ambiente MONGODB_URL

por padrão ele usa considera que existe um mongodb rodando localmente
mongodb://localhost:27017/

`$ npm run start`

o sistema vai subir na porta 5000
</br>

##### com docker-compose:

com o docker instalado é só rodar
`$ docker-compose up -d --build`

isso vai subir um mongodb e o serviço de backend na porta 5000
