// Import the Pokemon and Trainer models to interact with the database.
const Pokemon = require("../../models/pokemonModel");
const Trainer = require("../../models/trainerModel");

// Handler function to render the main index page.
const getIndexPage = (_, res) => {
  // Render the 'index' view using the template engine.
  res.render("index");
};

// Handler function to fetch and render a page with all Pokemon.
const getAllMonsPage = async (_, res) => {
  try {
    // Retrieve all Pokemon from the database.
    const pokemons = await Pokemon.find({});
    // Render the 'allMons' view with the list of Pokemon.
    res.status(200).render("allMons", { pokemons });
  } catch (error) {
    // Prepare an error message packet if an error occurs.
    const packet = {
      message: "failure in getAllMonsPage",
      payload: error,
    };

    // Log the error and send a JSON response with error status.
    console.log(packet);
    res.status(500).json(packet);
  }
};

// Handler function to fetch and render a page for a single Pokemon by name.
const getOneMonsPage = async (req, res) => {
  // Format the requested Pokemon name to proper case.
  const name =
    req.params.name[0].toUpperCase() + req.params.name.slice(1).toLowerCase();
  try {
    // Retrieve all trainers for listing on the Pokemon's page.
    const trainers = await Trainer.find({});
    // Retrieve the Pokemon by name.
    const pokemon = await Pokemon.findOne({ Name: name });
    if (!pokemon) {
      // If no Pokemon found, ideally redirect to a 404 page or handle error.
      // res.status(404).json({message: 'No pokemon with that name found.'});
      // return;
    }

    // Render the 'oneMon' view with the found Pokemon and all trainers.
    res.render("oneMon", { pokemon: pokemon, trainers: trainers });
  } catch (error) {
    // Handle errors with a prepared error message packet.
    const packet = {
      message: "failure in getOnePokemon",
      payload: error,
    };

    // Log and send error information as JSON.
    console.log(packet);
    res.status(500).json(packet);
  }
};

// Handler function to render the page to create a new Pokemon.
const getCreateMonsPage = (_, res) => {
  // Render the 'createMon' view.
  res.render("createMon");
};

// Handler function to fetch and render the update page for a specific Pokemon.
const getUpdateMonsPage = async (req, res) => {
  // Format the Pokemon's name from the request parameters.
  const name = req.params.name;
  const cleanedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  // Retrieve the specific Pokemon by name.
  const pokemon = await Pokemon.findOne({ Name: cleanedName });
  // Render the 'updateMon' view with the specific Pokemon.
  res.render("updateMon", { pokemon: pokemon });
};

// Handler function to fetch and render a page with all trainers.
const getAllTrainersPage = async (_, res) => {
  // Retrieve all trainers from the database.
  const trainers = await Trainer.find({});
  // Render the 'allTrainers' view with the list of trainers.
  res.render("allTrainers", { trainers: trainers });
};

// Handler function to fetch and render a page for a specific trainer by ID.
const getOneTrainersPage = async (req, res) => {
  // Retrieve the specific trainer by their ID.
  const trainer = await Trainer.findById(req.params.id);
  // Find all Pokemon associated with the trainer's ID list.
  const pokemons = await Pokemon.find({ _id: { $in: trainer.Pokemons } });
  // Render the 'oneTrainer' view with the trainer and their Pokemon.
  res.render("oneTrainer", { trainer: trainer, pokemons: pokemons });
};

// Handler function to fetch and render a page for a specific region and its trainers.
const getOneRegionPage = async (req, res) => {
  // Retrieve the region name from the request parameters.
  const region = req.params.region;
  // Find all trainers associated with that region.
  const trainers = await Trainer.find({ Region: region });
  // Render the 'oneRegion' view with the region and list of associated trainers.
  res.render("oneRegion", { region: region, trainers: trainers });
};

// Export all the handler functions to be used in routing.
module.exports = {
  getIndexPage,
  getAllMonsPage,
  getOneMonsPage,
  getCreateMonsPage,
  getUpdateMonsPage,
  getAllTrainersPage,
  getOneTrainersPage,
  getOneRegionPage,
};
