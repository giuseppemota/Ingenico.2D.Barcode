import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselSimilaresComponent } from './carrossel-similares.component';

describe('CarrosselSimilaresComponent', () => {
  let component: CarrosselSimilaresComponent;
  let fixture: ComponentFixture<CarrosselSimilaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrosselSimilaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrosselSimilaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
