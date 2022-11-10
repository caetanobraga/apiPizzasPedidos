import fs from 'fs'

export function getSolicitationsInFile() {
  const solicitationsInFile = fs.readFileSync('orders.json').toString();
  const orders = JSON.parse(solicitationsInFile);

  return orders;
}