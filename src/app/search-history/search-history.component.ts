import { Component, EventEmitter, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SpoonacularService } from '../services/spoonacular.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  @Output() searchEvent = new EventEmitter<string>();
  searches: string[] = [];
  query: string = '';

  constructor(
    private spoonacularService: SpoonacularService) {}

  showPreviousSearches(event: any) {
    this.spoonacularService.onSearch(this.query);
    if (this.query) {
      this.searches.push(this.query);
      event.target.value = '';
      this.searchEvent.emit(this.query);
    }
  }
}
