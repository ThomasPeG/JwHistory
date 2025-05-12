import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeMesComponent } from './informe-mes.component';

describe('InformeMesComponent', () => {
  let component: InformeMesComponent;
  let fixture: ComponentFixture<InformeMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeMesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformeMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
