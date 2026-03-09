import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Router } from '@angular/router';
import { JobPosting } from '../job-posting';
import { TranslateModule } from '@ngx-translate/core';

interface Skill {
  name: string;
  code: string;
}

@Component({
  selector: 'app-job-posting-steps',
  imports: [
    StepperModule,
    ButtonModule,
    SelectModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    SelectButtonModule,
    InputTextModule,
    TextareaModule,
    TranslateModule,
  ],
  templateUrl: './job-posting-steps.html',
  styleUrl: './job-posting-steps.scss',
})
export class JobPostingSteps implements OnInit {
  public skills: Skill[] | undefined;
  public selectedPeople: any;
  public selectedTime: any;
  peopleOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: 'MORE_THAN_10', value: '10+' },
  ];

  timeOptions = [
    { label: 'TODAY', value: 'today' },
    { label: 'TOMORROW', value: 'tomorrow' },
    { label: 'DAY_AFTER_TOMORROW', value: 'dayaftertomorrow' },
  ];

  fromTime = { hour: 9, minute: 0, period: 'सुबह' };
  toTime = { hour: 6, minute: 0, period: 'शाम' };

  periods = [
    { label: 'MORNING', value: 'morning' },
    { label: 'AFTERNOON', value: 'afternoon' },
    { label: 'EVENING', value: 'evening' },
    { label: 'NIGHT', value: 'night' },
  ];

  cities = [
    { label: 'DELHI', value: 'Delhi' },
    { label: 'MUMBAI', value: 'Mumbai' },
    { label: 'BENGALURU', value: 'Bengaluru' },
    { label: 'PUNE', value: 'Pune' },
  ];

  private _router = inject(Router);
  private _jobPosting = inject(JobPosting);

  public jobPostingForm = this._jobPosting.jobPostingForm;

  ngOnInit(): void {
    this.skills = [
      { name: 'मजदूर', code: 'WOR' },
      { name: 'सहायक', code: 'HEL' },
      { name: 'प्लम्बर', code: 'PLU' },
      { name: 'इलेक्ट्रीशियन', code: 'ELE' },
    ];
  }

  confirm() {
    // Handle confirmation logic here
    this._router.navigate(['/job-posting/job-summary']);
  }

  peopleSelected(n: any) {
    this.selectedPeople = n.value;
    this.jobPostingForm.patchValue({
      noOfPeople: n.value,
    });
  }

  print() {
    console.log(this.jobPostingForm.value);
  }
}
