import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

// Load the Excel file
const workbook = XLSX.readFile('./mock-data.xlsx');
// Select the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
// Convert the sheet to JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet);
// Save JSON to a file
writeFileSync('output.json', JSON.stringify(jsonData, null, 2), 'utf-8');

console.log('Excel data has been converted to JSON and saved as output.json');