/* 
  DEBUGGING EXERCISE - CORRECTED SOLUTIONS
  Insurance Customer Analytics - Find the Bug
  
  This file shows the CORRECTED code for all 10 bugs
*/

// Given Data
const customers = [
    { id: 1, name: "Ravi", age: 32, policy: "Health", premium: 4800, active: true },
    { id: 2, name: "Anita", age: 51, policy: "Life", premium: 12000, active: true },
    { id: 3, name: "Kiran", age: 28, policy: "Vehicle", premium: 3500, active: false },
    { id: 4, name: "Meena", age: 45, policy: "Health", premium: 6000, active: true },
    { id: 5, name: "Suresh", age: 60, policy: "Life", premium: 18000, active: false }
];

console.log("=== CORRECTED SOLUTIONS ===\n");

// ===============================================
// BUG 1 FIXED: Loop Output Issue
// ===============================================
console.log("BUG 1 FIXED: Loop Output Issue");
console.log("✓ FIXED: Change i <= to i <");

// CORRECTED CODE
for (let i = 0; i < customers.length; i++) {  // Changed <= to <
    console.log(customers[i].name);
}

console.log("\n");

// ===============================================
// BUG 2 FIXED: filter() Not Working
// ===============================================
console.log("BUG 2 FIXED: filter() Not Working");
console.log("✓ FIXED: Add return statement in arrow function");

// CORRECTED CODE
const activeCustomers = customers.filter((c) => {
    return c.active === true;  // Added return
});

console.log("Active customers: " + activeCustomers.length);
console.log("\n");

// ===============================================
// BUG 3 FIXED: Premium Increase Logic Broken
// ===============================================
console.log("BUG 3 FIXED: Premium Increase Logic Broken");
console.log("✓ FIXED: Use spread operator for immutability and return new object");

// CORRECTED CODE
const updatedPremiums = customers.map((c) => {
    if (c.age >= 50) {
        return { ...c, premium: c.premium * 1.1 };  // Return new object with spread
    }
    return c;
});

console.log("Updated premiums: ", updatedPremiums[1].premium);
console.log("\n");

// ===============================================
// BUG 4 FIXED: Wrong Total Premium Calculation
// ===============================================
console.log("BUG 4 FIXED: Wrong Total Premium Calculation");
console.log("✓ FIXED: Add return statement in reduce");

// CORRECTED CODE
const totalPremium = customers.reduce((total, c) => {
    return total + c.premium;  // Added return
}, 0);

console.log("Total premium: ₹" + totalPremium);
console.log("\n");

// ===============================================
// BUG 5 FIXED: Template Literal Not Printing
// ===============================================
console.log("BUG 5 FIXED: Template Literal Not Printing");
console.log("✓ FIXED: Use backticks (`) instead of quotes (\")");

// CORRECTED CODE
console.log(`Customer ${customers[0].name} has policy ${customers[0].policy}`);  // Use backticks

console.log("\n");

// ===============================================
// BUG 6 FIXED: Policy Count Incorrect
// ===============================================
console.log("BUG 6 FIXED: Policy Count Incorrect");
console.log("✓ FIXED: Use dynamic object key count[c.policy]");

// CORRECTED CODE
const policyCount = customers.reduce((count, c) => {
    count[c.policy] = (count[c.policy] || 0) + 1;  // Changed count.policy to count[c.policy]
    return count;
}, {});

console.log("Policy count: ", policyCount);
console.log("\n");

// ===============================================
// BUG 7 FIXED: Risk Level Always Undefined
// ===============================================
console.log("BUG 7 FIXED: Risk Level Always Undefined");
console.log("✓ FIXED: Use else if to fix condition chaining");

// CORRECTED CODE
const customersWithRisk = customers.map((c) => {
    let riskLevel;
    if (c.age < 35) riskLevel = "Low";
    else if (c.age <= 50) riskLevel = "Medium";  // Changed 'if' to 'else if'
    else riskLevel = "High";
    return { ...c, riskLevel };
});

console.log("Risk levels: ", customersWithRisk.map(c => ({ name: c.name, risk: c.riskLevel })));
console.log("\n");

// ===============================================
// BUG 8 FIXED: Active vs Inactive Count Wrong
// ===============================================
console.log("BUG 8 FIXED: Active vs Inactive Count Wrong");
console.log("✓ FIXED: Use for...of instead of for...in");

// CORRECTED CODE
let active = 0,
    inactive = 0;

for (const c of customers) {  // Changed 'for...in' to 'for...of'
    if (c.active) active++;
    else inactive++;
}

console.log("Active: " + active + ", Inactive: " + inactive);
console.log("\n");

// ===============================================
// BUG 9 FIXED: Arrow Function Syntax Error
// ===============================================
console.log("BUG 9 FIXED: Arrow Function Syntax Error");
console.log("✓ FIXED: Return the result of chained methods");

// CORRECTED CODE
const getLifeCustomers = () =>
    customers.filter((c) => c.policy === "Life").map((c) => c.name);  // Must return the chain

console.log("Life customers: ", getLifeCustomers());
console.log("\n");

// ===============================================
// BUG 10 FIXED: Sorting Mutates Original Array
// ===============================================
console.log("BUG 10 FIXED: Sorting Mutates Original Array");
console.log("✓ FIXED: Use spread operator [...customers] to create a copy");

// CORRECTED CODE
const sortedCustomers = [...customers].sort((a, b) => b.premium - a.premium);  // Use spread operator

console.log("Original first customer: " + customers[0].name);
console.log("Sorted first customer: " + sortedCustomers[0].name);
console.log("\n");

console.log("=== ALL BUGS FIXED! ===");
