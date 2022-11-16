import { v4 as uuidv4 } from 'uuid';
import { createSolicitationSchema}  from '../validations/createSolictation.schema.js'
import { getSolicitationsInFile } from '../utils/getSolicitationsInFile.js'
import fs, { write } from 'fs'


const orders = getSolicitationsInFile();

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


export async function createSolicitation(request,response){
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
        response.status(400).json({error: error.message})
    }
    
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

export function updateStatus(request, response){

    const updatedOrders = orders.map(order => {
        if (order.id === request.params.id){
            order.status = 'A CAMINHO'
        }
        return order;
    })

    fs.writeFileSync('orders.json', JSON.stringify(updatedOrders))
    return response.json()
}
