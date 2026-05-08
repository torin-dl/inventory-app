const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateMessage = [body("name").trim(), body("breed").trim(), body("status").trim(), body("dog_id").trim()];

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

function addDogGet(req, res) {
    res.render("addDog");
}

const addDogPost = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("addDog", {
                errors: errors.array(),
            });
        }

        const { name, breed, status } = matchedData(req);

        try {
            await db.addDog(name, breed, status);
            res.redirect("/");
        } catch (err) {
            res.status(400).render("addDog", {
                error: err.message,
            });
        }
    },
];

function updateDogGet(req, res) {
    res.render("updateDog");
}

const updateDogPost = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateDog", {
                errors: errors.array(),
            });
        }

        const { dog_id, name, breed, status } = matchedData(req);
        try {
            await db.updateDog(dog_id, name, breed, status);
            res.redirect("/");
        } catch (err) {
            res.status(400).render("updateDog", {
                error: err.message,
            });
        }
    },
];

module.exports = {
    showDogsGet,
    showDogsPost,
    addDogGet,
    addDogPost,
    updateDogGet,
    updateDogPost,
};
