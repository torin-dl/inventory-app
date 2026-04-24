const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function showDogsGet(req, res) {
    const dogs = await db.getAllBreeds();

    res.render("index", { dogs: dogs });
}

//get parameters from category.ejs
async function showDogsPost(req, res) {
    const category = req.params.category;
    let dogs;
    if (category != "available" && category != "adopted") {
        dogs = await db.getOneBreed(category);
    } else if (category === "available") {
        dogs = await db.getAvailableDogs();
    } else {
        dogs = await db.getAdoptedDogs();
    }

    res.render("index", { dogs: dogs });
}

module.exports = {
    showDogsGet,
    showDogsPost,
};
