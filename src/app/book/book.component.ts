import { Component, Input, OnInit } from '@angular/core';
import { Author, Book } from '../model/book.model';
import { log } from 'console';
import { BooksService } from '../services/books.service';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() bookData: Book[];
  @Input() author: string;
  @Input() sortCriteria: string;
  currentAuthorData: Author[];
  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.bookService
      .getBook()
      .subscribe((val) => (this.currentAuthorData = val));
    console.log('book comp', this.currentAuthorData, this.bookData);
  }
  onEdit(book) {
    console.log(book);
  }

  onAdd() {
    this.router.navigate(['create']);
  }
  onSortChange(e) {
    if (e.target.value === 'title') {
      this.currentAuthorData.map((ele) =>
        ele.books.sort((a, b) => a.title.localeCompare(b.title))
      );
      this.bookService.setBook(this.currentAuthorData);
    }
    if (e.target.value == 'date') {
      this.currentAuthorData.map((ele) =>
        ele.books.sort((a, b) => +a.PublishDate - +b.PublishDate)
      );

      this.bookService.setBook(this.currentAuthorData);
    }
  }
  onDelete(book) {
    let newBookList = this.bookData.filter(
      (val) => val.imageUrl !== book.imageUrl
    );
    this.currentAuthorData.map((ele) => {
      if (ele.author === this.author) {
        ele.books = newBookList;
      }
    });
    this.bookService.setBook(this.currentAuthorData);
    console.log(this.currentAuthorData);
  }
}
