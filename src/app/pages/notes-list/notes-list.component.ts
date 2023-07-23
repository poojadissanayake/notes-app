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
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    // retrieve all notes from NotesService
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notes;

  }

  deleteNote(id: number) {
    this.notesService.delete(id);
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.filter(value);
  }

  filter(query: string) {
    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();

    // split up the search query into individual words
    let terms: string[] = query.split(' '); //split on spaces

    // remove duplicate search terms
    terms = this.removeDuplicates(terms);

    // compile all relevant results into the allResults array
    terms.forEach(term => {
      let results : Note[] = this.relevantNotes(term);

      // append results to the allResults array
      // array deconstruction in javascript
      // merge two arrays
      allResults = [...allResults, ...results]
    });

    // allResults will include duplicate notes - a particullar note can be the result of many search terms 
    // but we don't wont to show the same note multiple times on the UI - so 1st we must remove the duplicates

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDuplicates(arr: Array<any>) : Array<any> {
    let uniqueResults: Set<any> = new Set<any>();

    // loop through the input array and add the items to the set
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if(note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if(note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })
    return relevantNotes;
  }

}
