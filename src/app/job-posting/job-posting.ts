import { Component, inject, OnInit } from '@angular/core';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobPostingService } from '../services/job-posting.service';
import { JobPostingModel } from './job-posting.model';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-job-posting',
  imports: [
    CardModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    DividerModule,
    DatePickerModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './job-posting.html',
  styleUrl: './job-posting.scss',
})
export class JobPosting implements OnInit {
  public cities: City[] | undefined;
  public jobPostingForm = new FormGroup({
    title: new FormControl(''),
    numberOfWorkers: new FormControl(1),
    skillRequired: new FormControl(''),
    companyName: new FormControl(''),
    location: new FormControl(''),
    description: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  private _jobPostingService = inject(JobPostingService);

  ngOnInit(): void {
    this.cities = [
      { name: 'Worker', code: 'WOR' },
      { name: 'Helper', code: 'HEL' },
      { name: 'Plumber', code: 'PLU' },
      { name: 'Electrician', code: 'ELE' },
    ];
  }

  onSubmit() {
    this._jobPostingService
      .createJobPosting(this.jobPostingForm.value as JobPostingModel)
      .subscribe();
    console.log(this.jobPostingForm);
  }
}
