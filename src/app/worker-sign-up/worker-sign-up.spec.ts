import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSignUp } from './worker-sign-up';

describe('WorkerSignUp', () => {
  let component: WorkerSignUp;
  let fixture: ComponentFixture<WorkerSignUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerSignUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerSignUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
