import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categories: any = [];

  constructor(
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
        this._snackBar.open('Error in loading categories from server !', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }
}
