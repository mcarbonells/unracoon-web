import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ForumService } from 'src/app/services/forum.service';
import { ThreadResponse } from 'src/app/models/forum.model';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { UserLogin } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-thread-form',
  templateUrl: './thread-form.component.html',
  styleUrls: ['./thread-form.component.scss']
})
export class ThreadFormComponent implements OnInit {
  threadForm;
  faClose = faWindowClose;
  @Output() closeForm = new EventEmitter<any>();
  user: UserLogin;
  constructor(
    private forumService: ForumService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
  ) {
    this.user = this.usuarioService.getUser();
   }

  ngOnInit(): void {
    this.threadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      levelId: ['3', Validators.required],
      userName: [this.user.name || 'Nicolas Caro', Validators.required],
      userId: [this.user.id || '2', Validators.required],
    });
  }

  sendThread(){
    this.forumService.addThread(this.threadForm.value).subscribe((response: ThreadResponse) => {
      console.log(response.data.allThreads);
      this.close();
    });
  }

  close() {
    this.closeForm.emit();
  }

}
