import express from 'express';
const app = express();
import { getTablesData, getTableSchema, getTableData } from './services/coda.js';

app.use(express.json());

app.get('/data', async (req, res) => {
    try {
        const data = await getTablesData();
        res.json(data);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

app.get('/data/:tableId', async (req, res) => {
    const { tableId } = req.params;
    try {
        const data = await getTableData(tableId);
        res.json(data);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
})

app.get('/schema/:tableId', async (req, res) => {
    const { tableId } = req.params;
    try {
        const data = await getTableSchema(tableId);
        res.json(data);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
