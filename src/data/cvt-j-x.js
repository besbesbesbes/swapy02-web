import XLSX from 'xlsx';
import { data_dummy } from './testData.js';

function jsonToExcel(jsonData) {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data_temp.xlsx');
}

const data = data_dummy.assets;
jsonToExcel(data);