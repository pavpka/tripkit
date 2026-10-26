// src/server.ts
import { app } from './app.js';
import { env } from './config/env.js';
//import { checkDbConnection } from './db.js';

//await checkDbConnection();

app.listen(env.port, () => {
    console.log(`Server: http://localhost:${env.port}`);
});
