const express = require('express');

const {
    getAllPokemon,
    getOnePokemon,
    createOnePokemon,
    deleteOnePokemon,
    updateOnePokemon,
} = require('../../controllers/api/pokemonController')

const router = express.Router();

// GET http://localhost:3000/api/pokemon
router.get('/', getAllPokemon);
// GET http://localhost:3000/api/pokemon/:name
router.get('/:name', getOnePokemon);
// POST http://localhost:3000/api/pokemon
router.post('/', createOnePokemon);
// DELETE http://localhost:3000/api/pokemon/:name
router.delete('/:name', deleteOnePokemon)
// PUT http://localhost:3000/api/pokemon/:name
router.put('/:name', updateOnePokemon)

module.exports = router;