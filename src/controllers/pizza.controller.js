import { v4 as uuidv4 } from 'uuid';


let pizzas = []

export function findAllPizzas(request,response){
    const nameQuery = request.query.name || ""
    const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery))
    response.json(pizzasFiltered)
}

export function deletePizza(request,response){
    const {id} = request.params;
    const pizza = pizzas.find(pizza => pizza.id === id)
    if (pizza){
        pizzas = pizzas.filter(item => item.id !== pizza.id)
        return response.json(pizzas)
    }
    return response.status(404).json({error:'Pizza não encontrada'})
}

export function createPizza(request,response){
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
}