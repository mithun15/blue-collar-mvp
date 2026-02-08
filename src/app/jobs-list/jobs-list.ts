import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { JobPostingService } from '../services/job-posting.service';
import { JobPostingModel } from '../job-posting/job-posting.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-jobs-list',
  imports: [CardModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.scss',
  providers: [ConfirmationService, MessageService],
})
export class JobsList implements OnInit {
  public jobs = signal<any[]>([]);
  private _jobsPostingService = inject(JobPostingService);

  private _confirmationService = inject(ConfirmationService);
  private _messageService = inject(MessageService);

  ngOnInit(): void {
    this._jobsPostingService.getAllJobPostings().subscribe((res: any) => {
      this.jobs.set(res.data);
      console.log(this.jobs());
    });
  }

  public confirm1(event: Event) {
    console.log(event);
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Job Description placeholder!!!?',
      header: 'Job Details',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Close',
        severity: 'secondary',
      },
      acceptButtonProps: {
        label: 'Apply',
        severity: 'info',
      },
      accept: () => {
        this._messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
