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
        "SELECT dogs.name AS dog_name, dogs.status, breeds.name AS breed_name, breeds.temperament, breeds.origin, breeds.photo FROM dogs JOIN breeds ON dogs.breed_id = breeds.id WHERE REPLACE(breeds.name, ' ', '') = REPLACE($1, ' ', '')",
        [breed],
    );
    return rows;
}

async function getAvailableDogs() {
    const { rows } = await pool.query(
        "SELECT dogs.name AS dog_name, dogs.status, breeds.name AS breed_name, breeds.temperament, breeds.origin, breeds.photo FROM dogs JOIN breeds ON dogs.breed_id = breeds.id WHERE dogs.status = 'Available'",
    );
    return rows;
}

async function getAdoptedDogs() {
    const { rows } = await pool.query(
        "SELECT dogs.name AS dog_name, dogs.status, breeds.name AS breed_name, breeds.temperament, breeds.origin, breeds.photo FROM dogs JOIN breeds ON dogs.breed_id = breeds.id WHERE dogs.status = 'Adopted'",
    );
    return rows;
}

async function addDog(name, breed, status) {
    const { rows } = await pool.query(
        "SELECT id FROM breeds WHERE REPLACE(LOWER(name), ' ', '') = REPLACE(LOWER($1), ' ', '')",
        [breed],
    );
    if (rows.length === 0) {
        throw new Error(`Breed "${breed}" not found`);
    }
    const breed_id = rows[0].id;
    await pool.query("INSERT INTO dogs (name, status, breed_id) VALUES ($1, $2, $3)", [name, status, breed_id]);
}

async function updateDog(dog_id, name, breed, status) {
    const { rows } = await pool.query(
        "SELECT id FROM breeds WHERE REPLACE(LOWER(name), ' ', '') = REPLACE(LOWER($1), ' ', '')",
        [breed],
    );
    if (rows.length === 0) {
        throw new Error(`Breed "${breed}" not found`);
    }
    const breed_id = rows[0].id;

    await pool.query("UPDATE dogs SET name = $2, status = $4, breed_id = $3 WHERE id = $1", [
        dog_id,
        name,
        breed_id,
        status,
    ]);
}

module.exports = { getDogs, getAllBreeds, getOneBreed, getAvailableDogs, getAdoptedDogs, addDog, updateDog };
