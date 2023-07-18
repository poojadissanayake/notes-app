import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent {

  note! : Note;
  noteId! : number;
  newNote!: boolean;

  constructor( 
    private notesService: NotesService, 
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {

    // check if we are creating a new note or editing an existing one
    
    this.route.params.subscribe((params: Params) => {
      this.note = new Note();
      
      if (params['id']) {
        this.note = this.notesService.get(params['id']);
        this.noteId = params['id'];
        this.newNote = false;
        console.log(this.noteId);
      } else {
        this.newNote = true;
      }
    });
        
  }

  onSubmit(form : NgForm) {

    if(this.newNote) {
      // save the note 
      this.notesService.add(form.value);
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.title);
    }
    this.router.navigateByUrl('/');
    
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}