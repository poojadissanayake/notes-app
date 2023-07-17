import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {

  @Input ('title') title! : string;
  // when the input name of the binding property and property name is same we can clean up the code by,
  //  removing the binding property name 
  @Input () body! : string;

//   'truncator' in the 'NoteCardComponent' class does not have an 
// initializer in the constructor and is not definitely assigned a value before it is used.
// In TypeScript, when you declare a property in a class, you need to either 
// provide an initializer (a default value) or assign a value to it in the constructor. 
// This ensures that the property is initialized before it is accessed or used in any other part of the class.
// To resolve the error, you have a few options:

// * Disable strictPropertyInitialization flag:

// The simple way to fix this error in Angular applications is 
// to disable --strictPropertyInitialization flag in typescript compiler options in 'tsconfig.json' file.

// "compilerOptions": {
//   ///
//   ,
//   "strictPropertyInitialization":false
// }


  // 1. Provide an initializer for the 'truncator' property:
  //       truncator: ElementRef<HTMLElement> = new ElementRef<HTMLElement>(null); --> doesn't work for HTMLElements
  // error message "Argument of type 'null' is not assignable to parameter of type 'HTMLElement'" 
  // typically occurs when you're trying to assign a value of null to a variable or parameter that is expected to be of type HTMLElement

  // fix:   @ViewChild('truncator', { static: true }) truncator! : ElementRef<HTMLElement>;

  //         ngAfterViewInit() {
  //           // Access the native element
  //           const truncator: HTMLElement = this.truncator.nativeElement;
  //         }

  // 2. Assign a value to 'truncator' in the constructor:
  //       constructor(private elementRef: ElementRef<HTMLElement>) {
  //         this.truncator = elementRef;
  //       }

  // 3. Use the "definite assignment assertion" syntax to tell TypeScript 
  //     that you will assign a value to 'truncator' before it is used:
  //       truncator!: ElementRef<HTMLElement>;

  //       Note that this approach should only be used if you are sure that you 
  //       will assign a value to 'truncator' before accessing it.



  // The @ViewChild('truncator', { static: true }) decorator is applied to the truncator property. 
  // It instructs Angular to search for the element with the template reference variable #truncator in the component's template.
  // The 'truncator' property is of type ElementRef<HTMLElement>, which represents a reference to an HTML element.
  //  The ! non-null assertion operator is used to tell TypeScript that we guarantee that 'truncator' will be initialized during the component's lifecycle.

  @ViewChild('truncator', { static: true }) truncator! : ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true }) bodyText! : ElementRef<HTMLElement>;


  // The ngAfterViewInit() method is an Angular lifecycle hook that is called after the view and its child views have been initialized.
  //  It is the appropriate place to access the nativeElement property of 'truncator'.

  ngAfterViewInit() {

    // Inside the ngAfterViewInit() method, this.truncator.nativeElement is assigned to the truncator variable. 
    // The nativeElement property provides direct access to the underlying HTML element that the ElementRef references.

    // Access the native element
    const truncator: HTMLElement = this.truncator.nativeElement;
    const bodyText: HTMLElement = this.bodyText.nativeElement;
  }

  constructor(
    // private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2

    ) {}

//  'ngOnInit' is a lifecycle hook that is called after the component is initialized and its properties have been set.
//  It is commonly used to perform initialization tasks or to fetch data from a server.

  ngOnInit() {

    // work out if there's text overflow and if so, show the truncator otherwise hide the truncator

    // retrieves the computed style of the bodyText element using 'window.getComputedStyle'. 
    // This provides access to the CSS properties of the element.

    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
   
    // extracts the viewable height of the element from the computed style by getting the value of the "height" CSS property 
    // and parsing it as an integer

    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    // compares the scroll height of the bodyText element (the total height of the content, including the overflow) with the viewable height. 
    // If the scroll height is greater than the viewable height, it means there is text overflow.

    if(this.bodyText.nativeElement.scrollHeight > viewableHeight) {

      // if there's a text overflow, show the fade out truncator 

      // If there is text overflow, it sets the display style of the truncator element to "block" using 'renderer.setStyle'.
      // This will make the truncator visible.

      console.log("if");
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');

    } else {  

      // else (if there's no text overflow), hide the fade out truncator

      // If there is no text overflow, it sets the display style of the truncator element to "none" using 'renderer.setStyle'. 
      // This will hide the truncator.

      console.log("else");
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }
  


}
