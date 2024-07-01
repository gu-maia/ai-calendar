import express from 'express';
import bodyParser from 'body-parser';
import { createEvent, getEvents } from './api/controllers/CalendarController';
import "dotenv/config";

const app = express();
const PORT = process.env.APP_PORT;

app.use(bodyParser.json());

app.post('/create', createEvent);
app.get('/events', getEvents);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
