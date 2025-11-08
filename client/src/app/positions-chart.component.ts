import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-positions-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div *ngIf="labels.length" class="chart-wrap">
      <canvas baseChart
        [data]="{ labels: labels, datasets: [{ data: values }] }"
        [type]="'pie'">
      </canvas>
    </div>
  `,
  styles: [`.chart-wrap { width: 260px; height: 260px; margin-top: 10px; }`]
})
export class PositionsChartComponent {
  labels: string[] = [];
  values: number[] = [];

  @Input() set positions(p: Record<string, number> | null) {
    if (!p) return;
    this.labels = Object.keys(p).map(k => k.toUpperCase());
    this.values = Object.values(p);
  }
}
