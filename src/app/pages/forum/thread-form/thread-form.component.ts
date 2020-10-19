import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ForumService } from 'src/app/services/forum.service';
import { ThreadResponse } from 'src/app/models/forum.model';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-thread-form',
  templateUrl: './thread-form.component.html',
  styleUrls: ['./thread-form.component.scss']
})
export class ThreadFormComponent implements OnInit {
  threadForm;
  faClose = faWindowClose;
  @Output() closeForm = new EventEmitter<any>();
  constructor(
    private forumService: ForumService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.threadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      levelId: ['3', Validators.required],
      userName: ['Andres Velandia', Validators.required],
      userId: ['2', Validators.required],
    });
  }

  sendThread(){
    this.forumService.addThread(this.threadForm.value).subscribe((response: ThreadResponse) => {
      console.log(response.data.allThreads);
    });
  }

  close() {
    this.closeForm.emit();
  }

}
