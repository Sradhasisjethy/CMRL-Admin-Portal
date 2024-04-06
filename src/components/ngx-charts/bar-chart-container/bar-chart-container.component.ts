import { Component, Input } from '@angular/core';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-chart-container',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BarChartComponent,
    CommonModule,
  ],
  templateUrl: './bar-chart-container.component.html',
  styleUrl: './bar-chart-container.component.scss',
})
export class BarChartContainerComponent {
  @Input() chartData: any = {};
}