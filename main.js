const { request, response } = require('express');
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

app.delete('/pizzas/:id', (request,response) => {
    const {id} = request.params;
    const pizza = pizzas.find(pizza => pizza.id === id)
    if (pizza){
        pizzas = pizzas.filter(item => item.id !== pizza.id)
        return response.json(pizzas)
    }
    return response.status(404).json({error:'Pizza não encontrada'})
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


 app.get('/solicitations/:id', (request, response) => {
    const {id} = request.params
    const solicitation = orders.find(order => order.id === id)
    if (solicitation){
        return response.json(solicitation)
    }
    return response.status(404).json({error:'Pedido não encontrado'})
 })

 app.get('/solicitations', (request,response) => {
    return response.json(orders)
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

app.delete('/solicitations/:id', (request,response) => {
    const {id} = request.params;
    const order = orders.find(order => order.id === id)
    if (order){
        orders = orders.filter(item => item.id !== order.id)
        return response.json(orders)
    }
    return response.status(404).json({error:'Pedido não encontrada'})
})




app.listen(3333,()=> {
console.log("App rodando na porta 3333")
})
