import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Words, WordsResponse } from 'src/app/models/vocabulary.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {

  words: Words[];
  wordsForm;
  formVisible = false;

  constructor(
    private vocabularyService: VocabularyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.wordsForm = this.fb.group({
      //response: ['pending', Validators.required],
      name: ['', Validators.required],
      level: ['', Validators.required],
      image: ['', Validators.required],
      linkW: ['', Validators.required],
      meaning: ['', Validators.required]
    });

    this.vocabularyService.getAllWords().subscribe((response: WordsResponse) => {
      this.words = response.data.allWords;
    });
  }

  sendWord() {
    this.vocabularyService.addWord(this.wordsForm.value).subscribe((response) => {
      console.log(response);
    });
  }

  showForm() {
    this.formVisible = true;
  }
}