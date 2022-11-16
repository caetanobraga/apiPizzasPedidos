import { v4 as uuidv4 } from 'uuid';
import { createSolicitationSchema}  from '../validations/createSolictation.schema.js'
import fs from 'fs'
import { Request, Response } from 'express';
import { readFileJson } from '../utils/readFileJson';
import { order } from '../types/orders.type.js';


const orders: order[] = readFileJson('orders.json');

export function findSolicitation(request: Request,response: Response){
    const {id} = request.params
    const solicitation = orders.find(order => order.id === id)
    if (solicitation){
        return response.json(solicitation)
    }
    return response.status(404).json({error:'Pedido não encontrado'})
}

export function findAllSolicitation(request: Request,response: Response){
    return response.json(orders)
}

export async function createSolicitation(request: Request,response: Response){
    try{
        await createSolicitationSchema.validate(request.body)
        const {
            name_client,
            document_client,
            contact_client,
            address_client,
            payment_method,
            itens,
            observation,
        } = request.body

        const solicitation = {
            id: uuidv4(),
            name_client,
            document_client,
            contact_client,
            address_client,
            payment_method,
            itens,
            observation,
            status: 'em Producao'
        }
        fs.writeFileSync('orders.json', JSON.stringify([...orders,solicitation]))
        response.status(201).json(solicitation)
    } catch (error){
        response.status(400).json({error: "Erro ao criar pedido"})
    }

}

export function deleteSolicitation(request: Request,response: Response){
    const {id} = request.params;
    const order = orders.find(order => order.id === id)
    if (order){
        const ordersUpdated = orders.filter(item => item.id !== order.id)
        fs.writeFileSync('orders.json', JSON.stringify(ordersUpdated))

        return response.json(ordersUpdated)
    }
    return response.status(404).json({error:'Pedido não encontrada'})
}

export function updateStatus(request: Request,response: Response){

    const updatedOrders = orders.map(order => {
        if (order.id === request.params.id){
            order.status = 'A CAMINHO'
        }
        return order;
    })

    fs.writeFileSync('orders.json', JSON.stringify(updatedOrders))
    return response.json()
}
