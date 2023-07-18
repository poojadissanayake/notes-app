import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutsComponent } from './pages/main-layouts/main-layouts.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

const routes: Routes = [
  {path: '', component: MainLayoutsComponent, children: [
    {path: '', component: NotesListComponent }, //NotesListComponent will be injected into the MainLayoutsComponent via router-outlet
    {path: ':new', component: NoteDetailsComponent}, //dynamic path 
    {path: 'update/:id', component: NoteDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
