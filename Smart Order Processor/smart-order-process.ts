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


const prepareItem=(item:string,time:number):Promise<string> =>{
  return new Promise (resolve=> {
    setTimeout(()=>{
      resolve(`${item} is ready!`);
    },time);
  });
};



const main = async()=>{
  const order: Order[]=[];
}


const totalItems= parseInt(await ask ("How many items you want to order?"));

for(let i=0; i<totalItems;i++)
{
  const item=await ask(`Enter item name:${i+1}`);
  if(!menu[item]){
    console.log("This item is not present in menu.Please try again!");
    i--;
    continue;
  }
}