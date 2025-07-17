/*
    JavaScript Fundamentals Practice

    1. Declare a variable using var, let, and const.
*/

// Your code here

// Correct way: Use different variable names for var, let, and const
var amountVar = 1; // Correct
let amountLet = 2; // Correct
const amountConst = 3; // Correct

/*
    2. Assign a string, number, and boolean value to variables.
*/

// Your code here

let amount = 3; // Correct
let name = "moazzam"; // Correct
let isintersecting = false; // Correct
let fraction = 3.45; // Correct

/*
    3. Create an array and access its elements.
*/

// Your code here

let array = [1, 3, 4, 5];
console.log(array[1]); // Correct, prints 3

/*
    4. Create an object and access its properties.
*/

// Your code here
const object = {
    properties: null,
    amount: 1,
    transaction: false
}
object.amount = 5;
console.log(object.amount)
/*
    5. Write an if-else statement to check a condition.
*/

// Your code here
 if (object.amount == 5)
 {
    console.log('Great Job')
 }
 else 
 {
    console.log('Bye Bye')
 }
/*
    6. Write a for loop that prints numbers 1 to 5.
*/

// Your code here
for(let i = 1; i <= 5; i++) // Correct: prints numbers 1 to 5
{
    console.log('Counting ' + i);
}

/*
    7. Write a while loop that prints numbers 5 to 1.
*/

// Your code here
let count = 5; // Correct: start from 5
while(count >= 1)
{
    console.log(count);
    count--;
}
/*
    8. Write a function that takes two numbers and returns their sum.
*/

// Your code here
function sum(num1, num2)
{
    return num1 + num2
} // Correct

/*
    9. Use arrow function syntax to create a function that multiplies two numbers.
*/

// Your code here
let multiply = (num1, num2 ) => num1 * num2; // Correct

/*
    10. Demonstrate how to use template literals to print a message with variables.
*/

// Your code here
let uniqueName = "Usman"

console.log(`My Name is $(Usman)`)
/*
    11. Use array methods: push, pop, map, and filter.
*/

// Your code here
let newArray =  ["Moazzam" , "Wali" , "Anas", "khawar", "Usman"]

newArray.pop()
newArray.push("Nigga")
newArray.shift()
newArray.unshift("Haziq")
newArray.copyWithin(5,0,1)
newArray.splice(3,0,"Zeeshan","Zohaib")




/*
    12. Use destructuring to extract values from an array and an object.
*/

// Your code here
const person =
{
    amount: 500,
    name: 'Usman'
}

const [totalamount , personName]= person

console.log(totalamount)
console.log(personName)
/*
    13. Use the spread operator to combine two arrays.
*/

// Your code here



/*
    14. Write a switch statement for different values of a variable.
*/

// Your code here
switch(amount)
{
    case 5000:
        console.log("that is huggge amount")
        break;
    default:
        console.log("you are Ghareeb")
}

/*
    15. Handle errors using try-catch.
*/

// Your code here
try 
{
    addlert('this is a new alert')
}
catch(err)
{
    console.log(err.message);
}



// Objects 

const bankaccount = {
    amount: 5000,
    nameRegistered: 'Usman',
    transaction: function(amountDeposit)
    {
        this.amount += amountDeposit
        return "amount has been deposited" 
    }
}

const usmanAccount = bankaccount.transaction(60000)
console.log(usmanAccount.amount)




