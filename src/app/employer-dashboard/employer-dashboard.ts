import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-employer-dashboard',
  imports: [CardModule, ButtonModule, ChartModule, TableModule, SplitButton],
  templateUrl: './employer-dashboard.html',
  styleUrl: './employer-dashboard.scss',
})
export class EmployerDashboard implements OnInit {
  piedata: any;
  pieoptions: any;
  basicData: any;
  basicOptions: any;
  items: MenuItem[] = [];

  workers: any = [];

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.piedata = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-cyan-500'),
            documentStyle.getPropertyValue('--p-orange-500'),
            documentStyle.getPropertyValue('--p-gray-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-cyan-400'),
            documentStyle.getPropertyValue('--p-orange-400'),
            documentStyle.getPropertyValue('--p-gray-400'),
          ],
        },
      ],
    };

    this.pieoptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };

    // const documentStyle = getComputedStyle(document.documentElement);
    //         const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'XYZ',
          data: [540, 325, 702, 620],
          backgroundColor: [
            'rgba(249, 115, 22, 0.2)',
            'rgba(6, 182, 212, 0.2)',
            'rgb(107, 114, 128, 0.2)',
            'rgba(139, 92, 246, 0.2)',
          ],
          borderColor: [
            'rgb(249, 115, 22)',
            'rgb(6, 182, 212)',
            'rgb(107, 114, 128)',
            'rgb(139, 92, 246)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    this.workers = [
      {
        id: '1000',
        code: 'Ramesh',
        name: 'Helper',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Present',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1000',
        code: 'Suresh',
        name: 'Mason',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Late',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1000',
        code: 'Mohan',
        name: 'Labour',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Absent',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
    ];

    this.items = [
      {
        label: 'Find Workers Nearby',
        command: () => {},
        icon: 'pi pi-search',
      },
      {
        label: 'Mark Attendance',
        command: () => {},
        icon: 'pi pi-clipboard',
      },
      { label: 'Pay Workers', icon: 'pi pi-indian-rupee' },
    ];
  }
}
