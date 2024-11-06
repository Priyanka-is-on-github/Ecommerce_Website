const pool = require("../config/db");

(async () => {
    await pool.query(`CREATE TABLE products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    product_id VARCHAR(200) NOT NULL,
    price FLOAT,
    title VARCHAR(200) NOT NULL,
    
    `
    )

    await pool.query(`create table userinfnfo(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(200) NOT NULL
)`)
})()


