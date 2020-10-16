import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ForumComponent } from './forum/forum.component';
import { ForumDetailComponent } from './forum/forum-detail/forum-detail.component';
import { ThreadFormComponent } from './forum/thread-form/thread-form.component';
import { SupportComponent } from './support/support.component';
import { ExamsComponent } from './exams/exams.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';


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
  ]
})
export class PagesModule { }