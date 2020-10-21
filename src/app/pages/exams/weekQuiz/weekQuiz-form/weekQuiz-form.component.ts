import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { WeekQuizResponse} from 'src/app/models/exams.model';
import { ExamsService } from 'src/app/services/exams.service';

import { Subscription } from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-weekquiz-form',
  templateUrl: './weekQuiz-form.component.html',
  styleUrls: ['./weekQuiz-form.component.scss']
})
export class WeekQuizFormComponent implements OnInit {
  weekQuizSubscription: Subscription;
  weekQuizForm;
  @Output() closeForm = new EventEmitter<any>();
  constructor(private examsService: ExamsService,  private fb: FormBuilder ) {
  }

  ngOnInit(): void {
    this.weekQuizForm = this.fb.group({
      idQUiz: ['', Validators.required],
      words: ['', Validators.required]
    });
  }
  sendWeekQuiz(){
    this.weekQuizSubscription = this.examsService.createWeekQuiz(this.weekQuizForm.value).subscribe((response: WeekQuizResponse) => {
      console.log(response.data.createWeekQuiz);
    });
  }

  close() {
    this.closeForm.emit();
  }
}
