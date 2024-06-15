// 1. Declare variables, use variables
// 2. Arithmethic operations = +, -, *, /
// 3. Variable naming rules = camelCasing, reserved keywords
// 4. Data types - numbers, strings
// 5. String concatenation, template literals

const monthlyRent = 100;
const yearlyRent = monthlyRent * 12;

console.log(yearlyRent);


const currentYear = 2028;
const birthYear = 2016;

const currentAge = currentYear - birthYear;
console.log(currentAge);

// Strings - single, double quotes or backticks work just fine!
const myName = "Abdullah"
console.log(myName)
const firstName = 'John'
const lastName = `Paul`

const fullName = firstName + lastName
console.log(fullName)

const welcomeMsg = "welcome to our website, " + firstName
console.log(welcomeMsg)


// "Hello, John Paul. How are you?!"
const sentence = "Hello, " + firstName +" " + lastName + ". How are you?!"
console.log(sentence)

// Template literals
const presidentName = "Bola"
const newSentence = `${presidentName} ${lastName} is my name`
console.log(newSentence)

// "Ths sum of ${a} and ${b} is ${smth smth}" 
// The sum of 10 and 5 is 15
const a = 100
const b = 250
const sum = `The sum of ${a} and ${b} is ${a + b}`
console.log(sum)

// Arithmetic operations
console.log(20 * 2)
console.log(20 / 2)
console.log(20 + 2)
console.log(20 - 2)

// Modulo - Remainder
console.log(5 % 2)
console.log(8 % 2)

// Exponent - Raise to power
console.log(2 ** 3)
console.log(4 ** 4)