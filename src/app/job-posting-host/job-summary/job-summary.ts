import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { JobPosting } from '../job-posting';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { JobPostingService } from '../../services/job-posting.service';
import { JobPostingModel } from '../../job-posting/job-posting.model';

@Component({
  selector: 'app-job-summary',
  imports: [FormsModule, CheckboxModule, ButtonModule, DatePipe],
  templateUrl: './job-summary.html',
  styleUrl: './job-summary.scss',
})
export class JobSummary {
  accepted = false;

  private _jobPosting = inject(JobPosting);
  private _router = inject(Router);
  private _jobPostingService = inject(JobPostingService);

  public jobPostingForm = this._jobPosting.jobPostingForm;

  edit() {
    this._router.navigate([`/job-posting/job-posting-steps`]);
  }

  submit() {
    if (!this.accepted) {
      alert('कृपया नियम व शर्तें स्वीकार करें');
      return;
    }
    this._jobPostingService.createJobPosting(this.jobPostingForm.value as any).subscribe(() => {
      this._router.navigate(['/employer-dashboard']);
    });
    console.log(this.jobPostingForm);
  }
}
