const express = require('express');

const { catchAPokemon } = require('../../controllers/api/trainerController')
    
const router = express.Router();

router.put('/catch/:pokemonId', catchAPokemon)

module.exports = router;