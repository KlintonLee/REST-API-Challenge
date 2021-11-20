import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import './common/container';
import config from './common/config';
import { customerRouter } from './modules/customers/routes';

const app = express();
const { port, name, nodeEnv } = config.app;

app.use(express.json());
app.use(cors());
app.use(customerRouter);

app.listen(port, () => {
  console.log(`${name} is running at port ${port} as ${nodeEnv} environment`);
});
