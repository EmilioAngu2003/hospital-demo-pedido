const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
const corsOptions = {
    origin: allowedOrigin,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions))
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor Express funcionando para la demo!');
});

app.post('/api/pedidos', (req, res) => {
    const nuevoPedido = req.body;
    console.log('Pedido Recibido:', nuevoPedido);


    res.status(201).json({
        message: 'Pedido registrado con éxito',
        data: nuevoPedido
    });
});

app.listen(port, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${port}`);
});