import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExamsService } from 'src/app/services/exams.service';
import {VocabularyService} from 'src/app/services/vocabulary.service';
import {UserQuiz, UserQuizResponse, WeekQuiz, WeekQuizResponse} from 'src/app/models/exams.model';
import {Subscription} from 'rxjs';
import {Words} from '../../../../models/vocabulary.model';

@Component({
  selector: 'app-userquiz-form',
  templateUrl: './userQuiz-form.component.html',
  styleUrls: ['./userQuiz-form.component.scss']
})
export class UserQuizFormComponent implements OnInit {
  userQuizForm;
  userQuiz: UserQuiz;
  word: Words;
  weekQuiz: WeekQuiz[];
  userQuizSubscription: Subscription;
  @Output() closeForm = new EventEmitter<any>();
  constructor(
    private examService: ExamsService,
    private fb: FormBuilder,
    private vocabularyService: VocabularyService
  ) { }

  ngOnInit(): void {
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
    this.userQuizSubscription = this.examService.weekQuizById().subscribe((response: WeekQuizResponse) => {
      this.weekQuiz = response.data.weekQuizById;
    });
  }
  sendQuiz(){
    const words = this.userQuizForm.value;
    this.userQuiz.words = this.weekQuiz[0].words;
    this.userQuiz.idQuiz = this.weekQuiz[0].idQuiz;
    this.userQuiz.userId = 1;
    this.examService.createUserQuiz(this.userQuiz).subscribe((response: UserQuizResponse) => {
      console.log(response.data.createUserQuiz);
    });
  }

  close() {
    this.closeForm.emit();
  }

}
