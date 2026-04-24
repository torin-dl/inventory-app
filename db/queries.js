const pool = require("./pool");

async function getDogs() {
    const { rows } = await pool.query(
        "SELECT dogs.name AS dog_name, dogs.status, breeds.name AS breed_name, breeds.temperament, breeds.origin, breeds.photo FROM dogs JOIN breeds ON dogs.breed_id = breeds.id",
    );
    return rows;
}

async function getAllBreeds() {
    const { rows } = await pool.query(
        "SELECT breeds.name, breeds.temperament, breeds.origin, breeds.photo FROM breeds",
    );
    return rows;
}

async function getOneBreed(breed) {
    const { rows } = await pool.query(
        "SELECT dogs.name AS dog_name, dogs.status, breeds.name AS breed_name, breeds.temperament, breeds.origin, breeds.photo FROM dogs JOIN breeds ON dogs.breed_id = breeds.id WHERE breeds.name = $1",
        [breed],
    );
    return rows;
}

async function getAvailableDogs() {
    const { rows } = await pool.query(
        "SELECT dogs.name AS dog_name, dogs.status, breeds.name AS breed_name, breeds.temperament, breeds.origin, breeds.photo FROM dogs JOIN breeds ON dogs.breed_id = breeds.id WHERE dogs.status = 'Available'",
    );
}

async function getAdoptedDogs() {
    const { rows } = await pool.query(
        "SELECT dogs.name AS dog_name, dogs.status, breeds.name AS breed_name, breeds.temperament, breeds.origin, breeds.photo FROM dogs JOIN breeds ON dogs.breed_id = breeds.id WHERE dogs.status = 'Adopted'",
    );
}

async function addDog() {}

module.exports = { getDogs, getAllBreeds, getOneBreed, addDog, getAvailableDogs, getAdoptedDogs };
