import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingSteps } from './job-posting-steps';

describe('JobPostingSteps', () => {
  let component: JobPostingSteps;
  let fixture: ComponentFixture<JobPostingSteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPostingSteps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostingSteps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
