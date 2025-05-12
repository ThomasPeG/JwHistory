import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeraVisitaComponent } from './primera-visita.component';

describe('PrimeraVisitaComponent', () => {
  let component: PrimeraVisitaComponent;
  let fixture: ComponentFixture<PrimeraVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeraVisitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimeraVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
