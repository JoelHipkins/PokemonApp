const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    Type: {
        type: String,
        required: true,
    },

    PokedexNo: {
        type: Number,
        required: true,
        unique: true,
    },

    Name: {
        type: String,
        required: true,
        unique: true,
    },
    
    Moves: {
        type: [String],
        required: true,
    },
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;