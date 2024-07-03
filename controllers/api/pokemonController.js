// Import the Pokemon model from the relative path to manage Pokemon data using Mongoose.
const Pokemon = require('../../models/pokemonModel');

// Define an asynchronous function to retrieve all Pokemon from the database.
const getAllPokemon = async (_, res) => {
    try {
        // Fetch all Pokemon records from the database.
        const pokemon = await Pokemon.find({});
        // Send a success response with the fetched data.
        res.status(200).json({ message: 'success', payload: pokemon });
    } catch (error) {
        // Prepare an error message packet.
        const packet = {
            message: 'failure in geAllPokemon',
            payload: error,
        };

        // Log the error packet to the console.
        console.log(packet);
        // Send a server error response with the error packet.
        res.status(500).json(packet);
    }
};

// Define an asynchronous function to retrieve a specific Pokemon by name.
const getOnePokemon = async (req, res) => {
    // Extract and format the Pokemon name from the request parameters.
    const name = req.params.name[0].toUpperCase() + req.params.name.slice(1).toLowerCase();
    try {
        // Find the Pokemon by name in the database.
        const pokemon = await Pokemon.findOne({ Name: name });
        if (!pokemon) {
            // If no Pokemon found, send a not found response.
            res.status(404).json({message: 'failure', payload: 'No pokemon with that name found.'});
            return;
        }

        // Send a success response with the found Pokemon.
        res.status(200).json({ message: 'success', payload: pokemon });
    } catch (error) {
        // Prepare an error message packet for this specific function.
        const packet = {
            message: 'failure in getOnePokemon',
            payload: error
        };

        // Log the error packet to the console.
        console.log(packet);
        // Send a server error response with the error packet.
        res.status(500).json(packet);
    }
};

// Define an asynchronous function to create a new Pokemon record.
const createOnePokemon = async (req, res) => {
    // Create a Pokemon object from the request body data.
    const pokemon = {
        Name: req.body.Name,
        Type: req.body.Type,
        PokedexNo: req.body.PokedexNo,
        Moves: req.body.Moves.split(', ')
    };

    try {
        // Insert the new Pokemon into the database.
        const created = await Pokemon.create(pokemon);
        // Redirect to the page of the newly created Pokemon.
        res.redirect(`/oneMon/${created.Name}`);
    } catch (error) {
        // Prepare an error message packet for creation failures.
        const packet = {
            message: 'failure in createOnePokemon',
            payload: error
        };

        // Log the error packet to the console.
        console.log(packet);
        // Send a server error response with the error packet.
        res.status(500).json(packet)
    }

};

// Define an asynchronous function to delete a specific Pokemon by name.
const deleteOnePokemon = async (req, res) => {
    try {
        // Format the name extracted from request parameters.
        const name = req.params.name[0].toUpperCase() + req.params.name.slice(1).toLowerCase();
        // Delete the Pokemon by its name.
        await Pokemon.deleteOne({ Name: name });
        // Redirect to the all Pokemon page after deletion.
        res.redirect('/allMons')
    } catch (error) {
        // Prepare an error message packet for deletion failures.
        const packet = {
            message: 'failure in deleteOnePokemon',
            payload: error,
        }
        
        // Log the error packet to the console.
        console.log(packet);
        // Send a server error response with the error packet.
        res.status(500).json(packet);
    }
};

// Define an asynchronous function to update a specific Pokemon.
const updateOnePokemon = async (req, res) => {
    // Retrieve the name and update data from the request.
    const name = req.params.name; // the pokemon they want to update, e.g. 'Bulbasaur'
    const updateData = req.body; // the pokemon data they want to update with, e.g. {Name: 'Colinsaur', PokedexNo: -5, Type: 'goof', Moves: ['Goof around', 'Sleep in on weekends']}
    const cleanedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    // Find the Pokemon by the formatted name.
    const pokemon = await Pokemon.findOne({Name: cleanedName});
    // Update the Pokemon's properties with the new data.
    pokemon.Name = updateData.Name;
    pokemon.Type = updateData.Type;
    pokemon.Moves = updateData.Moves.split(', ')
    pokemon.PokedexNo = updateData.PokedexNo;
    // Save the updated Pokemon back to the database.
    await pokemon.save();
    // Redirect to the updated Pokemon's page.
    res.redirect(`/oneMon/${pokemon.Name}`);
};

// Export the controller functions to be used in other parts of the application.
module.exports = {
    getAllPokemon,
    getOnePokemon,
    createOnePokemon,
    deleteOnePokemon,
    updateOnePokemon,
};
