import { Component, OnInit } from '@angular/core';
import { LevelsService } from 'src/app/services/levels.service';
import { Classification, ClassificationResponse } from 'src/app/models/levels.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss'],
})
export class ClassifictaionComponent implements OnInit {
  classification: Classification[];
  classificationForm;
  formVisible = false;

  constructor(
    private levelsService: LevelsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.classificationForm = this.fb.group({
      level: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.levelsService
      .getAllClassification()
      .subscribe((response: ClassificationResponse) => {
        this.classification = response.data.allClassification;
      });
  }

  sendClassification() {
    this.levelsService
      .addClassification(this.classificationForm.value)
      .subscribe((response) => {
        console.log(response);
      });
  }

  showForm() {
    this.formVisible = true;
  }
}