import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Entry, Thread } from '../models/forum.model';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  constructor(private apollo: Apollo) {}

  getAllThreads() {
    return this.apollo.query({
      query: gql`
        {
          allThreads {
            _id
            title
            description
            levelId
            userName
            userId
          }
        }
      `,
    });
  }

  addThread(thread: Thread) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        createThread(thread: {
          title: "${thread.title}",
          description: "${thread.description}",
          userName: "${thread.userName}",
          userId: "${thread.userId}"
          levelId: "${thread.levelId}"
      }) {
          title, userName, active
        }
      }
      `
    });
  }

  getEntrysThread(id: string) {
    return this.apollo.query({
      query: gql`
        query {
          entryThread (id: "${id}", active: "2"){
            message, userName, userId, active, isAuthor
          }
        }
      `,
    });
  }

  addEntry(entry: Entry) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        createEntry(entry:
          {
            message: "${entry.message}",
            threadId: "${entry.threadId}",
            userName: "${entry.userName}",
            userId: "${entry.userId}"
        }
    ) {
          _id, message
        }
      }
      `,
    });
  }
}
