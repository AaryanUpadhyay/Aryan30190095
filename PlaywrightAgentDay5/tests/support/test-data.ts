import path from 'path';

const XLSX = require('xlsx') as {
  readFile(filePath: string): { Sheets: Record<string, unknown> };
  utils: { sheet_to_json<T>(sheet: unknown): T[] };
};

export type Credential = { Username: string; Password: string };
export type CheckoutData = {
  Case: string;
  FirstName: string;
  LastName: string;
  PostalCode: string;
  ExpectedError: string;
};
export type SortCase = { Case: string; Value: 'az' | 'za' | 'lohi' | 'hilo'; Direction: 'ascending' | 'descending' };

const workbookPath = path.resolve(__dirname, '../../testdata/testdata.xlsx');
const workbook = XLSX.readFile(workbookPath);

function rows<T>(sheetName: string, fallback: T[] = []): T[] {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return fallback;
  return XLSX.utils.sheet_to_json<T>(sheet);
}

const credentials = rows<Credential>('Credentials');
const checkoutData = rows<CheckoutData>('CheckoutData', [
  { Case: 'valid-order', FirstName: 'Jane', LastName: 'Tester', PostalCode: '560001', ExpectedError: '' },
  { Case: 'missing-first-name', FirstName: '', LastName: 'Tester', PostalCode: '560001', ExpectedError: 'Error: First Name is required' },
  { Case: 'missing-last-name', FirstName: 'Jane', LastName: '', PostalCode: '560001', ExpectedError: 'Error: Last Name is required' },
  { Case: 'missing-postal-code', FirstName: 'Jane', LastName: 'Tester', PostalCode: '', ExpectedError: 'Error: Postal Code is required' },
  { Case: 'missing-all', FirstName: '', LastName: '', PostalCode: '', ExpectedError: 'Error: First Name is required' },
]);
const sortCases = rows<SortCase>('SortOptions', [
  { Case: 'name-ascending', Value: 'az', Direction: 'ascending' },
  { Case: 'name-descending', Value: 'za', Direction: 'descending' },
  { Case: 'price-low-high', Value: 'lohi', Direction: 'ascending' },
  { Case: 'price-high-low', Value: 'hilo', Direction: 'descending' },
]);

export function getCredential(username: string): Credential {
  const credential = credentials.find((row) => row.Username === username);
  if (!credential) throw new Error(`No credential row found for ${username} in ${workbookPath}`);
  return credential;
}

export function getCheckoutData(caseName: string): CheckoutData {
  const data = checkoutData.find((row) => row.Case === caseName);
  if (!data) throw new Error(`No checkout row found for ${caseName} in ${workbookPath}`);
  return data;
}

export function getSortCases(): SortCase[] {
  return sortCases;
}
