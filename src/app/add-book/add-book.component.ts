import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author, Book } from '../model/book.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { get } from 'http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  currentData: Author[];
  userForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BooksService
  ) {}
  ngOnInit(): void {
    this.setUserFormData();
    this.bookService.getBook().subscribe((val) => (this.currentData = val));
  }

  setUserFormData() {
    this.userForm = new FormGroup({
      imageUrl: new FormControl('', Validators.required),
      publishDate: new FormControl('', Validators.required),
      purchaseLink: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });
  }

  onSubmit(e: FormGroup) {
    let book: Book = {
      imageUrl: e.get('imageUrl').value,
      PublishDate: e.get('publishDate').value,
      purchaseLink: e.get('purchaseLink').value,
      title: e.get('title').value,
    };
    this.currentData[0].books.push(book);
    console.log(this.currentData);
    this.bookService.setBook(this.currentData);
    this.router.navigate(['/']);
  }
}
