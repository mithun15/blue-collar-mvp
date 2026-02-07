import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';

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
  ],
  templateUrl: './job-posting-steps.html',
  styleUrl: './job-posting-steps.scss',
})
export class JobPostingSteps implements OnInit {
  public skills: Skill[] | undefined;
  public selectedPeople: any;
  public selectedTime: any;
  public date: any;
  public wage: any;
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
    { label: '10 से ज्यादा', value: '10+' },
  ];

  timeOptions = [
    { label: 'आज', value: 'today' },
    { label: 'कल', value: 'tomorrow' },
    { label: 'पारसो', value: 'dayaftertomorrow' },
  ];

  fromTime = { hour: 9, minute: 0, period: 'सुबह' };
  toTime = { hour: 6, minute: 0, period: 'शाम' };

  periods = [
    { label: 'सुबह', value: 'सुबह' },
    { label: 'दोपहर', value: 'दोपहर' },
    { label: 'शाम', value: 'शाम' },
    { label: 'रात', value: 'रात' },
  ];

  form = {
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: null,
  };

  cities = [
    { label: 'दिल्ली', value: 'Delhi' },
    { label: 'मुंबई', value: 'Mumbai' },
    { label: 'बेंगलुरु', value: 'Bengaluru' },
    { label: 'पुणे', value: 'Pune' },
  ];

  ngOnInit(): void {
    this.skills = [
      { name: 'Worker', code: 'WOR' },
      { name: 'Helper', code: 'HEL' },
      { name: 'Plumber', code: 'PLU' },
      { name: 'Electrician', code: 'ELE' },
    ];
  }
}
