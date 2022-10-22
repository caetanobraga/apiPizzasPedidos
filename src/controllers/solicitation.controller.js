import { v4 as uuidv4 } from 'uuid';


let orders = []

export function findSolicitation(request,response){
    const {id} = request.params
    const solicitation = orders.find(order => order.id === id)
    if (solicitation){
        return response.json(solicitation)
    }
    return response.status(404).json({error:'Pedido não encontrado'})
}

export function findAllSolicitation(request,response){
    return response.json(orders)
}


export function createSolicitation(request,response){
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
}


export function deleteSolicitation(request,response){
    const {id} = request.params;
    const order = orders.find(order => order.id === id)
    if (order){
        orders = orders.filter(item => item.id !== order.id)
        return response.json(orders)
    }
    return response.status(404).json({error:'Pedido não encontrada'})
}

