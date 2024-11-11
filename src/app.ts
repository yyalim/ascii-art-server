import express from 'express';
import cors from 'cors';
import fileRoutes from './controllers/fileController';
import errorHandler from './middleware/errorHandler';
import notFoundHandler from './middleware/notFoundHandler';

const app = express();

app.use(cors());
app.use('/upload', fileRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
