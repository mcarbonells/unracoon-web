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
  examLevel: {
  userId: number,
  level: string
};
  examsLevels: ExamLevel[];
  allUserExams: ExamLevel[];
  user: UserLogin;
  userQuizes: UserQuiz[];
  allUserQuizzes: UserQuiz[];
  userQuiz: {userId: number};
  userQuizSubscription: Subscription;
  examsLevelSubscription: Subscription;
  constructor(private examsService: ExamsService, private usuarioService: UsuarioService) {
    this.user = this.usuarioService.getUser();
    this.examLevel = {userId: 0, level: ''};
    this.userQuiz = {userId: 0};
  }

  async ngOnInit(): Promise<void> {
    this.examsLevelSubscription = await this.examsService.allExamLevels().subscribe((response: ExamLevelResponse) => {
      this.examsLevels = response.data.examById;
    });
    this.userQuiz.userId = this.user.id;
    this.userQuizSubscription = await this.examsService.allUserQuiz().subscribe((response: UserQuizResponse) => {
      this.userQuizes = response.data.userQuizByUserID;
    });
  }
   verExamsQuizzes(){
    const examsUser = [];
    for (let i = 0; i < this.examsLevels.length; i++){
      const idUser = this.examsLevels[i];
      if (idUser.userId === this.user.id){
        examsUser[i] = idUser;
      }
    }
    this.allUserExams = examsUser;
    const quizUser = [];
    for (let i = 0; i < this.userQuizes.length; i++){
       const idUser = this.userQuiz[i];
       if (idUser.userId === this.user.id){
         quizUser[i] = idUser;
       }
    }
    this.allUserQuizzes = quizUser;
  }
}
