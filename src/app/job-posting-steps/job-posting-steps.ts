import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';

interface Skill {
  name: string;
  code: string;
}

@Component({
  selector: 'app-job-posting-steps',
  imports: [StepperModule, ButtonModule, SelectModule],
  templateUrl: './job-posting-steps.html',
  styleUrl: './job-posting-steps.scss',
})
export class JobPostingSteps implements OnInit {
  public skills: Skill[] | undefined;

  ngOnInit(): void {
    this.skills = [
      { name: 'Worker', code: 'WOR' },
      { name: 'Helper', code: 'HEL' },
      { name: 'Plumber', code: 'PLU' },
      { name: 'Electrician', code: 'ELE' },
    ];
  }
}
