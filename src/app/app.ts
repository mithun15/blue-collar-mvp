import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar, AvatarModule, ButtonModule, DividerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('blue-collar-mvp');
  currentLanguage = signal<'en' | 'hi'>('hi');

  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['hi', 'en']);
    this.translate.setFallbackLang('hi');
    this.translate.use('hi');
  }

  setLanguage(lang: 'en' | 'hi') {
    this.currentLanguage.set(lang);
    this.translate.use(lang);
  }
}
