CREATE TABLE products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    product_id VARCHAR(200),
    price FLOAT,
    title VARCHAR(300)
);