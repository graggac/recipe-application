import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpoonacularService {
    private apiKey: string = 'cb530852993c4f119a361653b723c3c9';
    private recipesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    recipes$: Observable<any[]> = this.recipesSubject.asObservable();

    constructor(private http: HttpClient) {}

    onSearch(query: string): void {
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}`;
        const headers = new HttpHeaders().set('apiKey', this.apiKey);
        
        this.http.get(url, { headers }).subscribe((data: any) => {
            this.recipesSubject.next(data.results);
        });
    }
}