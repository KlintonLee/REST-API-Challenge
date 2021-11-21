import { container } from 'tsyringe';

import config from '../config';
import { MariaDbConnection } from '../database/mariadb';

const { mysql } = config.database;
container.registerInstance<MariaDbConnection>('MariaDbConnection', new MariaDbConnection(mysql));
