import fs from 'fs'


export function getPizzasInfile(){
  const pizzasInFile = fs.readFileSync('pizzas.json').toString();
  const pizzas = JSON.parse(pizzasInFile);

  return pizzas;
}