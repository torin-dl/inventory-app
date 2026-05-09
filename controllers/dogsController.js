const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateAdd = [
    body("name").trim().isLength({ min: 1, max: 16 }).withMessage(`Name must be less than 16 characters`),
    body("breed").trim().isLength({ min: 2, max: 38 }).withMessage(`Breed must be less than 38 characters`),
    body("status").trim().isAlpha(),
];
const validateUpdate = [
    body("dog_id").trim(),
    body("name").trim().isLength({ min: 1, max: 16 }).withMessage(`Name must be less than 16 characters`),
    body("breed").trim().isLength({ min: 2, max: 38 }).withMessage(`Breed must be less than 38 characters`),
    body("status").trim().isAlpha(),
];
const validateRemove = [body("category").trim(), body("remove_id").trim()];

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
    validateAdd,
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
    validateUpdate,
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

function removeGet(req, res) {
    res.render("remove");
}

const removePost = [
    validateRemove,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("tests");
            return res.status(400).render("remove", {
                errors: errors.array(),
            });
        }

        const { category, remove_id } = matchedData(req);
        if (category === "remove_dog") {
            try {
                await db.removeDog(remove_id);
                res.redirect("/");
            } catch (err) {
                res.status(400).render("remove", {
                    error: err.message,
                });
            }
        } else {
            try {
                await db.removeBreed(remove_id);
                res.redirect("/");
            } catch (err) {
                res.status(400).render("remove", {
                    error: err.message,
                });
            }
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
    removeGet,
    removePost,
};
