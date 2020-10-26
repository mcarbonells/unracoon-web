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
          allCategories {
            name
            level
          }
        }
      `,
    });
  }
  getCategoryByName(category: Category){
    return this.apollo.query({
      query: gql`
        {
          categoryByName(body:{
              name= "${category.name}"
           }{
            name
            level
          }
        }
      `,
    });
  }
  getCategoryByLevel(category: Category){
    return this.apollo.query({
      query: gql`
        {
          categoryByLevel(body:{
              level= "${category.level}"
           }{
            name
            level
          }
        }
      `,
    });
  }
  addCategory(category: Category) {
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
  updateCategory(category: Category) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        updateCategory(body: {
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
  deleteCategory(category: Category) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        deleteCategory(body: {
          name: "${category.name}"
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
  getWordByName(words: Words){
    return this.apollo.query({
      query: gql`
        {
          wordsByName(body:{
              name= "${words.name}"
           }{
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
  getWordByCategory(words: Words){
    return this.apollo.query({
      query: gql`
        {
          wordsByCategory(body:{
              category= "${words.category}"
           }{
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
          image
          linkW
          meaning
        }
      }
      `
    });
  }
  updateWord(words: Words) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        updateWord(body: {
          name: "${words.name}",
          category: "${words.category}",
          image: "${words.image}",
          linkW: "${words.linkW}"
          meaning: "${words.meaning}"
      }) {
          name
          category
          image
          linkW
          meaning
        }
      }
      `
    });
  }
  deleteWord(words: Words) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        deleteteWord(body: {
          name: "${words.name}"
      }) {
          name
          category
          image
          linkW
          meaning
        }
      }
      `
    });
  }
}
