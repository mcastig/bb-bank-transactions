import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-by',
  standalone: true,
  imports: [],
  templateUrl: './search-by.component.html',
  styleUrl: './search-by.component.css'
})
export class SearchByComponent {
  @Output() getFilterEvent = new EventEmitter<string>();

  getfilter(term: any): any {
    this.getFilterEvent.emit(term.value);
  }
}
