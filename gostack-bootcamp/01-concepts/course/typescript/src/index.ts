import express from 'express';
import { helloWorld } from './routes';

const app = express();

app.get('/', helloWorld);

app.listen(3213, () => {
    console.log(`App listening on port ${3213}`);
});