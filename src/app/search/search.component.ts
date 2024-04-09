import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SpoonacularService } from '../services/spoonacular.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RecipeAutocomplete } from '../models/recipe-auto-complete';
import { FloatLabelType } from '@angular/material/form-field';
import { DOCUMENT } from '@angular/common';
import { RecipeCardInfo } from '../models/recipe-card-info';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  @Output() searchEvent = new EventEmitter<RecipeCardInfo>();
  recipeAutoComplete: FormControl = new FormControl();
  recipeAutoComplete$!: Observable<RecipeAutocomplete[]>;

  constructor( @Inject(DOCUMENT) private document: Document,private spoonacularService: SpoonacularService, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.onAutoCompleteValueChange();
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  }

  recipeDisplay(recipe: RecipeAutocomplete): string {
    return recipe && recipe.title;
  }

  onRecipeSelect(event: MatAutocompleteSelectedEvent): void {
    const selectedRecipe: RecipeAutocomplete = event.option.value;
    this.spoonacularService.getRecipe(selectedRecipe.id).subscribe(recipeInfo => {
      const recipeCardInfo: RecipeCardInfo = {
        id: recipeInfo.id,
        title: recipeInfo.title,
        image: recipeInfo.image,
        readyInMinutes: recipeInfo.readyInMinutes
      };
      this.searchEvent.emit(recipeCardInfo);
    });
  }

  private onAutoCompleteValueChange(): void {
    this.recipeAutoComplete$ = this.recipeAutoComplete.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap((val) => this.spoonacularService.searchRecipe(val))
    );
  }

  onEnterPressed(): void {
    this.searchEvent.emit(this.recipeAutoComplete.value);
  }
}
