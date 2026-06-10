const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  parseExpression
} = require('../calculator');

describe('Calculator operations', () => {
  test('addition returns the sum of two numbers', () => {
    expect(add(7, 5)).toBe(12);
  });

  test('subtraction returns the difference between two numbers', () => {
    expect(subtract(10, 3)).toBe(7);
  });

  test('multiplication returns the product of two numbers', () => {
    expect(multiply(4, 6)).toBe(24);
  });

  test('division returns the quotient of two numbers', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws an error', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });

  test('modulo returns the remainder of division', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('modulo by zero throws an error', () => {
    expect(() => modulo(10, 0)).toThrow('Cannot modulo by zero');
  });

  test('power returns base raised to exponent', () => {
    expect(power(2, 8)).toBe(256);
  });

  test('squareRoot returns the square root of a positive number', () => {
    expect(squareRoot(49)).toBe(7);
  });

  test('squareRoot of negative number throws an error', () => {
    expect(() => squareRoot(-4)).toThrow('Cannot take square root of a negative number');
  });
});

describe('Calculator parser', () => {
  test('parses addition expressions', () => {
    expect(parseExpression('2 + 3')).toEqual({ a: 2, b: 3, operator: '+', opName: 'addition' });
  });

  test('parses power expressions with ^', () => {
    expect(parseExpression('2 ^ 5')).toEqual({ a: 2, b: 5, operator: '^', opName: 'power' });
  });

  test('parses square root expressions', () => {
    expect(parseExpression('sqrt 16')).toEqual({ a: 16, b: null, operator: 'sqrt', opName: 'squareRoot' });
  });
});
