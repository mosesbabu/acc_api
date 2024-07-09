import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance-sheet-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance-sheet-component.component.html',
  styleUrl: './balance-sheet-component.component.css'
})
export class BalanceSheetComponent {
  assets: any[] = [];
  liabilities: any[] = [];
  equity: any[] = [];

  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.fetchBalanceSheetData();
  }
  fetchBalanceSheetData(): void {
    this.apiService.fetchBalanceSheetData().subscribe({
      next: (response) => {
        this.assets = response.assets;
        this.liabilities = response.liability;
        this.equity = response.equity;
        console.log('Balance sheet data:', response);
      },
      error: (error) => {
        console.error('Error fetching balance sheet data:', error);
      }
    });
  }
}
