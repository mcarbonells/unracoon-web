import { Component, OnInit } from '@angular/core';
import { WeekQuiz, WeekQuizResponse} from 'src/app/models/exams.model';
import { ExamsService } from 'src/app/services/exams.service';
import { ForumService } from 'src/app/services/forum.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exams',
  templateUrl: './weekQuiz.component.html',
  styleUrls: ['./weekQuiz.component.scss']
})
export class WeekQuizComponent implements OnInit {
  weekQuizSubscription: Subscription;
  weekQuices: WeekQuiz[];
  weekQuizSelected: WeekQuiz;
  showDetail = false;
  formVisible = true;
  constructor(private examsService: ExamsService,  private fb: ForumService) {
  }

  ngOnInit(): void {
    this.weekQuizSubscription = this.examsService.allWeekQuiz().subscribe((response: WeekQuizResponse) => {
      this.weekQuices = response.data.allWeekQuiz;
    });
  }
  openWeekQuiz( weekQuiz: WeekQuiz ) {
    this.weekQuizSelected = weekQuiz;
    this.showDetail = true;
  }

  hideDetail(event: boolean) {
    this.showDetail = event;
  }
  showForm() {
    this.formVisible = true;
  }
}
