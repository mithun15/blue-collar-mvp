import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobPosting } from './job-posting';

@Component({
  selector: 'app-job-posting-host',
  imports: [RouterOutlet],
  templateUrl: './job-posting-host.html',
  styleUrl: './job-posting-host.scss',
  providers: [JobPosting],
})
export class JobPostingHost {}
