import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private _categoryService: CategoryService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title is required !!', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    //All done
    this._categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Success !!', 'Category is added successfuly', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Serve error', 'error');
      }
    );
  }
}
