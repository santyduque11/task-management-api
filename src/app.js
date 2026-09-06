const express = require('express');

const usersRoutes = require('./routes/users.routes');

const app = express();

const PORT = 3000;

// Middleware para recibir JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: "API funcionando correctamente"
    });
});

// Rutas de usuarios
app.use('/api/users', usersRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});