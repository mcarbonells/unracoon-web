import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Entry, EntryResponse, Thread } from 'src/app/models/forum.model';
import { ForumService } from 'src/app/services/forum.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit {

  @Input() thread: Thread;
  @Output() back = new EventEmitter<boolean>();
  public entryForm;

  constructor(
    private forumService: ForumService,
    private fb: FormBuilder,
  ) { }

  entrys: Entry[];
  ngOnInit(): void {
    this.entryForm = this.fb.group({
      message: ['', Validators.required],
      threadId: [this.thread._id, Validators.required],
      userName: ['Andres Velandia', Validators.required],
      userId: ['2', Validators.required],
    });
    console.log('aaaaaa');
    this.forumService.getEntrysThread(this.thread._id).subscribe((data: EntryResponse) => {
      this.entrys = data.data.entryThread;
      console.log(this.entrys);
    });
  }

  getBack() {
    this.back.emit(false);
  }

  sendEntry() {
    this.forumService.addEntry(this.entryForm.value).subscribe((response: EntryResponse) => {
      console.log(response.data.createEntry );
    });
  }

}
