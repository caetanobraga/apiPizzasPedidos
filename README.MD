**[M2S02] Ex 1 - Pizzaria Divina Pizza**

Você foi convidado para construir o Backend da Pizzaria Divina Pizza. A aplicação contempla o gerenciamento de pizzas e pedidos do estabelecimento.

Com base nisso, crie um projeto NodeJs utilizando os conhecimentos obtidos nessa semana. Além disso, configure um servidor Express na porta 3333.

Crie um conjunto de rotas que permita gerenciar as pizzas da aplicação.

‌

Listar todas as pizzas

- Ação: **GET**
- Endpoint: /pizzas
- Query params: name
- Resposta: Status Code 200;  Um array de objetos contendo (id, name, description, price, ingredients).

‌

Cadastrar uma nova pizza

- Ação: **POST**
- Endpoint: /pizzas
- BODY: cada pizza contém um nome, descrição, price e um array de ingredientes.
- Resposta: Status Code 201; O objeto da pizza criada.

‌Crie um conjunto de rotas que permita gerenciar os pedidos da aplicação.

‌

Listar todos os pedidos

- Ação: **GET**
- Endpoint: /solicitations
- Resposta: Status code 200;  um array de objetos contendo o detalhes de cada pedido.

‌

Cadastrar um novo pedido

- Ação: **POST**
- Endpoint: /solicitations
- BODY:  nome do cliente, cpf do cliente, endereço do cliente,  telefone do cliente, forma de pagamento, observação, pedido do cliente(array).
- Resposta: O objeto do pedido criado.
- Crie uma rota que permita visualizar o detalhes de um determinado pedido utilizando o **id** do pedido como **Route Params.**
