import * as readline from 'readline';
 
const menu:any={
  "burger": { price: 5 },
  "pizza":  { price: 8 },
  "salad":  { price: 4 },
  "pasta":  { price: 7 },
  "soda":   { price: 2 }
}

type Order={
    item:string;
    quantity:number;
}


console.log("Menu:");
let index=1;
for(let item in menu)
{
    console.log(`${index}. ${item}: Price:${menu[item].price}`);
    index++;
}

const readLine= readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const promise= (question:string):Promise<string>=>{
  return new Promise (resolve => readLine.question(question,resolve));
};

