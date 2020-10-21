import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { ForumComponent } from './forum/forum.component';
import { SupportComponent } from './support/support.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { CategoryComponent } from './vocabulary/category/category.component';
import { WordsComponent } from './vocabulary/words/words.component';
import { ExamsComponent } from './exams/exams.component';
import {WeekQuizComponent} from './exams/weekQuiz/weekQuiz.component';
import {UserQUizComponent} from './exams/userQuiz/userQuiz.component';
import {UserQuizFormComponent} from './exams/userQuiz/userQuiz-form/userQuiz-form.component';

const routes: Routes = [
    {
        path: 'learn',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PerfilComponent, data: { titulo: 'Perfil' } },
            { path: 'foro', component: ForumComponent, data: { titulo: 'Foro' } },
            { path: 'support', component: SupportComponent, data: { titulo: 'Soporte' } },
            { path: 'vocabulary', component: VocabularyComponent, data: { titulo: 'Vocabulario' } },
            { path: 'vocabulary/category', component: CategoryComponent, data: { titulo: 'Vocabulario' } },
            { path: 'vocabulary/words', component: WordsComponent, data: { titulo: 'Vocabulario' } },
            { path: 'exam', component: ExamsComponent, data: { titulo: 'Examenes' } },
            {path: 'weekQuiz', component: WeekQuizComponent, data: {titulo: 'WeekQuiz'}},
            {path: 'userQuizzes', component: UserQUizComponent, data: {titulo: 'UserQuiz'}},
            {path: 'weekQuiz/quiz', component: UserQuizFormComponent, data: {titulo: 'UserQuiz'}}
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


