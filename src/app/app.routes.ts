import { Routes } from '@angular/router';
import { Login } from './login/login';
import { VerifyOtp } from './verify-otp/verify-otp';
import { WorkerDashboard } from './worker-dashboard/worker-dashboard';
import { JobsList } from './jobs-list/jobs-list';
import { WorkerSignUp } from './worker-sign-up/worker-sign-up';
import { FirstSignUp } from './first-sign-up/first-sign-up';
import { Landing } from './landing/landing';
import { EmployerSignUp } from './employer-sign-up/employer-sign-up';
import { EmployerDashboard } from './employer-dashboard/employer-dashboard';
import { JobPostingSteps } from './job-posting-host/job-posting-steps/job-posting-steps';
import { JobSummary } from './job-posting-host/job-summary/job-summary';
import { JobPostingHost } from './job-posting-host/job-posting-host';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'verify-otp',
    component: VerifyOtp,
  },
  {
    path: 'worker-dashboard',
    component: WorkerDashboard,
  },
  // {
  //   path: 'job-posting',
  //   component: JobPosting,
  // },
  {
    path: 'jobs-list',
    component: JobsList,
  },
  {
    path: 'first-sign-up',
    component: FirstSignUp,
  },
  {
    path: 'worker-sign-up',
    component: WorkerSignUp,
  },
  {
    path: 'employer-sign-up',
    component: EmployerSignUp,
  },
  {
    path: 'employer-dashboard',
    component: EmployerDashboard,
  },
  {
    path: 'job-posting',
    component: JobPostingHost,
    children: [
      {
        path: '',
        redirectTo: 'job-posting-steps',
        pathMatch: 'full',
      },
      {
        path: 'job-posting-steps',
        component: JobPostingSteps,
      },
      {
        path: 'job-summary',
        component: JobSummary,
      },
    ],
  },
];
