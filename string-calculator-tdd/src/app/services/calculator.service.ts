import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  constructor() {}

  add(numbers: string): number {
    if (!numbers) {
      return 0;
    }

    let delimiter = ',';
    let numbersToProcess = numbers;

    if (numbers.startsWith('//')) {
      const delimiterMatch = numbers.match(/^\/\/\[(.+)]\n/);
      if (delimiterMatch) {
        delimiter = delimiterMatch[1];
      } else {
        const simpleDelimiterMatch = numbers.match(/^\/\/(.)\n/);
        if (simpleDelimiterMatch) {
          delimiter = simpleDelimiterMatch[1];
        }
      }
      numbersToProcess = numbers.substring(numbers.indexOf('\n') + 1);
    }

    numbersToProcess = numbersToProcess.replace(/\\n(\d+)/g, ',$1');

    const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const splitRegex = new RegExp(`${escapedDelimiter}|\n`);

    const nums = numbersToProcess
      .split(splitRegex)
      .map(num => (num.trim() ? parseInt(num.trim(), 10) : 0));

    const negatives = nums.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed ${negatives.join(',')}`);
    }

    return nums.reduce((sum, num) => sum + num, 0);
  }
}
