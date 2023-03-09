import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories = [
    {
      cid: Number,
      title: String,
      description: String,
    },
  ];

  constructor(private _categoriesService: CategoryService) {}

  ngOnInit(): void {
    this._categoriesService.getAllCategories().subscribe(
      (data: any) => {
        //css
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in loading data', 'error');
      }
    );
  }
}
