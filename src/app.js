import express from 'express';
import cors from 'cors'
import pizzasRoutes from './routes/pizzas.routes.js';
import solicitationsRoutes from './routes/solicitations.routes.js';

const app = express();

app.use(express.json())
app.use(cors())
app.use(pizzasRoutes)
app.use(solicitationsRoutes)





export default app