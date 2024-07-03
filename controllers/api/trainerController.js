// Import the Trainer model from the relative path to manage Trainer data using Mongoose.
const Trainer = require("../../models/trainerModel");

// Define an asynchronous function to add a Pokemon to a Trainer's collection.
const catchAPokemon = async (req, res) => {
  // Retrieve the Trainer document by ID from the request body.
  const trainer = await Trainer.findById(req.body.trainerId);

  // If the Trainer's Pokemons array is undefined, initialize it as an empty array.
  if (!trainer.Pokemons) {
    trainer.Pokemons = [];
  }

  // Add the Pokemon's ID from the request parameters to the Trainer's Pokemons array.
  trainer.Pokemons.push(req.params.pokemonId);

  // Save the updated Trainer document to the database.
  trainer.save();

  // Redirect to the individual page of the Trainer after adding the Pokemon.
  res.redirect(`/oneTrainer/${trainer._id}`);
};

// Export the catchAPokemon function to be used in other parts of the application.
module.exports = { catchAPokemon };
