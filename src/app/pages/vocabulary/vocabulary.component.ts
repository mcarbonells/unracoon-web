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
  wordSelected: Words;
  showWord = false;
  showWords = false;
  wordForm;

  constructor(
    private vocabularyService: VocabularyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.vocabularyService.getAllWords().subscribe((response: WordsResponse) => {
      this.words = response.data.allWords;
      console.log(response);
    });
    this.wordForm = this.fb.group({
      response: ['', Validators.required],
    });
  }

  private randomIntFromInterval(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  obtenerPalabra() {
    if (this.words && this.words.length > 0) {
      const randomNumber = this.randomIntFromInterval(0, this.words.length - 1);
      this.wordSelected = this.words[randomNumber];
      this.showWord = true;
    }
  }

  comprobarPalabra() {
    if( this.wordForm.value.response.toLowerCase() === this.wordSelected.meaning.toLowerCase()){
      alert('Bien');
    } else {
      alert(`Mal, la respuesta correcta es ${this.wordSelected.meaning}`);
    }
    this.wordForm.value = [];
    this.showWord = false;
  }

  togglePalabras() {
    this.showWords = !this.showWords;
  }

}
