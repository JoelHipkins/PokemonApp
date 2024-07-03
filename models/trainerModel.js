const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const trainerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
    },

    Region: {
        type: String,
        required: true,
    },

    Pokemons: {
        type: [
            {
                type: ObjectId,
                ref: "pokemons",
            }
        ]
    }
})

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;