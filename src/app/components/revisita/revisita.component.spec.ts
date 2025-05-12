import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisitaComponent } from './revisita.component';

describe('RevisitaComponent', () => {
  let component: RevisitaComponent;
  let fixture: ComponentFixture<RevisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
