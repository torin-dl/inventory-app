const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS breeds (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    temperament VARCHAR ( 255 ),
    origin VARCHAR ( 255 ),
    photo VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS dogs (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    status VARCHAR ( 255 ),
    breed_id INTEGER REFERENCES breeds(id)
);

INSERT INTO breeds (name, temperament, origin, photo)
VALUES
    ('Labrador', 'Outgoing', 'United Kingdom', 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Yellow_Labrador_Retriever_2.jpg'),
    ('Beagle', 'Amiable', 'United Kingdom', 'https://upload.wikimedia.org/wikipedia/commons/f/f5/MiloSmet.JPG'),
    ('French Bulldog', 'Playful', 'France', 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Bouledogue-fauve-Gaston.jpg'),
    ('Golden Retriever', 'Even Tempered', 'United Kingdom', 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_Retriever_Dukedestiny01_drvd.jpg'),
    ('German Shepherd', 'Obedient', 'Germany', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/German-shepherd-4040871920._%282%29.jpg/1280px-German-shepherd-4040871920._%282%29.jpg'),
    ('Pug', 'Playful', 'China', 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Bonny_Bonita.JPG'),
    ('Rottweiler', 'Steady', 'Germany', 'https://upload.wikimedia.org/wikipedia/commons/8/84/%2801%29_Rottweiler_5830118718_ce2570e348_o.jpg'),
    ('Australian Shepherd', 'Intelligent', 'United States', 'https://upload.wikimedia.org/wikipedia/commons/1/19/Australian_Shepherd_rot_tricolor.jpg'),
    ('Border Collie', 'Intelligent', 'United Kingdom', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Argentine_border_collie.jpg/1280px-Argentine_border_collie.jpg'),
    ('Australian Cattle Dog', 'Obedient', 'Australia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Australian_Cattle_Dog_Chessie.jpg/960px-Australian_Cattle_Dog_Chessie.jpg'),
    ('American Eskimo Dog', 'Friendly', 'Germany', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/American_Eskimo_Dog_1.jpg/1280px-American_Eskimo_Dog_1.jpg'),
    ('Pembroke Welsh Corgi', 'Playful', 'United Kingdom', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Welsh_corgi_pembroke_portret_00pl.jpg/1280px-Welsh_corgi_pembroke_portret_00pl.jpg'),
    ('American Pit Bull Terrier', 'Obedient', 'United States', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/American_Pitbull_001.jpg/500px-American_Pitbull_001.jpg'),
    ('Shiba Inu', 'Charming', 'Japan', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ttWfRlhtWnLBz6GyvnrLZORBa_rojHT4xou7JxTgqacMx3fqGRyE08BnyHcY8USgKgNXOOY43QEGmC0XDsUGSguxIwmCH1JbyrKZ4rInvUR-BQ&s=10&ec=121638500');

INSERT INTO dogs (name, status, breed_id)
VALUES
    ('Cherry', 'Available', 14),
    ('Rex', 'Available', 7),
    ('Buddy', 'Adopted', 3),
    ('Gimli', 'Available', 6),
    ('Blue', 'Available', 10),
    ('Mochi', 'Available', 11),
    ('Astor', 'Adopted', 12),
    ('Ben', 'Adopted', 1),
    ('Doug', 'Adopted', 4),
    ('Alma', 'Available', 2),
    ('Bear', 'Available', 13)
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
