import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-top-bar-widget',
  imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule],
  templateUrl: './top-bar-widget.html',
  styleUrl: './top-bar-widget.scss',
})
export class TopBarWidget {
  public router = inject(Router);
}
