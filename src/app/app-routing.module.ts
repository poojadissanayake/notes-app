import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutsComponent } from './pages/main-layouts/main-layouts.component';

const routes: Routes = [
  {path: '', component: MainLayoutsComponent, children: [
    {path: '', component: NotesListComponent } //NotesListComponent will be injected into the MainLayoutsComponent via router-outlet
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
