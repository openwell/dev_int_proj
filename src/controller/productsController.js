import db from '../db/index';
import queries from '../db/queries';
import errorHandler from '../middleware/errorHandler';

class Controller {
  static home(req, res) {
    return res.status(200).json({
      status: 200,
      data: 'Welcome to the Javascript Developer Technical Assessment API',
    });
  }

  static async createProduct(req, res) {
    const name = req.body.name.trim();
    const description = req.body.description.trim();
    const price = req.body.price.trim();
    const category = req.body.category.trim();
    const { filename } = req.file;
    const color = req.body.color.trim();
    console.log(name, description, price, category, filename, color);
    try {
      const { rows } = await db.query(
        queries.create(name, description, price, category, filename, color),
      );
      rows[0].image = `${req.protocol}://${req.get('host')}/uploads/${rows[0].image}`;
      rows[0].price = `N${rows[0].price}`;
      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (err) {
      return errorHandler(500, res, err);
    }
  }

  static async allProducts(req, res) {
    try {
      let { rows } = await db.query(queries.getAll());
      if (rows.length === 0 === 0) {
        rows = 'Empty Resource';
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (err) {
      return errorHandler(500, res, err);
    }
  }

  static async findProductById(req, res) {
    const id = req.params.productId;
    try {
      let { rows } = await db.query(queries.getByID(id));
      rows.forEach((x) => {
        const xx = x;
        xx.image = `${req.protocol}://${req.get('host')}/uploads/${xx.image}`;
        xx.price = `N${xx.price}`;
      });
      if (rows.length === 0) {
        rows = 'Id doesn\'t exists';
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (err) {
      return errorHandler(500, res, err);
    }
  }
}

export default Controller;
