const queries = {
  getAll() {
    return 'SELECT id, name, price FROM products';
  },

  create(...restArgs) {
    return {
      text: `INSERT INTO
        products( name, description, price, category, image, color)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`,
      values: [
        restArgs[0],
        restArgs[1],
        restArgs[2],
        restArgs[3],
        restArgs[4],
        restArgs[5],
      ],
    };
  },

  getByID(id) {
    return {
      text: 'SELECT id, name, description, price, category, image, color FROM products where id= $1',
      values: [id],
    };
  },
};
export default queries;
