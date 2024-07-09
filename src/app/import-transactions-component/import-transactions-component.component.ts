import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-import-transactions-component',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './import-transactions-component.component.html',
  styleUrl: './import-transactions-component.component.css'
})
export class ImportTransactionsComponent {
  journalDate: Date = new Date();
  transactions: any[] = [];

  constructor(private apiService: ApiserviceService) { }

  importTransactions(): void {
    this.apiService.importTransactions(this.transactions).subscribe({
      next: (response) => {
        console.log('Transactions imported successfully:', response);
      },
      error: (error) => {
        console.error('Error importing transactions:', error);
      }
    });
  }

}
