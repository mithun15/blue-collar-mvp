import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingHost } from './job-posting-host';

describe('JobPostingHost', () => {
  let component: JobPostingHost;
  let fixture: ComponentFixture<JobPostingHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPostingHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostingHost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
