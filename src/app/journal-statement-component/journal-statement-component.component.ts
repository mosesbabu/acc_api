import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-journal-statement-component',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './journal-statement-component.component.html',
  styleUrl: './journal-statement-component.component.css'
})
export class JournalStatementComponent {

  statementData: any[] = [];
  from = '2022-01-01';
  to = '2025-01-01';

  constructor(private apiService: ApiserviceService) { }
  
  fetchJournalStatement(): void {
    this.apiService.fetchJournalStatement(this.from, this.to).subscribe({
      next: (response) => {
        this.statementData = response;
        console.log('Journal statement data:', this.statementData);
      },
      error: (error) => {
        console.error('Error fetching journal statement:', error);
      }
    });
  }
}
