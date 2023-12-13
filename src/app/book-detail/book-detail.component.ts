import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Author } from '../model/book.model';
import { Observable, of, switchMap, take } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  constructor(private bookService: BooksService) {}
  public data = [];
  ngOnInit(): void {
    this.bookService
      .getBook()
      .pipe(
        switchMap((val) => {
          console.log(val);

          if (val === null) {
            console.log('if');
            return this.bookService.fetchBooks();
          } else {
            console.log('else');
            return of(val);
          }
        })
      )
      .pipe(take(1))
      .subscribe((result) => {
        if (result != null) {
          this.data = result;
          this.bookService.setBook(result);
        }
      });
  }
}
