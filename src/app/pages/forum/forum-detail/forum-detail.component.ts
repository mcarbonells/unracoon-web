import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Entry, EntryResponse, Thread } from 'src/app/models/forum.model';
import { ForumService } from 'src/app/services/forum.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit, OnChanges {

  @Input() thread: Thread;
  public entryForm;
  faPlus = faPlus;
  formVisible = false;
  faClose = faWindowClose;

  constructor(
    private forumService: ForumService,
    private fb: FormBuilder,
  ) { }

  entrys: Entry[];
  ngOnInit(): void {
    this.getEntrys();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.thread) {
      this.getEntrys();
    }
  }

  getEntrys() {
    if (this.thread) {
      this.entryForm = this.fb.group({
        message: ['', Validators.required],
        threadId: [this.thread._id, Validators.required],
        userName: ['Andres Velandia', Validators.required],
        userId: ['2', Validators.required],
      });
      this.forumService.getEntrysThread(this.thread._id).subscribe((data: EntryResponse) => {
        this.entrys = data.data.entryThread;
      });
    }
  }

  sendEntry() {
    this.forumService.addEntry(this.entryForm.value).subscribe((response: EntryResponse) => {
      console.log(response.data.createEntry );
    });
  }

  showForm() {
    if ( this.thread ) {
      this.formVisible = true;
    }
  }

}
