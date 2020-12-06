// External Modules
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guards
import { AuthGuard } from '../guards/auth.guard';

// Componentes
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ForumComponent } from './forum/forum.component';
import { SupportComponent } from './support/support.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { CategoryComponent } from './vocabulary/category/category.component';
import { WordsComponent } from './vocabulary/words/words.component';
import { ExamsComponent } from './exams/exams.component';
import { WeekQuizComponent } from './exams/weekQuiz/weekQuiz.component';
import { UserQuizComponent } from './exams/userQuiz/userQuiz.component';
import { UserQuizFormComponent } from './exams/userQuiz/userQuiz-form/userQuiz-form.component';
import { LevelsComponent } from './levels/levels.component';
import {ExamsLevelComponent} from './exams/examsLevel/examsLevel.component';

const routes: Routes = [
    {
        path: 'learn',
        component: PagesComponent,
        children: [
            { path: '', component: PerfilComponent, data: { titulo: 'Perfil' } },
            { path: 'foro', component: ForumComponent, data: { titulo: 'Foro' } },
            { path: 'support', component: SupportComponent, data: { titulo: 'Soporte' } },
            { path: 'vocabulary', component: VocabularyComponent, data: { titulo: 'Vocabulario' } },
            { path: 'vocabulary/category', component: CategoryComponent, data: { titulo: 'Vocabulario' } },
            { path: 'vocabulary/words', component: WordsComponent, data: { titulo: 'Vocabulario' } },
            { path: 'exam', component: ExamsComponent, data: { titulo: 'Examenes' } },
            { path: 'exam/examLevel', component: ExamsLevelComponent, data: { titulo: 'Examenes' } },
            { path: 'weekQuiz', component: WeekQuizComponent, data: {titulo: 'WeekQuiz'}},
            { path: 'userQuizzes', component: UserQuizComponent, data: {titulo: 'UserQuiz'}},
            { path: 'weekQuiz/quiz', component: UserQuizFormComponent, data: {titulo: 'UserQuiz'}},
            { path: 'levels', component: LevelsComponent, data: {titulo: 'Niveles'}}
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


