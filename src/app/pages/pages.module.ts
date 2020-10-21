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
<<<<<<< HEAD
import {WeekQuizComponent} from './exams/weekQuiz/weekQuiz.component';
import {WeekQuizFormComponent} from './exams/weekQuiz/weekQuiz-form/weekQuiz-form.component';
=======
import { CategoryComponent } from './vocabulary/category/category.component';
import { WordsComponent } from './vocabulary/words/words.component';

>>>>>>> master

@NgModule({
  declarations: [
    PagesComponent,
    PerfilComponent,
    ForumComponent,
    ForumDetailComponent,
    ThreadFormComponent,
    SupportComponent,
    ExamsComponent,
    VocabularyComponent,
<<<<<<< HEAD
    WeekQuizComponent,
    WeekQuizFormComponent
=======
    CategoryComponent,
    WordsComponent,
>>>>>>> master
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
