import { GeneralResponse } from './general-response.model';

export interface Ticket {
  id?: string;
  userName: string;
  section: string;
  issue: string;
  response: string;
}

export interface TicketData {
  allTickets: Ticket[];
  createTicket: Ticket;
}

export interface TicketResponse extends GeneralResponse {
  data: TicketData;
}
