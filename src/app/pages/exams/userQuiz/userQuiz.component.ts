import { Component, OnInit } from '@angular/core';
import {ExamsService} from 'src/app/services/exams.service';
import { Subscription } from 'rxjs';
import {UserQuiz, UserQuizResponse, UserQuizData} from 'src/app/models/exams.model';


@Component({
  selector: 'app-userquiz',
  templateUrl: './userQuiz.component.html',
  styleUrls: ['./userQuiz.component.scss']
})
export class UserQUizComponent implements OnInit {
 userQuizes: UserQuiz[];
 userQuizSubscription: Subscription;
  showDetail = false;
  constructor(private examsService: ExamsService) {
  }
  ngOnInit(): void {
    this.userQuizSubscription = this.examsService.allUserQuiz().subscribe((response: UserQuizResponse) => {
      this.userQuizes = response.data.allUserQuiz;
    });
  }
}
