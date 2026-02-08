import { Component, Input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { JobPostingModel } from '../job-posting/job-posting.model';
import { DatePipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-job-card',
  imports: [ButtonModule, CardModule, DatePipe, TooltipModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
  @Input() job: JobPostingModel | null = null;

  public delete = output<Event>();
  public edit = output<Event>();

  onEdit(event: Event) {
    this.edit.emit(event);
  }

  onDelete(event: Event) {
    this.delete.emit(event);
  }
}
