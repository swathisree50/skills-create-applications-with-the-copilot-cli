#!/usr/bin/env node

// Supported operations: addition, subtraction, multiplication, division

const readline = require('readline');

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

function formatResult(operation, a, b, result) {
  return `Result (${operation}): ${a} ${operation} ${b} = ${result}`;
}

function parseExpression(input) {
  const operatorMap = {
    '+': 'addition',
    '-': 'subtraction',
    '*': 'multiplication',
    'x': 'multiplication',
    '/': 'division'
  };

  const tokens = input.trim().split(/\s+/);

  if (tokens.length !== 3) {
    throw new Error('Please enter an expression in the form: number operator number');
  }

  const [left, operator, right] = tokens;
  const a = Number(left);
  const b = Number(right);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Both operands must be valid numbers');
  }

  const opName = operatorMap[operator];
  if (!opName) {
    throw new Error('Unsupported operator. Use +, -, *, or /');
  }

  return { a, b, operator, opName };
}

function calculate(a, b, opName) {
  switch (opName) {
    case 'addition':
      return add(a, b);
    case 'subtraction':
      return subtract(a, b);
    case 'multiplication':
      return multiply(a, b);
    case 'division':
      return divide(a, b);
    default:
      throw new Error('Unsupported operation');
  }
}

function showUsage() {
  console.log('Node.js CLI Calculator');
  console.log('Supported operations: addition (+), subtraction (-), multiplication (*), division (/)');
  console.log('Examples:');
  console.log('  node src/calculator.js 5 + 3');
  console.log('  node src/calculator.js 10 / 2');
  console.log('Or enter expressions interactively after running the script without arguments.');
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'calc> '
    });

    console.log('Node.js CLI Calculator');
    console.log('Enter expressions like: 2 + 3');
    console.log('Supported operators: +, -, *, /');
    console.log('Type "exit" or "quit" to leave.');
    rl.prompt();

    rl.on('line', (line) => {
      const trimmed = line.trim();
      if (trimmed === '' || trimmed.toLowerCase() === 'exit' || trimmed.toLowerCase() === 'quit') {
        rl.close();
        return;
      }

      try {
        const { a, b, operator, opName } = parseExpression(trimmed);
        const result = calculate(a, b, opName);
        console.log(result);
      } catch (error) {
        console.error('Error:', error.message);
      }

      rl.prompt();
    });

    rl.on('close', () => {
      console.log('Goodbye!');
      process.exit(0);
    });

    return;
  }

  if (args.length !== 3) {
    showUsage();
    process.exit(1);
  }

  try {
    const input = args.join(' ');
    const { a, b, operator, opName } = parseExpression(input);
    const result = calculate(a, b, opName);
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
