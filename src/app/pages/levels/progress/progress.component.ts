import { Component, OnInit } from '@angular/core';
import { LevelsService } from 'src/app/services/levels.service';
import { Progress, ProgressResponse } from 'src/app/models/levels.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  progress: Progress[];
  progressForm;
  formVisible = false;

  constructor(
    private levelsService: LevelsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.progressForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      advance: ['', Validators.required],
      enable: ['', Validators.required],
    });

    this.levelsService
      .getAllProgress()
      .subscribe((response: ProgressResponse) => {
        this.progress = response.data.allProgress;
      });
  }

  sendProgress() {
    this.levelsService
      .addProgress(this.progressForm.value)
      .subscribe((response) => {
        console.log(response);
      });
  }

  showForm() {
    this.formVisible = true;
  }
}
