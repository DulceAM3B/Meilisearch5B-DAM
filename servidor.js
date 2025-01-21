const express = require('express');
const { MeiliSearch } = require('meilisearch');
const cors = require('cors');// Permite solicitudes desde el frontend

const app = express();

app.use(cors());
app.use(express.json());
// Instanciar un cliente de MeiliSearch con la dirección y la clave API
const client = new MeiliSearch({
  host: 'http://172.233.131.83:7700', apiKey: '6d9bb59dca80659707c17d1363e5393fd13475362644c14faf0652ee886',
});

// Crear un índice en MeiliSearch
app.post('/search', async (req, res) => {
  try {
    // Crear el índice si no existe
    const { query } = req.body;// Obtener el término de búsqueda desde el cuerpo de la solicitud
    const index = client.index('movies');// Especificar el índice a buscar
    const searchResults = await index.search(query);
    // Responder en formato JSON
    res.json(searchResults);
  } catch (error) {
    // En caso de error de búsqueda, responder con un estado 500
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({ error: 'Error al realizar la búsqueda' });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  // Servidor exitoso = mostrar un mensaje en consola
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});