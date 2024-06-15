// Number 1
let number =Number(prompt("Enter a number"))
let sum = 0
for(let i = 1; i<= number; i++) {
  sum += i;
}
console.log (sum)


// Number 2

// Number 3
let Firstnumber =Number(prompt("enter first number"))
let Secondnumber =Number(prompt("enter second number"))
let product = 1
for(let i = Firstnumber; i<= Secondnumber; i++ ) {
  product*=i;
}
console.log(product)



// Number 4
const score= Number(prompt("score"))
if (score >= 90 && score<=100 ) {
  console.log ("Grade:A")
} else if (score >= 80 && score<90) {
  console.log ("B")
} else if (score >=70 && score<80) {
  console.log ("C")
} else if (score >=60 && score<70) {
  console.log ("D")
} else if (score <60) {
  console.log ("F")
}