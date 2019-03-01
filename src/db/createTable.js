import pool from './setup';

pool.on('connect', () => {
  console.log('connected to the db');
});


const products = `CREATE TABLE IF NOT EXISTS
        products(
          id serial PRIMARY KEY NOT NULL,
          name VARCHAR(128) NOT NULL,
          description VARCHAR(128) NOT NULL,
          price NUMERIC(15) NOT NULL,
          category VARCHAR(128) NOT NULL,
          image VARCHAR(128) NOT NULL,
          color VARCHAR(128) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`;

async function createTable(product) {
  try {
    const results = await pool.query(product);
    console.log(results);
    await pool.end();
  } catch (err) {
    console.log(err);
    await pool.end();
  }
}

createTable(products);

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
