import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import './common/container';
import config from './common/config';
import { routes } from './routes';

const app = express();
const { port, name, nodeEnv } = config.app;

app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`${name} is running at port ${port} as ${nodeEnv} environment`);
});
