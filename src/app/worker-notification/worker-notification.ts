import { Component, OnInit, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export interface Worker {
  id: string;
  name: string;
  phone: string;
  skills: string[];
  rating: number;
  isAvailable: boolean;
  preferredLanguage?: string;
}

export interface NotificationPayload {
  jobPostId: string;
  selectedWorkerIds: string[];
  messageType: 'all-eligible' | 'selected';
  message?: string;
}

@Component({
  selector: 'app-worker-notification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    TableModule,
    ToastModule,
  ],
  templateUrl: './worker-notification.html',
  styleUrl: './worker-notification.scss',
  providers: [MessageService],
})
export class WorkerNotification implements OnInit {
  @Input() jobPostId: string = '';
  @Input() requiredSkills: string[] = [];
  @Input() numberOfWorkers: number = 1;
  @Output() notificationSent = new EventEmitter<NotificationPayload>();
  @Output() cancelled = new EventEmitter<void>();

  // Signals
  notificationMode = signal<'all' | 'search'>('all');
  eligibleWorkers = signal<Worker[]>([]);
  filteredWorkers = signal<Worker[]>([]);
  selectedWorkers = signal<Set<string>>(new Set());
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(false);
  messageTemplate = signal<string>('');
  customMessage = signal<string>('');

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadEligibleWorkers();
  }

  /**
   * Load workers who meet the skill criteria and are available
   */
  loadEligibleWorkers(): void {
    this.isLoading.set(true);
    // TODO: Replace with actual API call to fetch eligible workers
    // For now, using mock data
    const mockWorkers: Worker[] = [
      {
        id: 'w1',
        name: 'गोकुल पंडित',
        phone: '+91-9876543210',
        skills: ['painting', 'construction'],
        rating: 4.5,
        isAvailable: true,
        preferredLanguage: 'hi',
      },
      {
        id: 'w2',
        name: 'गब्बर सिंह',
        phone: '+91-9876543211',
        skills: ['construction', 'excavation'],
        rating: 4.2,
        isAvailable: true,
        preferredLanguage: 'hi',
      },
      {
        id: 'w3',
        name: 'लोटिया पठान',
        phone: '+91-9876543212',
        skills: ['painting'],
        rating: 4.8,
        isAvailable: true,
        preferredLanguage: 'hi',
      },
      {
        id: 'w4',
        name: 'कांचा चीना',
        phone: '+91-9876543213',
        skills: ['construction'],
        rating: 3.9,
        isAvailable: true,
        preferredLanguage: 'hi',
      },
    ];

    setTimeout(() => {
      this.eligibleWorkers.set(mockWorkers);
      this.filteredWorkers.set(mockWorkers);
      this.isLoading.set(false);
    }, 500);
  }

  /**
   * Filter workers based on search query
   */
  filterWorkers(query: string): void {
    this.searchQuery.set(query);
    const lowerQuery = query.toLowerCase();

    const filtered = this.eligibleWorkers().filter(
      (worker) => worker.name.toLowerCase().includes(lowerQuery) || worker.phone.includes(query),
    );

    this.filteredWorkers.set(filtered);
  }

  /**
   * Toggle worker selection
   */
  toggleWorkerSelection(workerId: string): void {
    const selected = new Set(this.selectedWorkers());
    if (selected.has(workerId)) {
      selected.delete(workerId);
    } else {
      selected.add(workerId);
    }
    this.selectedWorkers.set(selected);
  }

  /**
   * Select all filtered workers
   */
  selectAllWorkers(): void {
    const allIds = new Set(this.filteredWorkers().map((w) => w.id));
    this.selectedWorkers.set(allIds);
  }

  /**
   * Deselect all workers
   */
  deselectAllWorkers(): void {
    this.selectedWorkers.set(new Set());
  }

  /**
   * Check if worker is selected
   */
  isWorkerSelected(workerId: string): boolean {
    return this.selectedWorkers().has(workerId);
  }

  /**
   * Send notification to all eligible workers
   */
  sendToAllEligible(): void {
    if (this.notificationMode() !== 'all') {
      this.messageService.add({
        severity: 'warn',
        summary: 'गलती',
        detail: 'पहले "सभी को संदेश" मोड में स्विच करें',
        life: 3000,
      });
      return;
    }

    const payload: NotificationPayload = {
      jobPostId: this.jobPostId,
      selectedWorkerIds: this.eligibleWorkers().map((w) => w.id),
      messageType: 'all-eligible',
    };

    this.isLoading.set(true);
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'सफल',
        detail: `${this.eligibleWorkers().length} कर्मचारियों को संदेश भेजा गया`,
        life: 3000,
      });
      this.isLoading.set(false);
      this.notificationSent.emit(payload);
    }, 1000);
  }

  /**
   * Send notification to selected workers
   */
  sendToSelectedWorkers(): void {
    if (this.selectedWorkers().size === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'चेतावनी',
        detail: 'कम से कम एक कर्मचारी चुनें',
        life: 3000,
      });
      return;
    }

    const payload: NotificationPayload = {
      jobPostId: this.jobPostId,
      selectedWorkerIds: Array.from(this.selectedWorkers()),
      messageType: 'selected',
      message: this.customMessage(),
    };

    this.isLoading.set(true);
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'सफल',
        detail: `${this.selectedWorkers().size} कर्मचारियों को संदेश भेजा गया`,
        life: 3000,
      });
      this.isLoading.set(false);
      this.notificationSent.emit(payload);
    }, 1000);
  }

  /**
   * Cancel and go back
   */
  cancel(): void {
    this.cancelled.emit();
  }

  /**
   * Get rating display
   */
  getRatingDisplay(rating: number): string {
    return `★ ${rating.toFixed(1)}`;
  }

  /**
   * Get skills display
   */
  getSkillsDisplay(skills: string[]): string {
    return skills.join(', ');
  }
}
