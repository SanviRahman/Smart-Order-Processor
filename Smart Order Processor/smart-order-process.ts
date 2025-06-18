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



//Get input from user using interface
const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


//ask() function question kore Promise return kore,arrow function
const ask = (question: string): Promise<any> => {
  return new Promise(resolve => readLine.question(question, resolve));
};


//Prepared item,arrow function 
const prepareItem = (item: string, price: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${item} is ready`);
    }, 2000)
  })
};



//async arrow annonmous function
const mainProcess = async () => {
  const orders: Order[] = [];


  //Order from user
  let diffItems: number;
  while (true) {
    diffItems = parseInt(await ask("How many different items you want to order:"));
    if (isNaN(diffItems) || diffItems < 1) {
      console.log("Enter valid number. Please try again!");
    }
    else {
      break;
    }
  }

  for (let i = 1; i <= diffItems; i++) {
    const item = await ask(`Enter item name: ${i}.`);
    if (!menu[item]) {
      console.log("This item is not present in menu.Please try again!");
      i--;
      continue;
    }

    const quantity: any = await ask(`Your order item ${item} and quantity of ${item}:`);
    if (isNaN(quantity) || quantity < 1) {
      console.log("Invalid quantity.Please try again!");
      i--;
      continue;
    }
    orders.push({ item, quantity });
  }

  readLine.close();


  //Order Process
  console.log("\nYour orders are preparing just wait...");
  for (const order of orders) {
    const orderPrice = order.quantity * 500;
    const orderItem = await prepareItem(order.item, orderPrice);//Pepared order
    console.log(`${orderItem} and quantity: ${order.quantity}`);
  }


  //Order summary and total amount
  let total = 0;
  console.log("\nOrder Summary:");
  for (const order of orders) {
    const price = menu[order.item].price;//count per item price
    const totalTaka = price * order.quantity;
    total += totalTaka;
    console.log(`${order.item}: ${price} Tk x${order.quantity} = ${totalTaka} Tk`);
  }


  //Discount
  let discount = 0;
  if (total > 20) {
    discount = total * 0.1;
    console.log(`You get discount: 10% => ${discount} tk`);
  }
  else {
    console.log("You not get any discount.");
  }


  //Total cost after discount
  let finalAmount = 0;
  finalAmount = total - discount;
  console.log(`Total Amount: ${total} Tk`);
  console.log(`Final Amount: ${finalAmount} Tk`);
  console.log(`You will pay: ${finalAmount} Tk`);
  console.log("\n---------Thank you---------\n");
}

mainProcess();
