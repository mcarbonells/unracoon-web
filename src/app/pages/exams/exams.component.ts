import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {ExamsService} from 'src/app/services/exams.service';
import {ExamLevelResponse, ExamLevel, UserQuiz, UserQuizResponse} from 'src/app/models/exams.model';
import {UsuarioService} from 'src/app/services/usuario.service';
import {UserLogin} from 'src/app/models/usuario.model';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit {
  examsLevel1: ExamLevel;
  examLevel: ExamLevel;
  examsLevels: ExamLevel[];
  user: UserLogin;
  userQuizes: UserQuiz[];
  userQuiz: UserQuiz;
  userQuizSubscription: Subscription;
  examsLevelSubscription: Subscription;
  constructor(private examsService: ExamsService, private usuarioService: UsuarioService) {
    this.user = this.usuarioService.getUser();
  }

  async ngOnInit(): Promise<void> {
    this.examLevel.userId = this.user.id;
    this.examLevel.level = 'A1';
    this.examsLevelSubscription = await this.examsService.examById(this.examLevel).subscribe((response: ExamLevelResponse) => {
      this.examsLevels = response.data.examById;
    });
    this.userQuiz.userId = this.user.id;
    this.userQuizSubscription = await this.examsService.userQuizByUserID(this.userQuiz).subscribe((response: UserQuizResponse) => {
      this.userQuizes = response.data.userQuizByUserID;
    });
  }
}
