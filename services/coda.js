import fetch from 'node-fetch';
//import { CODA_API_BASE_URL, DOC_ID } from '../utils/config.js';
import conf from '../utils/config.js';
const { CODA_API_BASE_URL, DOC_ID, CODA_API_TOKEN } = conf;

export async function getDataFromCoda() {
    //const response = await fetch(`${CODA_API_BASE_URL}/docs/${DOC_ID}/tables/${TABLE_ID}/rows`, {
    const response = await fetch(`${CODA_API_BASE_URL}/docs/${DOC_ID}/tables`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${CODA_API_TOKEN}`
        },
        //params: { 'isOwner': True, //'query': 'New' }
    });
    return response.json();
}
