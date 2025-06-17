import * as readline from 'readline';


//Menu List
const menu: any = {
  "burger": { price: 5 },
  "pizza": { price: 8 },
  "salad": { price: 4 },
  "pasta": { price: 7 },
  "soda": { price: 2 }
}

type Order = {
  item: string;
  quantity: number;
};


//Show Menu
console.log("---------------Menu:--------------");
let index = 1;
for (let item in menu) {
  console.log(`${index}. ${item}: Price:${menu[item].price} TK`);
  index++;
}



//Get input from user
const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


//ask() function question kore Promise return kore
const ask = (question: string): Promise<string> => {
  return new Promise(resolve => readLine.question(question, resolve));
};


//Prepared item
const prepareItem = (item: string, time: number): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${item} is ready`);
    }, time=2000);
  });
};



//async arrow function
const mainProcess = async () => {
  const orders: Order[] = [];

  //Order from user
  const diffItems = parseInt(await ask("How many different items you want to order:"));
  for (let i = 1; i <= diffItems; i++) {
    const item = await ask(`Enter item name: ${i}.`);
    if (!menu[item]) {
      console.log("This item is not present in menu.Please try again!");
      i--;
      continue;
    }

    const quantity: any = await ask(`Your order item ${item} and quantity of ${item}:`);
    if (isNaN(quantity) || quantity < 0) {
      console.log("Invalid quantity.Please try again!");
      i--;
      continue;
    }
    orders.push({ item, quantity });
  }

  readLine.close();


  //Order Process
  console.log("\nYour orders are preparing just wait...");
  for(const order of orders){
    const orderPrice= order.quantity*500;
    const result=await prepareItem(order.item,orderPrice);
    console.log(`${result} and quantity: ${order.quantity}`);
  }


  //Order summary and total amount
  let total=0;
  console.log("\nOrder Summary:");
  for(const order of orders){
    const price= menu[order.item].price;
    const totalItem= price * order.quantity;
    total+=totalItem;
    console.log(`${order.item}: ${price}Tk x${order.quantity} = ${totalItem}Tk`);
  }


  //Discount
  let discount=0;
  if(total>20){
    discount=total*0.1;
    console.log(`You get discount: ${discount}Tk`);
  }
  else{
    console.log("You not get any discount.");
  }


  //Total cost after discount
  let finalAmount=0;
  finalAmount=total-discount;
  console.log(`Total Amount: ${total}Tk`);
  console.log(`Final Amount: ${finalAmount}Tk`);
  console.log(`You will pay: ${finalAmount}Tk`);
  console.log("---------Thank you---------");
}

mainProcess();
