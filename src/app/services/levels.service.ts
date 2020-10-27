import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Classification, Progress } from '../models/levels.model';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private apollo: Apollo) { }

  getAllClassification() {
    return this.apollo.query({
      query: gql`
        {
          allClassification {
            id
            level
            type
          }
        }
      `,
    });
  }

  addClassification(classification: Classification) {
    console.log(classification)
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        createClassification(classification: {
          level: "${classification.level}",
          type: "${classification.type}",
      }) {
        level
        type
        }
      }
      `
    });
  }

  getAllProgress() {
    return this.apollo.query({
      query: gql`
        {
          allProgress {
            id
            type
            name
            advance
            enable
          }
        }
      `,
    });
  }

  addProgress(progress: Progress) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        createProgress(progress: {
          type: "${progress.type}",
          name: "${progress.name}",
          advance: "${progress.advance}",
          enable: "${progress.enable}"
      }) {
          type
          name
          advance
          enable
        }
      }
      `
    });
  }
}