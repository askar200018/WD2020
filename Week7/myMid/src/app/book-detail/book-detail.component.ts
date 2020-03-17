import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from "../book";
import { BooksService } from "../books.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  constructor(
    private route: ActivatedRoute,  
    private booksService: BooksService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.booksService.getBook(id)
      .subscribe(book => this.book = book);
  }

  goBack(): void {
    this.location.back();
  }

}
