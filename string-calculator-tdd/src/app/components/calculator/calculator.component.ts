import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  inputString = '';
  result: number | null = null;
  errorMessage = '';

  constructor(private calculatorService: CalculatorService) { }

  calculateSum() {
    try {
      this.result = this.calculatorService.add(this.inputString);
      this.errorMessage = '';
    } catch (error) {
      this.result = null;
      this.errorMessage = error instanceof Error ? error.message : 'Unknown error';
    }
  }

}
