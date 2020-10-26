import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// @ts-ignore
import {UsuarioService} from 'src/app/services/usuario.service';
import { ExamsService } from 'src/app/services/exams.service';
import {VocabularyService} from 'src/app/services/vocabulary.service';
import {ExamLevel, ExamLevelResponse} from 'src/app/models/exams.model';
// @ts-ignore
import {UserLogin} from 'src/app/models/usuario.model';

@Component({
  selector: 'app-userquiz-form',
  templateUrl: './userQuiz-form.component.html',
  styleUrls: ['./userQuiz-form.component.scss']
})
export class ExamsLevelComponent implements OnInit {
  examsLevelForm;
  examLevel: ExamLevel;
  word: Words[];
  words = [];
  wordB: Words;
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
    let n;
    for (let i = 0; i < 12; i++) {
      n = this.randomIntFromInterval(0, this.word.length);
      this.words[i] = this.word[n].name;
    }
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
    let nameWord: Words;
    const correctWords = [];
    let n = 0;
    for (let i = 0; i < 10; i++){
      this.wordB.name = this.words[i];
      await this.vocabularyService.getWordByName(this.wordB).subscribe((response: WordsResponse) => {
        nameWord = response.data.getWordByName[0];
      });
      if (nameWord.meaning === words1[i]){
        n++;
        correctWords[i] = words1[i];
      }
    }
    const date = new Date();
    this.examLevel.userId = this.user.id;
    this.examLevel.level = 'A1';
    this.examLevel.words = this.words;
    this.examLevel.date = date.toDateString();
    this.examLevel.correctWords = correctWords;
    if (n >= 6){
      this.examLevel.pass = true;
    }
    else{
      this.examLevel.pass = false;
    }
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
