import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ForumComponent } from './forum/forum.component';
import { ForumDetailComponent } from './forum/forum-detail/forum-detail.component';
import { ThreadFormComponent } from './forum/thread-form/thread-form.component';
import { SupportComponent } from './support/support.component';
import { ExamsComponent } from './exams/exams.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { CategoryComponent } from './vocabulary/category/category.component';
import { WordsComponent } from './vocabulary/words/words.component';
import { WeekQuizComponent} from './exams/weekQuiz/weekQuiz.component';
import { UserQUizComponent} from './exams/userQuiz/userQuiz.component';
import { UserQuizFormComponent} from './exams/userQuiz/userQuiz-form/userQuiz-form.component';
import { LevelsComponent } from './levels/levels.component';
import {ExamsLevelComponent} from './exams/examsLevel/examsLevel.component';

@NgModule({
  declarations: [
    PagesComponent,
    PerfilComponent,
    ForumComponent,
    ForumDetailComponent,
    ThreadFormComponent,
    SupportComponent,
    ExamsComponent,
    ExamsLevelComponent,
    VocabularyComponent,
    WeekQuizComponent,
    UserQUizComponent,
    UserQuizFormComponent,
    CategoryComponent,
    WordsComponent,
    LevelsComponent
  ],
  exports: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class PagesModule { }
