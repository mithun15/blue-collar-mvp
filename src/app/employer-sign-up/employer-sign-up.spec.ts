import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSignUp } from './employer-sign-up';

describe('EmployerSignUp', () => {
  let component: EmployerSignUp;
  let fixture: ComponentFixture<EmployerSignUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerSignUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerSignUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
