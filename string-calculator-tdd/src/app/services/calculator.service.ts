import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }

    let delimiter = ',';
    let numbersToProcess = numbers;

    if (numbers.startsWith('//')) {
      delimiter = numbers.charAt(2);
      numbersToProcess = numbers.substring(numbers.indexOf('\n') + 1);
    }

    const normalizedInput = numbersToProcess.replace(/\n/g, delimiter);

    const nums = normalizedInput.split(delimiter).map(num => {
      return num ? parseInt(num, 10) : 0;
    });

    const negatives = nums.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(',')}`);
    }

    return nums.reduce((sum, num) => sum + num, 0);
  }
}
