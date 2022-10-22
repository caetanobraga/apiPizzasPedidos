import {Router} from 'express';
import { findSolicitation, 
    findAllSolicitation, 
    createSolicitation,
    deleteSolicitation } from '../controllers/solicitation.controller.js';

const solicitationsRoutes = Router();

solicitationsRoutes.get('/solicitations/:id', findSolicitation)
solicitationsRoutes.get('/solicitations', findAllSolicitation)
solicitationsRoutes.post('/solicitations', createSolicitation)
solicitationsRoutes.delete('/solicitations/:id', deleteSolicitation)

export default solicitationsRoutes;