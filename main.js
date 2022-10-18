const { request } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json())

let pizzas = []
let orders = []

app.get('/pizzas', (request,response) => {
    const nameQuery = request.query.name || ""
    const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery))
    response.json(pizzasFiltered)
})

app.post('/pizzas', (request,response) => {
    const {name,url,description,price,ingredientes} = request.body

    const pizzaExists = pizzas.find(pizza => pizza.name === name)

    if (pizzaExists){
        return response.status(401).json({error:'Pizza já cadastrada'})
    }

    const pizza = {
        id: uuidv4(),
        name,
        url,
        description,
        price,
        ingredientes,
        created_at:  new Date().toLocaleDateString('pt-BR')
    }
    pizzas.push(pizza)
    response.status(201).json(pizza)
 })


 app.get('/solicitations', (request,response) => {
    const nameQuery = request.query.name || ""
    const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery))
    response.json(pizzasFiltered)
})

app.post('/solicitations',(request,response) =>{
    const {
        name_client,
        document_client,
        contact_client,
        address_client,
        payment_method,
        pizzas,
        observation,
    } = request.body

    const solicitation = {
        id: uuidv4(),
        name_client,
        document_client,
        contact_client,
        address_client,
        payment_method,
        pizzas,
        observation,
        Status: 'em Producao'

    }

    orders.push(solicitation)
    response.status(201).json(solicitation)
})


app.listen(3333,()=> {
console.log("App rodando na porta 3333")
})
