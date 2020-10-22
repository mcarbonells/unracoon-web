import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Category, CategoryResponse } from 'src/app/models/vocabulary.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category[];
  categoryForm;
  formVisible = false;

  constructor(
    private vocabularyService: VocabularyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
    });

    this.vocabularyService.getAllCategory().subscribe((response: CategoryResponse) => {
      this.category = response.data.allCategory;
    });
  }

  sendCategory() {
    this.vocabularyService.addCategory(this.categoryForm.value).subscribe((response) => {
      console.log(response);
    });
  }

  showForm() {
    this.formVisible = true;
  }
}