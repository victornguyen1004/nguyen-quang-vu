// Solution 1: Using the iterative approach
// Pros: Easy to write & understand
// Cons: Inefficient for very large values of n, as it requires looping through all numbers from 1 to n
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Solution 2: Using the formula-based approach
// Pros: Efficent for any value of n
// Cons: Only works for non-negative values of n
var sum_to_n_b = function (n) {
  if (n >= 0) {
    return (n * (n + 1)) / 2;
  }
  return 0;
};

// Solution 3: Using the recursive approach
// Pros: Recursion can be easier to conceptualize by developer
// Cons: Inefficient for very large values of n, as it makes multiple recursion calls
var sum_to_n_c = function (n) {
  if (n <= 1) {
    return n;
  } else {
    return sum_to_n_c(n - 1);
  }
};
