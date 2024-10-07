import fetch from 'node-fetch';
import config from '../utils/config.js';
const { CODA_API_BASE_URL, DOC_ID, CODA_API_TOKEN } = config;

export async function getTablesData() {
    //const response = await fetch(`${CODA_API_BASE_URL}/docs/${DOC_ID}/tables/${TABLE_ID}/rows`, {
    const response = await fetch(`${CODA_API_BASE_URL}/docs/${DOC_ID}/tables`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${CODA_API_TOKEN}`
        },
    });
    return response.json();
}

export async function getTableData(tableId) {
    const response = await fetch(`${CODA_API_BASE_URL}/docs/${DOC_ID}/tables/${tableId}/rows`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${CODA_API_TOKEN}`
        },
    });
    return response.json();
}

export async function getTableSchema(tableId) {
    const response = await fetch(`${CODA_API_BASE_URL}/docs/${DOC_ID}/tables/${tableId}/columns`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${CODA_API_TOKEN}`
        },
    });
    return response.json();
}
