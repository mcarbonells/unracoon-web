import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {UsuarioService} from 'src/app/services/usuario.service';
import { ExamsService } from 'src/app/services/exams.service';
import {VocabularyService} from 'src/app/services/vocabulary.service';
import {ExamLevel, ExamLevelResponse} from 'src/app/models/exams.model';
import {Words, WordsResponse} from 'src/app/models/vocabulary.model';
import {UserLogin} from 'src/app/models/usuario.model';

@Component({
  selector: 'app-examslevel',
  templateUrl: './examsLevel.component.html',
  styleUrls: ['./examsLevel.component.scss']
})
export class ExamsLevelComponent implements OnInit {
  examsLevelForm;
  examLevel: ExamLevel;
  exam: {
    userId: number,
    level: string,
    words: any,
    correctWords: any,
    pass: boolean
  };
  examLevelB: {
    userId: number,
    level: string
  };
  word: Words[];
  words: any;
  wordsB: any;
  user: UserLogin;
  examSelect: ExamLevel;
  showQuiz = false;
  @Output() closeForm = new EventEmitter<any>();
  constructor(
    private examService: ExamsService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private vocabularyService: VocabularyService
  ) {
    this.user = this.usuarioService.getUser();
    this.examLevelB = {userId: 0, level: ''};
  }

  async ngOnInit(): Promise<void> {
    this.examsLevelForm = this.fb.group({
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
      word11: ['', Validators.required],
      word12: ['', Validators.required]
    });
    await this.vocabularyService.getAllWords().subscribe((response: WordsResponse) => {
      this.word = response.data.allWords;
      console.log(response, this.word);
    });
    this.examLevelB = {userId: this.user.id, level: 'A1'};
    await this.examService.deleteExam(this.examLevelB).subscribe((response: ExamLevelResponse) => {
      console.log(response.data.deleteExam);
    });
  }
  async openExam(){
    let n;
    for (let i = 0; i < 12; i++) {
      n = this.randomIntFromInterval(0, this.word.length);
      this.words[i] = this.word[n].name;
    }
    const examWM = [];
    for (let i = 0; i < 12; i++){
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.word.length; j++){
        if (this.word[j].name === this.words[i]){
          examWM[i] = this.word[j].meaning;
          break;
        }
      }
    }
    console.log(examWM);
    this.wordsB = examWM;
    this.showQuiz = true;
  }
  async sendQuiz(){
    const words1 = [];
    words1[0] = this.examsLevelForm.value.word1.toLowerCase();
    words1[1] = this.examsLevelForm.value.word2.toLowerCase();
    words1[2] = this.examsLevelForm.value.word3.toLowerCase();
    words1[3] = this.examsLevelForm.value.word4.toLowerCase();
    words1[4] = this.examsLevelForm.value.word5.toLowerCase();
    words1[5] = this.examsLevelForm.value.word6.toLowerCase();
    words1[6] = this.examsLevelForm.value.word7.toLowerCase();
    words1[7] = this.examsLevelForm.value.word8.toLowerCase();
    words1[8] = this.examsLevelForm.value.word9.toLowerCase();
    words1[9] = this.examsLevelForm.value.word10.toLowerCase();
    words1[10] = this.examsLevelForm.value.word11.toLowerCase();
    words1[11] = this.examsLevelForm.value.word12.toLowerCase();
    const correctWords1 = [];
    let pass1: boolean;
    let n = 0;
    for (let i = 0; i < 12; i++){
      if (this.wordsB[i].toLowerCase() === words1[i]){
        n++;
        correctWords1[i] = this.words[i];
      }
    }
    if (n >= 6){
      pass1 = true;
    }
    else{
      pass1 = false;
    }
    this.exam = {userId: this.user.id, level: 'A1', words: this.words, correctWords: correctWords1, pass: pass1};
    this.examLevel = this.exam;
    await this.examService.createExam(this.examLevel).subscribe((response: ExamLevelResponse) => {
        console.log(response.data.createExam);
    });
  }
  private randomIntFromInterval(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  close() {
    this.closeForm.emit();
  }

}
