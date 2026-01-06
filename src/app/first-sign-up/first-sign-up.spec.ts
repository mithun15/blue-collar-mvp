import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSignUp } from './first-sign-up';

describe('FirstSignUp', () => {
  let component: FirstSignUp;
  let fixture: ComponentFixture<FirstSignUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstSignUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstSignUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
