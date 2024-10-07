import express from 'express';
const app = express();
import { getDataFromCoda } from './services/coda.js';

app.use(express.json());

app.get('/data', async (req, res) => {
    try {
        const data = await getDataFromCoda();
        res.json(data);
    } catch(err) {
        console.log(res);
        res.status(500).json({error: err.message});
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
