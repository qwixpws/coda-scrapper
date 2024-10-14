import { Teacher } from '../utils/teacher.js';
import { getTableSchema, getTableRows } from './coda.js';

export async function getMonitorDataCols(tableId) {
    console.log(`Start getting table schema for ${tableId}`);
    const tableSchema = await getTableSchema(tableId);

    const tableSchemaEnum = tableSchema.items.map((column) => {
        return {
            id: column.id,
            name: column.name
        };
    });
    return { tableSchemaEnum };
}

export async function getMonitorDataRows(tableId) {
    const tableRows = await getTableRows(tableId);
    return { tableRows };
}

export function calculateHoursPerTeacher(tableRows) {
    let items = tableRows.tableRows.items;
    items.map((row) => {
        Teacher.addLesson(row);
    });
    let result = Teacher.getTeachersStats();
    return result;
}
