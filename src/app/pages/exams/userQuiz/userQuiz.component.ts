import { Component, OnInit } from '@angular/core';
import {ExamsService} from 'src/app/services/exams.service';
import { Subscription } from 'rxjs';
import {UserQuiz, UserQuizResponse} from 'src/app/models/exams.model';
import {UserInformationService} from 'src/app/services/user-information.service';


@Component({
  selector: 'app-userquiz',
  templateUrl: './userQuiz.component.html',
  styleUrls: ['./userQuiz.component.scss']
})
export class UserQuizComponent implements OnInit {
 userQuizes: UserQuiz[];
 userQuizSubscription: Subscription;
  constructor(private examsService: ExamsService, private userInformationService: UserInformationService) {
  }
  async ngOnInit(): Promise<void> {
    this.userQuizSubscription = await this.examsService.allUserQuiz().subscribe((response: UserQuizResponse) => {
      this.userQuizes = response.data.allUserQuiz;
    });
  }
}
