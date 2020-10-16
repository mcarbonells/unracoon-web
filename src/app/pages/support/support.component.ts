import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/services/support.service';
import { Ticket, TicketResponse } from 'src/app/models/support.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  tickets: Ticket[];
  ticketForm;
  formVisible = false;

  constructor(
    private supportService: SupportService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      response: ['pending', Validators.required],
      issue: ['', Validators.required],
      section: ['', Validators.required],
      userName: ['Andres Velandia', Validators.required]
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

}
