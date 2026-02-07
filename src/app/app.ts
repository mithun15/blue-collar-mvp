import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Menubar } from 'primeng/menubar';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SelectModule, Menubar, AvatarModule, ButtonModule, DividerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public languages = [
    { label: 'English', code: 'en' },
    { label: 'हिंदी', code: 'hi' },
  ];
  protected readonly title = signal('blue-collar-mvp');
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['hi', 'en']);
    this.translate.setFallbackLang('hi');
    this.translate.use('hi');
  }

  onLangChange(event: any) {
    this.translate.use(event.value);
  }
}
