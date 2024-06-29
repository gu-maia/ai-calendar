import express from 'express';
import "dotenv/config";

const app = express();
const port = process.env.APP_PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
