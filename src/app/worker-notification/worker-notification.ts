import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { interval, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

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
export class WorkerNotification implements OnInit, OnDestroy {
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

  // Timer signals
  timerSeconds = signal<number>(600); // 10 minutes in seconds
  isTimerActive = signal<boolean>(true);
  timerDisplay = signal<string>('10:00');

  // Expose Math to template
  Math = Math;

  private destroy$ = new Subject<void>();
  private readonly TIMER_DURATION = 600; // 10 minutes

  constructor(private messageService: MessageService) {
    // Effect to update timer display whenever seconds change
    effect(() => {
      const seconds = this.timerSeconds();
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      this.timerDisplay.set(`${minutes}:${secs.toString().padStart(2, '0')}`);

      // Auto-send when timer reaches 0
      if (seconds === 0 && this.isTimerActive()) {
        this.isTimerActive.set(false);
        this.autoSendToAll();
      }
    });
  }

  ngOnInit(): void {
    this.loadEligibleWorkers();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Start the 10-minute countdown timer
   */
  private startTimer(): void {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const currentSeconds = this.timerSeconds();
        if (currentSeconds > 0) {
          this.timerSeconds.set(currentSeconds - 1);
        }
      });
  }

  /**
   * Auto-send notification to all eligible workers when timer expires
   */
  private autoSendToAll(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'समय समाप्त',
      detail: 'समय समाप्त हो गया। सभी कर्मचारियों को संदेश भेजा जा रहा है...',
      life: 4000,
    });

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
        detail: `${this.eligibleWorkers().length} कर्मचारियों को स्वचालित रूप से संदेश भेजा गया`,
        life: 3000,
      });
      this.isLoading.set(false);
      this.notificationSent.emit(payload);
    }, 1000);
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

    this.isTimerActive.set(false); // Stop the timer

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

    this.isTimerActive.set(false); // Stop the timer

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
