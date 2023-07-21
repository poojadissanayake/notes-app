import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // ENTRY ANIMATION
      // "void => *" animation goes from none existing in the dom to any state
      transition('void => *',[
        // Initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          // Have to expand out the padding properties due to a bug in firefox
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0
        }),
        // 1st - animate the spacing (which includes height and margin)
        animate('50ms', style({
          height: '*', //wild card to say the height of the element
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*'
        })),
        animate(200)
      ]),
      transition('* => void',[
        // first scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        // then scale back down to the normal size while beginning to fade out
        animate(50,style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        // scale down and fade out completely
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity:0
        })),
        // then animate the spacing (which include height, margin and padding)
        animate('150ms ease-out', style({
           height: 0,
           paddingTop: 0,
           paddingBottom: 0,
           paddingRight: 0,
           paddingLeft: 0,
           'margin-bottom': '0',
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          // staggering so that the animations of the tiles are occuring one after the other
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent {

  notes: Note[] = new Array<Note>(); 

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    // retrieve all notes from NotesService
    this.notes = this.notesService.getAll();

  }

  deleteNote(id: number) {
    this.notesService.delete(id);
  }

}
