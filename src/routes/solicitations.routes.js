import {Router} from 'express';
import { findSolicitation, 
    findAllSolicitation, 
    createSolicitation,
    deleteSolicitation, 
    updateStatus} from '../controllers/solicitation.controller.js';

const solicitationsRoutes = Router();

solicitationsRoutes.get('/solicitations/:id', findSolicitation)
solicitationsRoutes.get('/solicitations', findAllSolicitation)
solicitationsRoutes.post('/solicitations', createSolicitation)
solicitationsRoutes.delete('/solicitations/:id', deleteSolicitation)
solicitationsRoutes.patch('/solicitations/:id/status', updateStatus)

export default solicitationsRoutes;