import {Router} from 'express';
import { findAllPizzas, deletePizza, createPizza } from '../controllers/pizza.controller.ts';

const pizzasRoutes = Router()

pizzasRoutes.get('/pizzas', findAllPizzas)
pizzasRoutes.delete('/pizzas/:id', deletePizza)
pizzasRoutes.post('/pizzas', createPizza) 

export default pizzasRoutes;