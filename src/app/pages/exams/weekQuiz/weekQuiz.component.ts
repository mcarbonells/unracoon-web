import { Component, OnInit } from '@angular/core';
import { WeekQuiz, WeekQuizResponse} from 'src/app/models/exams.model';
import { ExamsService } from 'src/app/services/exams.service';
import { Subscription } from 'rxjs';
import {VocabularyService} from 'src/app/services/vocabulary.service';
import {WordsResponse, Words} from 'src/app/models/vocabulary.model';

@Component({
  selector: 'app-exams',
  templateUrl: './weekQuiz.component.html',
  styleUrls: ['./weekQuiz.component.scss']
})
export class WeekQuizComponent implements OnInit {
  weekQuices: WeekQuiz[];
  weekQuizSelected: WeekQuiz;
  weekQuizSubscription: Subscription;
  vocabularioSubscription: Subscription;
  weekQuiz;
  word: Words[];
  showDetail = false;
  constructor(private examsService: ExamsService, private vocabularyService: VocabularyService) {
  }
  async ngOnInit(): Promise<void> {
    this.weekQuizSubscription = await this.examsService.allWeekQuiz().subscribe((response: WeekQuizResponse) => {
      this.weekQuices = response.data.allWeekQuiz;
    });
    this.vocabularioSubscription = await this.vocabularyService.getAllWords().subscribe((response: WordsResponse) => {
      this.word = response.data.allWords;
      console.log(response, this.word);
    });
  }
  openWeekQuiz( weekQuiz: WeekQuiz ) {
    this.weekQuizSelected = weekQuiz;
    this.showDetail = true;
  }

  hideDetail(event: boolean) {
    this.showDetail = event;
  }
  async createQuiz() {
    this.weekQuizSubscription = await this.examsService.updateWeekQuiz().subscribe((response: WeekQuizResponse) => {
      console.log(response.data.updateWeekQuiz);
    });
    const words = [];
    let n;
    for (let i = 0; i < 10; i++) {
      n = this.randomIntFromInterval(0, this.word.length);
      words[i] = this.word[n].name;
    }
    this.weekQuiz.words = words;
    this.weekQuiz.idQuiz = this.randomIntFromInterval(0, 1234);
    console.log(this.weekQuiz);
    console.log(this.weekQuiz);
    this.weekQuizSubscription = await this.examsService.createWeekQuiz(this.weekQuiz).subscribe((response: WeekQuizResponse) => {
      console.log(response.data.createWeekQuiz);
    });
  }
  private randomIntFromInterval(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
