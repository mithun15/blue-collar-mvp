import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { JobPosting } from '../job-posting';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-summary',
  imports: [FormsModule, CheckboxModule, ButtonModule, DatePipe],
  templateUrl: './job-summary.html',
  styleUrl: './job-summary.scss',
})
export class JobSummary {
  accepted = false;

  private _jobPosting = inject(JobPosting);

  public jobPostingForm = this._jobPosting.jobPostingForm;

  edit(section: string) {
    console.log('Edit clicked for:', section);
  }

  submit() {
    if (!this.accepted) {
      alert('कृपया नियम व शर्तें स्वीकार करें');
      return;
    }
    console.log('Submitted');
  }
}
