import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Ticket } from '../models/support.model';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private apollo: Apollo) { }

  getAllTickets() {
    return this.apollo.query({
      query: gql`
        {
          allTickets {
            id, issue, section, response, userName
          }
        }
      `,
    });
  }

  addTicket(ticket: Ticket) {
    console.log('aaa');
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        createTicket(ticket: {
          userName: "${ticket.userName}",
          section: "${ticket.section}",
          issue: "${ticket.issue}"
          response: "${ticket.response}"
      }) {
        issue, section, response,
        }
      }
      `
    });
  }
}
