import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { createPizzaSchema}  from '../validations/createPizza.schema.js';
import { readFileJson } from '../utils/readFileJson';
import { Request, Response } from 'express';
import { QueryParamsFindMyPizzas, BodyParamsCreatePizza, Pizza } from '../types/pizzas.type.js';

export function findAllPizzas(request: Request<{},{},{},QueryParamsFindMyPizzas>,response: Response){
    const nameQuery = request.query.name || ""
    const pizzas: Pizza[] = readFileJson('pizzas.json');
    const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery))
    response.json(pizzasFiltered)
}

export function deletePizza(request: Request,response: Response){
    const {id} = request.params;
    let pizzas: Pizza[] = readFileJson('pizzas.json');
    const pizza = pizzas.find(pizza => pizza.id === id)
    if (pizza){
        pizzas = pizzas.filter(item => item.id !== pizza.id)
        fs.writeFileSync('pizzas.json', JSON.stringify(pizzas))
        return response.json(pizzas)
    }
    return response.status(404).json({error:'Pizza não encontrada'})
}

export async function createPizza(request: Request<{},{},BodyParamsCreatePizza>,response: Response){
    try{
        await createPizzaSchema.validate(request.body)
        const {name,url,description,price,ingredients} = request.body
        const pizzas: Pizza[] = readFileJson('pizzas.json');
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
            ingredients,
            created_at:  new Date().toLocaleDateString('pt-BR')
        }

        fs.writeFileSync('pizzas.json', JSON.stringify([...pizzas,pizza]))

        response.status(201).json(pizza)
    } catch (error){
        response.status(400).json({error: "erro ao cadastrar"})
    }


}

