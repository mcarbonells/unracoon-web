import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExamsService } from 'src/app/services/exams.service';
import {VocabularyService} from 'src/app/services/vocabulary.service';
import {UserQuiz, UserQuizResponse, WeekQuiz, WeekQuizResponse} from 'src/app/models/exams.model';
import {Subscription} from 'rxjs';
import {Words, WordsResponse} from 'src/app/models/vocabulary.model';
import {UsuarioService} from 'src/app/services/usuario.service';
import {UserLogin} from 'src/app/models/usuario.model';

@Component({
  selector: 'app-userquiz-form',
  templateUrl: './userQuiz-form.component.html',
  styleUrls: ['./userQuiz-form.component.scss']
})
export class UserQuizFormComponent implements OnInit {
  userQuizForm;
  userQuiz: UserQuiz;
  wordsB: any;
  words: Words[];
  weekQuiz: WeekQuiz[];
  weekQ: WeekQuiz;
  thisWeekQuiz: any;
  userQuizSubscription: Subscription;
  user: UserLogin;
  showQuiz = false;
  @Output() closeForm = new EventEmitter<any>();
  constructor(
    private examService: ExamsService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private vocabularyService: VocabularyService
  ) {
    this.user = this.usuarioService.getUser();
  }

  ngOnInit() {
    this.userQuizForm = this.fb.group({
      word1: ['', Validators.required],
      word2: ['', Validators.required],
      word3: ['', Validators.required],
      word4: ['', Validators.required],
      word5: ['', Validators.required],
      word6: ['', Validators.required],
      word7: ['', Validators.required],
      word8: ['', Validators.required],
      word9: ['', Validators.required],
      word10: ['', Validators.required],
    });
    this.userQuizSubscription = this.examService.allWeekQuiz().subscribe((response: WeekQuizResponse) => {
      console.log(response.data.allWeekQuiz );
      this.weekQuiz = response.data.allWeekQuiz;
    });
    this.vocabularyService.getAllWords().subscribe((response: WordsResponse) => {
      this.words = response.data.allWords;
    });
  }

  ngOnDestroy(): void {
    this.userQuizSubscription.unsubscribe();
  }
  async obtenerQuiz(){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.weekQuiz.length; i++){
      const quizSelected = this.weekQuiz[i];
      if (quizSelected.active === true){
        this.weekQ = quizSelected;
        this.thisWeekQuiz = quizSelected.words;
      }
    }
    const quizWM = [];
    for (let i = 0; i < 10; i++){
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.words.length; j++){
        if (this.words[j].name === this.thisWeekQuiz[i]){
          quizWM[i] = this.words[j].meaning;
          break;
        }
      }
    }
    this.wordsB = quizWM;
    this.showQuiz = true;
  }
  async sendQuiz(){
    const words = [];
    words[0] = this.userQuizForm.value.word1.toLowerCase();
    words[1] = this.userQuizForm.value.word2.toLowerCase();
    words[2] = this.userQuizForm.value.word3.toLowerCase();
    words[3] = this.userQuizForm.value.word4.toLowerCase();
    words[4] = this.userQuizForm.value.word5.toLowerCase();
    words[5] = this.userQuizForm.value.word6.toLowerCase();
    words[6] = this.userQuizForm.value.word7.toLowerCase();
    words[7] = this.userQuizForm.value.word8.toLowerCase();
    words[8] = this.userQuizForm.value.word9.toLowerCase();
    words[9] = this.userQuizForm.value.word10.toLowerCase();
    const correctWords1 = [];
    let score1 = 0;
    console.log(words);
    for (let i = 0; i < 10; i++){
      if ( this.wordsB[i].toLowerCase() === words[i]){
        score1 = score1 + 100;
        correctWords1[i] = this.thisWeekQuiz[i];
      }
      console.log(correctWords1, score1);
    }
    let uQuiz: {
      userId: number,
      idQuiz: number,
      words: any,
      correctWords: any,
      score: number
    };
    const date = new Date();
    uQuiz = {userId: this.user.id, idQuiz: this.weekQ.idQuiz, words: this.thisWeekQuiz,
      correctWords: correctWords1, score: score1};
    this.userQuiz = uQuiz;
    console.log(this.userQuiz);
    await this.examService.createUserQuiz(this.userQuiz).subscribe((response: UserQuizResponse) => {
      console.log(response.data.createUserQuiz);
    });
    alert(`Tu puntaje fue: ${score1}`);
  }

  close() {
    this.closeForm.emit();
  }
}
