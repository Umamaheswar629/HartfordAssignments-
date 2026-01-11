/* 
  DEBUGGING EXERCISE - Insurance Customer Analytics - Find the Bug
  
  Instructions:
  - Each snippet contains at least one bug
  - Identify what is wrong
  - Fix ONLY the bug (do not rewrite completely)
  - Test your fixes with the given customer data
*/

// Given Data (Do NOT Change)
const customers = [
    { id: 1, name: "Ravi", age: 32, policy: "Health", premium: 4800, active: true },
    { id: 2, name: "Anita", age: 51, policy: "Life", premium: 12000, active: true },
    { id: 3, name: "Kiran", age: 28, policy: "Vehicle", premium: 3500, active: false },
    { id: 4, name: "Meena", age: 45, policy: "Health", premium: 6000, active: true },
    { id: 5, name: "Suresh", age: 60, policy: "Life", premium: 18000, active: false }
];

console.log("=== DEBUGGING EXERCISE ===\n");

// ===============================================
// BUG 1: Loop Output Issue
// ===============================================
console.log("BUG 1: Loop Output Issue");
console.log("Expected: Ravi, Anita, Kiran, Meena, Suresh");
console.log("Actual: ");

// BUGGY CODE - Find the issue
for (let i = 0; i <= customers.length; i++) {
    console.log(customers[i].name);
}

console.log("\n");

// ===============================================
// BUG 2: filter() Not Working
// ===============================================
console.log("BUG 2: filter() Not Working");
console.log("Expected: 3 active customers (Ravi, Anita, Meena)");

// BUGGY CODE - Find the issue
const activeCustomers = customers.filter((c) => {
    c.active === true;
});

console.log("Actual: " + activeCustomers.length + " customers");
console.log("\n");

// ===============================================
// BUG 3: Premium Increase Logic Broken
// ===============================================
console.log("BUG 3: Premium Increase Logic Broken");
console.log("Expected: Increase premium by 10% for customers age >= 50");

// BUGGY CODE - Find the issue
const updatedPremiums = customers.map((c) => {
    if (c.age >= 50) {
        c.premium = c.premium * 1.1;
    }
});

console.log("Actual: " + updatedPremiums);
console.log("\n");

// ===============================================
// BUG 4: Wrong Total Premium Calculation
// ===============================================
console.log("BUG 4: Wrong Total Premium Calculation");
console.log("Expected: Total premium of all customers");

// BUGGY CODE - Find the issue
const totalPremium = customers.reduce((total, c) => {
    total + c.premium;
}, 0);

console.log("Actual: " + totalPremium);
console.log("\n");

// ===============================================
// BUG 5: Template Literal Not Printing
// ===============================================
console.log("BUG 5: Template Literal Not Printing");
console.log("Expected: Customer Ravi has policy Health");

// BUGGY CODE - Find the issue
console.log("Customer " + {customers[0].name} + " has policy " + {customers[0].policy});

console.log("\n");

// ===============================================
// BUG 6: Policy Count Incorrect
// ===============================================
console.log("BUG 6: Policy Count Incorrect");
console.log("Expected: Count of each policy type");

// BUGGY CODE - Find the issue
const policyCount = customers.reduce((count, c) => {
    count.policy = (count.policy || 0) + 1;
    return count;
}, {});

console.log("Actual: ", policyCount);
console.log("\n");

// ===============================================
// BUG 7: Risk Level Always Undefined
// ===============================================
console.log("BUG 7: Risk Level Always Undefined");
console.log("Expected: Low risk if age < 35, Medium if 35-50, High if > 50");

// BUGGY CODE - Find the issue
const customersWithRisk = customers.map((c) => {
    let riskLevel;
    if (c.age < 35) riskLevel = "Low";
    if (c.age <= 50) riskLevel = "Medium";
    else riskLevel = "High";
    return { ...c, riskLevel };
});

console.log("Actual: ", customersWithRisk[0]);
console.log("\n");

// ===============================================
// BUG 8: Active vs Inactive Count Wrong
// ===============================================
console.log("BUG 8: Active vs Inactive Count Wrong");
console.log("Expected: Count active and inactive customers");

// BUGGY CODE - Find the issue
let active = 0,
    inactive = 0;

for (let c in customers) {
    if (c.active) active++;
    else inactive++;
}

console.log("Actual - Active: " + active + ", Inactive: " + inactive);
console.log("\n");

// ===============================================
// BUG 9: Arrow Function Syntax Error
// ===============================================
console.log("BUG 9: Arrow Function Syntax Error");
console.log("Expected: Get all Life Insurance customers");

// BUGGY CODE - Find the issue
const getLifeCustomers = () =>
    customers.filter((c) => c.policy === "Life").map((c) =>
    c.name);

console.log("Actual: ", getLifeCustomers());
console.log("\n");

// ===============================================
// BUG 10: Sorting Mutates Original Array
// ===============================================
console.log("BUG 10: Sorting Mutates Original Array");
console.log("Expected: Sort by premium WITHOUT changing original array");

// BUGGY CODE - Find the issue
const sortedCustomers = customers.sort((a, b) => b.premium - a.premium);

console.log("First customer after sorting: ", customers[0].name);
console.log("Expected first: Ravi (original should not change)");
