#!/usr/bin/env node

// Supported operations: addition, subtraction, multiplication, division, modulo, exponentiation, square root

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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot take square root of a negative number');
  }
  return Math.sqrt(n);
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
    '/': 'division',
    '%': 'modulo',
    '^': 'power',
    '**': 'power'
  };

  const tokens = input.trim().split(/\s+/);

  if (tokens.length === 2 && ['sqrt', '√'].includes(tokens[0].toLowerCase())) {
    const value = Number(tokens[1]);
    if (Number.isNaN(value)) {
      throw new Error('The operand must be a valid number');
    }
    return { a: value, b: null, operator: tokens[0], opName: 'squareRoot' };
  }

  if (tokens.length !== 3) {
    throw new Error('Please enter an expression in the form: number operator number or use "sqrt <number>"');
  }

  const [left, operator, right] = tokens;
  const a = Number(left);
  const b = Number(right);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Both operands must be valid numbers');
  }

  const opName = operatorMap[operator];
  if (!opName) {
    throw new Error('Unsupported operator. Use +, -, *, /, %, ^, or ** for power');
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
    case 'modulo':
      return modulo(a, b);
    case 'power':
      return power(a, b);
    case 'squareRoot':
      return squareRoot(a);
    default:
      throw new Error('Unsupported operation');
  }
}

function showUsage() {
  console.log('Node.js CLI Calculator');
  console.log('Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), exponentiation (^ or **), square root (sqrt <number>)');
  console.log('Examples:');
  console.log('  node src/calculator.js 5 + 3');
  console.log('  node src/calculator.js 10 / 2');
  console.log('  node src/calculator.js 10 % 3');
  console.log('  node src/calculator.js 2 ^ 8');
  console.log('  node src/calculator.js sqrt 9');
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
    console.log('Enter expressions like: 2 + 3 or sqrt 9');
    console.log('Supported operators: +, -, *, /, %, ^, **, sqrt');
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

if (require.main === module) {
  main();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  parseExpression,
  calculate
};
