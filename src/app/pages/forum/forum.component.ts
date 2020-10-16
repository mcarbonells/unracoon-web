import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Thread, ThreadResponse } from 'src/app/models/forum.model';
import { ForumService } from 'src/app/services/forum.service';

declare var $: any;

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})


export class ForumComponent implements OnInit {

  threadsSubscription: Subscription;
  threads: Thread[];
  threadSelected: Thread;
  showDetail = false;
  formVisible = false;

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.threadsSubscription = this.forumService.getAllThreads().subscribe((response: ThreadResponse) => {
      this.threads = response.data.allThreads;
    });
  }

  openThread( thread: Thread ) {
    this.threadSelected = thread;
    this.showDetail = true;
  }

  hideDetail(event: boolean) {
    this.showDetail = event;
  }

  showForm() {
    this.formVisible = true;
  }


}
