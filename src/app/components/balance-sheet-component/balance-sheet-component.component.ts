import { Component } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice.service';
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
  isLoading: boolean = false;
  message: string = '';

  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.fetchBalanceSheetData();
  }
  fetchBalanceSheetData(): void {
    this.isLoading = true;
    this.message = 'Fetching balance sheet data...';
    this.apiService.fetchBalanceSheetData().subscribe({
      next: (response) => {
        this.assets = response.assets;
        this.liabilities = response.liability;
        this.equity = response.equity;
        this.isLoading = false;
        this.message = 'Balance sheet data fetched successfully!';
        console.log('Balance sheet data:', response);
      },
      error: (error) => {
        this.isLoading = false;
        this.message = 'Error fetching balance sheet data. Please try again.';
        console.error('Error fetching balance sheet data:', error);
      }
    });
  }
}
