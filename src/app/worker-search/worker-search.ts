import { Component, OnInit, OnDestroy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-worker-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-search.html',
  styleUrl: './worker-search.scss',
})
export class WorkerSearch implements OnInit, OnDestroy {
  private _router = inject(Router);

  // Signals
  searchProgress = signal<number>(0);
  searchMessage = signal<string>('हम आपके लिए सर्वश्रेष्ठ कर्मचारियों को खोज रहे हैं...');
  isSearching = signal<boolean>(true);

  // Expose Math to template
  Math = Math;

  private destroy$ = new Subject<void>();
  private readonly SEARCH_DURATION = 300000; // 5 minutes in milliseconds
  private startTime: number = 0;

  constructor() {
    // Effect to handle redirect when progress reaches 100%
    effect(() => {
      const progress = this.searchProgress();
      if (progress >= 100 && this.isSearching()) {
        this.isSearching.set(false);
        // Redirect after a brief delay
        setTimeout(() => {
          this._router.navigate(['/worker-notification']);
        }, 500);
      }
    });
  }

  ngOnInit(): void {
    this.startTime = Date.now();
    this.startProgressAnimation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Animate progress bar over time
   */
  private startProgressAnimation(): void {
    interval(50)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const elapsed = Date.now() - this.startTime;
        const progress = Math.min((elapsed / this.SEARCH_DURATION) * 100, 100);
        this.searchProgress.set(progress);

        // Update message based on progress
        if (progress < 25) {
          this.searchMessage.set('हम आपके लिए सर्वश्रेष्ठ कर्मचारियों को खोज रहे हैं...');
        } else if (progress < 50) {
          this.searchMessage.set('कर्मचारियों की योग्यता की जांच की जा रही है...');
        } else if (progress < 75) {
          this.searchMessage.set('कर्मचारियों की उपलब्धता की पुष्टि की जा रही है...');
        } else {
          this.searchMessage.set('आपके लिए सर्वश्रेष्ठ मैच मिल गए!');
        }
      });
  }
}
