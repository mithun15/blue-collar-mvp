import { TestBed } from '@angular/core/testing';

import { JobPosting } from './job-posting';

describe('JobPosting', () => {
  let service: JobPosting;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPosting);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
