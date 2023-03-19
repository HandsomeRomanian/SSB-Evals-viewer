export interface SheetsModel {
  range: string;
  majorDimension: string;
  values: string[][]; // [row][column]
}
