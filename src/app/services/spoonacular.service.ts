import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { RecipeAutocomplete } from '../models/recipe-auto-complete';
import { RecipeInfo } from '../models/recipe-detail-info';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})

export class SpoonacularService {
    private apiKey: string = 'cb530852993c4f119a361653b723c3c9';
    private apiHost: string = 'api.spoonacular.com';
    private apiImage: string = 'spoonacular.com/recipeImages/'

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

    getRecipeAutoComplete(query: string, amount: number = 25): Observable<RecipeAutocomplete[]> {
        const url = `https://${this.apiHost}/recipes/autocomplete?query=${query}&number=${amount}&apiKey=${this.apiKey}`;
        return this.http.get<RecipeAutocomplete[]>(url)
    }

    getRecipe(id: number): Observable<any> {
        return this.getRequest(`/recipes/${id}/information`);
    }

    getImage(name: string): string {
        const url = `https://${this.apiImage}${name}${this.apiKey}`;
        return url;
    }

    getRequest(request: string, params?: any): Observable<any[]> {
        const url = `https://${this.apiHost}${request}`;
    
        params = {
          ...params,
          apiKey: this.apiKey,
        };
    
        const parameters = new URLSearchParams(params).toString();
        const apiUrl = `${url}?${parameters}`;
    
        return this.http.get<any[]>(apiUrl);
    }

    getRandomRecipes(amount: number): Observable<RecipeInfo[]> {
        const url = `https://${this.apiHost}/recipes/random?number=${amount}&apiKey=${this.apiKey}`;
        return this.http.get<RecipeInfo[]>(url);
    }

    searchRecipe(query: string): Observable<RecipeAutocomplete[]> {
        return this.getRecipeAutoComplete(query);
    }

    searchComplexRecipe(params: any, num: number = 100): Observable<any[]> {
        return this.getRequest('/recipes/complexSearch', {...params, number: num});
    }

    getSimilarRecipes(id: number): Observable<any> {
        const url = `https://${this.apiHost}/recipes/${id}/similar?number=3&limitLicense=false&apiKey=${this.apiKey}`;
        return this.http.get(url);
    }

    visualizeNutrition(ingredientList: string, servings: number): Observable<SafeHtml> {
        const url = `https://${this.apiHost}/recipes/visualizeNutrition`;
        const body = `ingredientList=${encodeURIComponent(ingredientList)}&servings=${servings}&defaultCss=true&showBacklink=true&language=en`;
    
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Accept', 'text/html');
    
        return this.http.post(url, body, { headers, responseType: 'text' }).pipe(
          map((response: string) => {
            return this.sanitizer.bypassSecurityTrustHtml(response);
          })
        );
    }
}