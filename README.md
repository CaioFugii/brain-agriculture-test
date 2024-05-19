# brain-agriculture-test

Teste técnico: Brain Agriculture

## Descrição do Projeto

Esta aplicação é uma API em Node.js utilizando o framework NestJS. O objetivo é cumprir os requisitos técnicos do teste de desenvolvedor Back-end, descritos [neste link](https://github.com/brain-ag/trabalhe-conosco).

## Tecnologias Utilizadas

- Node.js (v20.13.0)
- NestJS (v10.0.0)
- PostgreSQL
- TypeORM
- Class validator
- Class transformer
- Swagger

## Configuração do Ambiente

1. Clone o repositório:
   ```sh
   git clone https://github.com/CaioFugii/brain-agriculture-test
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd brain-agriculture-test
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure as variáveis de ambiente:
   Substitua os valores do arquivo .env na raiz do projeto conforme necessário:
   ```env
   DB_HOST='localhost'
   DB_PORT='5432'
   DB_PASSWORD='secret-password'
   DB_USERNAME='postgres'
   DB_NAME='pgBrainAgriculture'
   ```
5. Para iniciar a aplicação basta rodar o comando abaixo:
   ```sh
   npm start
   ```

A aplicação estará rodando em http://localhost:3000. A documentação Swagger estará disponível em http://localhost:3000/swagger.

## Endpoints Disponíveis

### Producer

- `POST /producer`: Cria uma nova entidade.
- `GET /producer`: Retorna uma lista de entidades.
- `PUT /producer/{id}`: Atualiza uma entidade existente.
- `GET /producer/{id}`: Retorna uma entidade existente.
- `DELETE /producer/{id}`: Deleta uma entidade existente.

### Dashboard

- `GET /dashboard`: Retorna conteúdo para alimentar dashboard.

## Possíveis Melhorias

### Restruturacação da entidade Producer:

- Novo Modelo de Entidade: Criar uma nova entidade com relacionamento na propriedade "plantation", permitindo mais flexibilidade além das opções atuais (Soja, Milho, Algodão, Café, Cana de Açúcar);
- Otimização de Performance: Melhorar a implementação da rota GET /dashboard utilizando um "distinct" por plantação, para otimizar a performance.

## Considerações Finais

Agradeço a oportunidade de participar deste processo seletivo. Estou disponível para discutir qualquer aspecto da implementação ou responder a quaisquer perguntas.

## Autor

Caio Fugii
