import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import productsRoute from './routes/products';
import returnError from './middleware/errorHandler';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
// app.use('/ui', express.static('ui'));
app.use(cors());

app.use('/api/v1', productsRoute);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all('*', (req, res) => {
  res.redirect(301, '/api/v1');
});
app.use((err, req, res, next) => {
  returnError(err, res);
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server running on ${port}`));


export default server;
