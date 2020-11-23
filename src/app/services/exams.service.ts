import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {ExamLevel, WeekQuiz, UserQuiz} from '../models/exams.model';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  constructor(private apollo: Apollo) {}
  allExamLevels(){
    return this.apollo.query({
      query: gql`{
          allExamLevels {
            userId,
            level,
            words,
            date,
            correctWords,
            pass
          }
        }
      `,
    });
  }
  examById(examLevel: ExamLevel){
    return this.apollo.query({
      query: gql`{
          examById (body: {
              userId: ${examLevel.userId}
              level: ${examLevel.level}
          }) {
              userId,
              level,
              words,
              date,
              correctWords,
              pass
          }
      }
      `,
    });
  }
  createExam(examLevel: ExamLevel){
    const words = JSON.stringify(examLevel.words);
    const correctWords = JSON.stringify(examLevel.correctWords);
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createExam(body: {
            userId: ${examLevel.userId}
            level: "${examLevel.level}"
            words: ${words}
            correctWords: ${correctWords}
            pass: ${examLevel.pass}
           })
           {
            userId,
            level,
            words,
            date,
            correctWords,
            pass
          }
        }`,
    });
  }
  updateExam(examLevel: ExamLevel){
    const words = JSON.stringify(examLevel.words);
    const correctWords = JSON.stringify(examLevel.correctWords);
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          updateExam(body: {
            userId: ${examLevel.userId}
            level: ${examLevel.level}
            words: ${examLevel.words}
            date: ${examLevel.date}
            correctWords: "${examLevel.correctWords}
            pass: "${examLevel.pass}
           })
           {
            userId,
            level,
            words,
            date,
            correctWords,
            pass
          }
        }`,
    });
  }
  deleteExam(examLevel: ExamLevel){
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteExam(body: {
            userId: ${examLevel.userId}
            level: "${examLevel.level}"
           })
           {
            userId,
            level,
            words,
            date,
            correctWords,
            pass
          }
        }`,
    });
  }
  allWeekQuiz(){
    return this.apollo.query({
      query: gql`query {
          allWeekQuiz {
            idQuiz,
            words,
            date,
            active
          }
        }
      `,
    });
  }
  weekQuizById(){
    return this.apollo.query({
      query: gql`{
          weekQuizById(body:{
            active: true
          }) {
              idQuiz,
              words,
              date,
              active
          }
      }
      `,
    });
  }
  createWeekQuiz(weekQuiz: WeekQuiz){
    const words = JSON.stringify(weekQuiz.words);
    console.log(words, weekQuiz.words);
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createWeekQuiz(body: {
            idQuiz: ${weekQuiz.idQuiz}
            words: ${words}
            active: true
           })
           {
            idQuiz,
            words,
            date,
            active
          }
        }`,
    });
  }
  updateWeekQuiz(){
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          updateWeekQuiz(body:{
            active: true
          })
           {
            idQuiz,
            words,
            date,
            active
          }
        }`,
    });
  }
  deleteWeekQuiz(){
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteWeekQuiz(body:{
            active: false
          })
           {
            idQuiz,
            words,
            date,
            active
          }
        }`,
    });
  }
  allUserQuiz(){
    return this.apollo.query({
      query: gql`{
          allUserQuiz {
            userId,
            idQuiz,
            words,
            date,
            correctWords,
            score
          }
        }
      `,
    });
  }
  userQuizByIdQuiz(userQuiz: UserQuiz){
    return this.apollo.query({
      query: gql`{
          userQuizByIdQuiz (body: {
              idQuiz: ${userQuiz.idQuiz}
          }) {
              userId,
              idQuiz,
              words,
              date,
              correctWords,
              score
          }
      }
      `,
    });
  }
  userQuizByUserID(userQuiz: UserQuiz){
    return this.apollo.query({
      query: gql`{
          userQuizByUserID (body: {
              userId: ${userQuiz.userId}
          }) {
              userId,
              idQuiz,
              words,
              date,
              correctWords,
              score
          }
      }
      `,
    });
  }
  createUserQuiz(userQuiz: UserQuiz){
    const words = JSON.stringify(userQuiz.words);
    const correctWords = JSON.stringify(userQuiz.correctWords);
    console.log(words, correctWords);
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createUserQuiz(body: {
            userId: ${userQuiz.userId}
            idQuiz: ${userQuiz.idQuiz}
            words: ${words}
            correctWords: ${correctWords}
            score: ${userQuiz.score}
           })
           {
            userId,
            idQuiz,
            words,
            date,
            correctWords,
            score
          }
        }`,
    });
  }
  deleteUserQuiz(userQuiz: UserQuiz){
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteUserQuiz(body: {
            userId: ${userQuiz.userId}
            idQuiz: ${userQuiz.idQuiz}
           })
           {
            userId,
            idQuiz,
            words,
            date,
            correctWords,
            score
          }
        }`,
    });
  }
}


