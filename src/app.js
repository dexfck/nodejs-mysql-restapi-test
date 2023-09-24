import express from 'express';
import taskRoutes from './routes/tasks.routes.js';

const app = express()

app.use(express.json())
app.use('/api', taskRoutes)
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;
