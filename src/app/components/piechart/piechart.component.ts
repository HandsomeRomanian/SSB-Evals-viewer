import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Chart, { ChartConfiguration, ChartData } from 'chart.js/auto';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss'],
})
export class PiechartComponent implements AfterViewInit {
  @ViewChild('canva') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() public title = 'Évaluation';
  @Input() public data: ('Excellente' | 'Bien' | 'À Améliorer' | 'Nulle')[] =
    [];

  private colors = ['#64bd29', '#0077be', '#ff8500', '#ff0000'];
  private chart!: Chart<'pie'>;

  constructor() {}

  public ngAfterViewInit() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Excellente', 'Bien', 'À Améliorer', 'Nulle'],
        datasets: [
          {
            data: this.chartData,
            backgroundColor: this.colors,
            borderColor: this.colors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  public get chartData() {
    const output = [0, 0, 0, 0];
    this.data.forEach((x) => {
      switch (x) {
        case 'Excellente':
          output[0]++;
          break;
        case 'Bien':
          output[1]++;
          break;
        case 'À Améliorer':
          output[2]++;
          break;
        case 'Nulle':
          output[3]++;
          break;
      }
    });
    return output;
  }
}
