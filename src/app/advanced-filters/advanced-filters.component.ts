import { Component, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FiltersList } from '../models/filters-list';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss']
})
export class AdvancedFiltersComponent implements OnInit{
  @Output() onSelect = new EventEmitter<any>();
  @Output() onClearFilters = new EventEmitter<void>();
  @ViewChildren('matRef') matRefs!: QueryList<MatSelect>;

  cuisines: string[] = FiltersList.Cuisines;
  diets: string[] = FiltersList.Diets;
  intolerances: string[] = FiltersList.Intolerances;
  types: string[] = FiltersList.MealTypes;  
  filters: { name: string, value: string[] }[] = [];
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.filters = [
      { name: "cuisine", value:[] },
      { name: "diet", value: []},
      { name: "intolerances", value: [] },
      { name: "type", value: []},
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectFilter(param: string, name: string): void {
    const index = this.filters.findIndex((f) => f.name === param);
    if (this.isSelected(param, name)) {
      this.filters[index].value = this.filters[index].value.filter(
        (v) => v !== name
      );
    } 
    else {
      this.filters[index].value.push(name);
    }
    this.onSelect.emit(this.filters);
  }

  isSelected(param: string, name: string): boolean {
    const index = this.filters.findIndex((f) => f.name === param);
    return this.filters[index].value.includes(name);
  }
  
  clean() {
    this.matRefs.forEach((matRef: MatSelect) => {
      matRef.options.forEach((option) => option.deselect());
      matRef.writeValue(null);
    });
    this.onClearFilters.emit();
  }
}
