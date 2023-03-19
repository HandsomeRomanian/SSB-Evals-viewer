import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Chart from 'chart.js/auto';
import { NUM_TO_NAME } from './const/num-to-name';
import { firstValueFrom } from 'rxjs';
import { SheetsModel } from './const/model';

type ChartDataType = ('Excellente' | 'Bien' | 'À Améliorer' | 'Nulle')[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public empNum!: number ;
  public key: string = '';

  public chartTitles: string[] = [];
  public questions: string[] = [];
  public data: {
    c1: ChartDataType;
    c2: ChartDataType;
    c3: ChartDataType;
    c4: ChartDataType;
    c5: ChartDataType;
    c6: ChartDataType;
    q1: string[];
    q2: string[];
    q3: string[];
  } = {
    c1: [],
    c2: [],
    c3: [],
    c4: [],
    c5: [],
    c6: [],
    q1: [],
    q2: [],
    q3: [],
  };
  constructor(private httpClient: HttpClient) {}

  public async get() {
    const name = NUM_TO_NAME[this.empNum];
    if (!name) {
      throw new Error('No name found for employee number ' + this.empNum);
    }
    const data = await firstValueFrom(
      this.httpClient.get<SheetsModel>(
        'https://sheets.googleapis.com/v4/spreadsheets/1QWbJ7zk-Qzv5b3_6K5ttyepDEABJOjf-IWFvNzFbWOQ/values/Results',
        {
          params: {
            key: this.key,
          },
        }
      )
    );
    console.log(data.values);
    this.chartTitles = data.values[0].slice(2, 7);
    this.questions = data.values[0].slice(8, 11);
    console.log(data.values.filter((x) => x[1] === name));

    const userData = data.values.filter((x) => x[1] === name);
    this.data.c1 = userData.map((x) => x[2]).flat() as ChartDataType;
    this.data.c2 = userData.map((x) => x[3]).flat() as ChartDataType;
    this.data.c3 = userData.map((x) => x[4]).flat() as ChartDataType;
    this.data.c4 = userData.map((x) => x[5]).flat() as ChartDataType;
    this.data.c5 = userData.map((x) => x[6]).flat() as ChartDataType;
    this.data.c6 = userData.map((x) => x[7]).flat() as ChartDataType;
    this.data.q1 = userData.map((x) => x[8]).flat();
    this.data.q2 = userData.map((x) => x[9]).flat();
    this.data.q3 = userData.map((x) => x[10]).flat();
    console.log(this.data);
  }

  public getChartData(index: number): ChartDataType {
    switch (index) {
      case 0:
        return this.data.c1;
      case 1:
        return this.data.c2;
      case 2:
        return this.data.c3;
      case 3:
        return this.data.c4;
      case 4:
        return this.data.c5;
      case 5:
        return this.data.c6;
    }
    return [];
  }

  public getQuestionData(index: number): string[] {
    switch (index) {
      case 0:
        return this.data.q1;
      case 1:
        return this.data.q2;
      case 2:
        return this.data.q3;
    }
    return [];
  }
}
