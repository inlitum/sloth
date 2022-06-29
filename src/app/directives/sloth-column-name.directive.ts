import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[slothColumnName]'
})
export class SlothColumnNameDirective implements AfterViewInit {

  @Input () slothColumnName = ''; 

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
  
  ngAfterViewInit(): void {
    console.log('sasd')
    console.log(this.slothColumnName)

  }

  

}
