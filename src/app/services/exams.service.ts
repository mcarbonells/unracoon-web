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
              userId: "${examLevel.userId}"
              level: "${examLevel.level}"
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
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createExam(body: {
            userId: "${examLevel.userId}"
            level: "${examLevel.level}"
            words: "${examLevel.words}"
            correctWords: "${examLevel.correctWords}"
            pass: "${examLevel.pass}"
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
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          updateExam(body: {
            userId: "${examLevel.userId}"
            level: "${examLevel.level}"
            words: "${examLevel.words}"
            date: "${examLevel.date}"
            correctWords: "${examLevel.correctWords}"
            pass: "${examLevel.pass}"
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
            userId: "${examLevel.userId}"
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
      query: gql`{
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
          weekQuizById() {
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
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createWeekQuiz(body: {
            idQuiz: "${weekQuiz.idQuiz}"
            words: "${weekQuiz.words}"
            active: "${weekQuiz.active}"
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
          updateWeekQuiz()
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
          deleteWeekQuiz()
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
            usedId,
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
              idQuiz: "${userQuiz.idQuiz}"
          }) {
              usedId,
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
              userId: "${userQuiz.userId}"
          }) {
              usedId,
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
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createUserQuiz(body: {
            userId: "${userQuiz.userId}"
            idQuiz: "${userQuiz.idQuiz}"
            words: "${userQuiz.words}"
            correctWords: "${userQuiz.correctWords}"
            scare: "${userQuiz.score}"
           })
           {
            usedId,
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
            userId: "${userQuiz.userId}"
            idQuiz: "${userQuiz.idQuiz}"
           })
           {
            usedId,
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


