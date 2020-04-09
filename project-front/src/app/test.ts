import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from "../product";
import { PRODUCTS } from "../all-products";
import { CategoriesService } from "../categories.service";

import { Category } from '../category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category:Category;
  products:Product[];
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoriesService.getCategory(id)
      .subscribe(category => this.category = category);
  }
  getProducts(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoriesService.getProductsByCategoryIdFromAllProducts(id)
      .subscribe(products => this.products = products)
  }
  goBack(): void {
    this.location.back();
  }
  
  delete(product: Product): void {
    this.products = this.products.filter(p => p !== product);
    this.categoriesService.deleteProduct(product).subscribe();
  }
}
