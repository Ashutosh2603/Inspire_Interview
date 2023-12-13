import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Author } from '../model/book.model';
import { API_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books$ = new BehaviorSubject<Author[]>(null);
  constructor(private http: HttpClient) {
    // this.fetchBooks().subscribe((val) => this.books$.next(val));
  }

  setBook(val) {
    this.books$.next(val);
  }

  getBook() {
    return this.books$.asObservable();
  }

  fetchBooks(): Observable<Author[]> {
    return this.http.get(API_URL).pipe(map((val) => [val['data']]));
  }
}
