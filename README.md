#### 1) What is the difference between var, let, and const?
**Answer:** Difference between var, let and const:

**var:** variables declared with var have global scope, which means they can be accessed outside of the block they are declared in.They also allow redeclaration without error.Also because of hoisting they can be accessed before initialized.

**let:** Variables declared with let are block-scoped, meaning they are only accessible inside the block where they are defined.Variable declared with let can be updated after declaration.They cannot be used before initialization, and redeclaring the same variable name within the same scope will throw an error.

**const:** const is block scoped and cannot be accessed before initialization.The main difference is the value assigned to a const variable cannot be reassigned later.

---

#### 2) What is the difference between map(), forEach(), and filter()?
**Answer:** Difference between map(), forEach(), filter():

**map():** map() is used on array to transform every single array element and returns a brand new array with modified values.It does not changes the original array.

**forEach():** forEach() is used for looping through an array and executing a function on each element.It does not returns a new array, only performs action on each array element.

**filter():** filter() is used to check every array elements against a condition and creates a new array containing only the elements that matches the condition.

---
 
#### 3) What are arrow functions in ES6?
**Answer:** Arrow functions are a new way of writing functions introduced in ES6. They do the same work as normal functions, but with shorter syntax.Arrow functions are widely preferred for their cleaner style and efficiency.

old way:
`function add(a, b) {
  return a + b;
}`

new way:
`const add = (a, b) => a + b;`

---

#### 4) How does destructuring assignment work in ES6?

**Answer:** Destructuring helps to extract values directly from array or object and store them into variables in a simple way. Instead of accessing each property one by one, destructuring unpacks them in a single line, making the code shorter and easier to read

example:
`const { name, age } = { name: "Alex", age: 30 }`

---

#### 5) Explain template literals in ES6. How are they different from string concatenation?

**Answer:** Template leterals in ES6 allow embedding variables and expressions directly inside strings using backticks.This makes the string more readable and avoids the need for joining text with the plus sign.

In contrast, string concatenation is harder to manage, specially when multiple variables and longer strings are involved, since it requires continuous use of quotation marks and operators.

---

