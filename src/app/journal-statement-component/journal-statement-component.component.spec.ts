import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalStatementComponent } from './journal-statement-component.component';

describe('JournalStatementComponent', () => {
  let component: JournalStatementComponent;
  let fixture: ComponentFixture<JournalStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalStatementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
