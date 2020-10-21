import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Category, Words } from '../models/vocabulary.model';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  constructor(private apollo: Apollo) { }

  getAllCategory() {
    return this.apollo.query({
      query: gql`
        {
          allCategory {
            name 
            level 
          }
        }
      `,
    });
  }

  addCategory(category: Category) {
    console.log(category)
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        createCategory(body: {
          name: "${category.name}",
          level: "${category.level}",
      }) {
        name 
        level
        }
      }
      `
    });
  }

  getAllWords() {
    return this.apollo.query({
      query: gql`
        {
          allWords {
            name
            category
            image
            linkW
            meaning
          }
        }
      `,
    });
  }

  addWord(words: Words) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        createWord(body: {
          name: "${words.name}",
          category: "${words.category}",
          image: "${words.image}",
          linkW: "${words.linkW}"
          meaning: "${words.meaning}"
      }) {
          name
          category 
          meaning
        }
      }
      `
    });
  }
}