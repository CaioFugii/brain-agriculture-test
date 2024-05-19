## brain-agriculture-test

Teste técnico: Brain Agriculture

## Descrição do Projeto

Esta aplicação é uma API em Node.js que utilizando o framework NestJS.
O objetivo desta aplicação é cumprir com os requisitos técnicos relacionados ao teste de desenvolvedor Back-end, requisitos estes descritos no link (https://github.com/brain-ag/trabalhe-conosco).

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
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Adapte o arquivo .env na raiz do projeto com o usuário e senha correto do seu banco de dados.

4. Para iniciar a aplicação basta rodar o comando abaixo:
   ```sh
   npm start
   ```

Após estes passos a aplicação estará rodando em http://localhost:3000, e caso queira ver a documentação acesse o endpoint http://localhost:3000/swagger

## Endpoints Disponíveis

Context:

- Producer
  - `POST /producer`: Cria uma nova entidade.
  - `GET /producer`: Retorna uma lista de entidades.
  - `PUT /producer/{id}`: Atualiza uma entidade existente.
  - `GET /producer/{id}`: Retorna uma entidade existente.
  - `DELETE /producer/{id}`: Deleta uma entidade existente.

Context:

- Dashboard
  - `GET /dashboard`: Retorna conteúdo para alimentar dashboard.

## Possíveis Melhorias

Restruturacação da entidade Producer:

- Criar uma nova entidade com relacionamento na propriedade "plantation", para que as plantações não fiquem travadas somente nas opções Soja, Milho, Algodão, Café, Cana de Açucar;
- Com esta nova entidade poderiamos melhorar a implementação / performance atual da rota `GET /dashboard`, onde conseguiriamos fazer um "distinct" por plantação.

# Considerações Finais

Agradeço a oportunidade de participar deste processo seletivo. Estou disponível para discutir qualquer aspecto da implementação ou responder a quaisquer perguntas.

# Autor

Caio Fugii
