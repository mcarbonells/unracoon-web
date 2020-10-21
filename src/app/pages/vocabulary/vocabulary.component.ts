import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Words, WordsResponse } from 'src/app/models/vocabulary.model';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {

  words: Words[];

  constructor(
    private vocabularyService: VocabularyService,
  ) { }

  ngOnInit(): void {
    this.vocabularyService.getAllWords().subscribe((response: WordsResponse) => {
      this.words = response.data.allWords;
      console.log(response);
    });
  }

}
