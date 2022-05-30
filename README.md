# Node app

## API Produto x Estoque

### API PRODUTO
Criação
Update
Leitura
Deleção

### API ESTOQUE
Criação
Update
Leitura
Deleção

### BANCO DE DADOS
Relação produto x estoque 1:1

## Para iniciar o projeto
### BackEnd
Na pasta principal executar os comandos para baixar os pacotes e configurar o banco de dados:
```
npm i
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

Em seguida, executar o comando para inicializar o projeto:

```
npm start
```

### FrontEnd
Na pasta my-app executar os comandos:
```
npm i
npm start
```



