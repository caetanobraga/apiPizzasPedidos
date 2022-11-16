import fs from 'fs';
import { Pizza } from '../types/pizzas.type';

export function readFileJson(fileName: 'orders.json' | 'pizzas.json') {
  const dataInFile = fs.readFileSync(fileName).toString();
  const data = JSON.parse(dataInFile);
  return data;
}