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
  wordsB: Words;
  weekQuiz: WeekQuiz[];
  userQuizSubscription: Subscription;
  user: UserLogin;
  @Output() closeForm = new EventEmitter<any>();
  constructor(
    private examService: ExamsService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private vocabularyService: VocabularyService
  ) {
    this.user = this.usuarioService.getUser();
  }

  async ngOnInit(): Promise<void> {
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
    this.userQuizSubscription = await this.examService.weekQuizById().subscribe((response: WeekQuizResponse) => {
      this.weekQuiz = response.data.weekQuizById;
    });
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
    let nameWord: Words;
    const correctWords = [];
    let score = 0;
    for (let i = 0; i < 10; i++){
      this.wordsB.name = this.weekQuiz[0].words[i];
      await this.vocabularyService.getWordByName(this.wordsB).subscribe((response: WordsResponse) => {
        nameWord = response.data.getWordByName[0];
      });
      if (nameWord.meaning === words[i]){
        score = score + 100;
        correctWords[i] = words[i];
      }
    }
    const date = new Date();
    this.userQuiz.userId = this.user.id;
    this.userQuiz.idQuiz = this.weekQuiz[0].idQuiz;
    this.userQuiz.words = this.weekQuiz[0].words;
    this.userQuiz.date = date.toDateString();
    this.userQuiz.correctWords = correctWords;
    this.userQuiz.score = score;
    await this.examService.createUserQuiz(this.userQuiz).subscribe((response: UserQuizResponse) => {
      console.log(response.data.createUserQuiz);
    });
  }

  close() {
    this.closeForm.emit();
  }

}
