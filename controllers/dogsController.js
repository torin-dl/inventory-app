const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function showDogsGet(req, res) {
    const dogs = await db.getAllBreeds();

    res.render("index", { dogs: dogs, includeNames: false });
}

async function showDogsPost(req, res) {
    const category = req.body.category;
    let dogs;

    if (category != "Available" && category != "Adopted") {
        dogs = await db.getOneBreed(category);
    } else if (category === "Available") {
        dogs = await db.getAvailableDogs();
    } else {
        dogs = await db.getAdoptedDogs();
    }
    res.render("index", { dogs: dogs, includeNames: true });
}

module.exports = {
    showDogsGet,
    showDogsPost,
};
