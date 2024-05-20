const Genre = require("../models/Genre");

const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find({}).populate('developer', 'name');
        res.status(200).json({
            data: genres,
            success: true,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        console.error("Error fetching all genres", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const getGenreById = async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findById(id).populate('developer', 'name');
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: `Genre with id ${id} not found`,
            });
        }
        res.status(200).json({
            data: genre,
            success: true,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        console.error("Error fetching genre by ID", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const createGenre = async (req, res) => {
    const { genre } = req.body;
    try {
        const newGenre = await Genre.create(genre);
        console.log("data >>>", newGenre);
        res.status(200).json({
            success: true,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            console.error("Error Validating!", error);
            res.status(422).json(error);
        } else {
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const updateGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findByIdAndUpdate(id, req.body, { new: true }).populate('developer', 'name');
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: `Genre with id ${id} not found`,
            });
        }
        res.status(200).json({
            data: genre,
            success: true,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        console.error("Error updating genre", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const deleteGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findByIdAndDelete(id);
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: `Genre with id ${id} not found`,
            });
        }
        res.status(200).json({
            success: true,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        console.error("Error deleting genre", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
};