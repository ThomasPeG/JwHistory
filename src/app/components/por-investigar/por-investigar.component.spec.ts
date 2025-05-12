import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorInvestigarComponent } from './por-investigar.component';

describe('PorInvestigarComponent', () => {
  let component: PorInvestigarComponent;
  let fixture: ComponentFixture<PorInvestigarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorInvestigarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PorInvestigarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
