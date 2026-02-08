import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSummary } from './job-summary';

describe('JobSummary', () => {
  let component: JobSummary;
  let fixture: ComponentFixture<JobSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
