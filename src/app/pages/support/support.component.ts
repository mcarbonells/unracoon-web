import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/services/support.service';
import { Ticket, TicketResponse } from 'src/app/models/support.model';
import { FormBuilder, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserLogin } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  tickets: Ticket[];
  ticketForm;
  formVisible = false;
  faPlus = faPlus;
  faClose = faWindowClose;
  user: UserLogin;

  constructor(
    private supportService: SupportService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
  ) {
    this.user = this.usuarioService.getUser();
  }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      response: ['pending', Validators.required],
      issue: ['', Validators.required],
      section: ['', Validators.required],
      userName: [this.user.name, Validators.required]
    });

    this.supportService.getAllTickets().subscribe((response: TicketResponse) => {
      this.tickets = response.data.allTickets;
    });
  }


  sendTicket() {
    this.supportService.addTicket(this.ticketForm.value).subscribe((response) => {
      console.log(response);
    });
  }

  showForm() {
    this.formVisible = true;
  }

  close() {
    this.formVisible = false;
  }

}
