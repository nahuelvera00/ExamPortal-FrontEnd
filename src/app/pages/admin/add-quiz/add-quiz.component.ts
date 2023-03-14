import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories = [
    {
      cid: Number,
      title: String,
    },
  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: null,
    },
  };

  obj = {};

  constructor(
    private router: Router,
    private _categoryService: CategoryService,
    private _quizSerice: QuizService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(
      (data: any) => {
        //categories load
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error!', 'Error loading categories', 'error');
        console.log(error);
      }
    );
  }

  //Add quiz
  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snackBar.open('Invalid, title is Required!! Try again', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }
    //Valitadion
    if (
      this.quizData.category.cid == null ||
      this.quizData.category == this.obj
    ) {
      this._snackBar.open('Invalid, category is Required!! Try again', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    //call server
    this._quizSerice.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success !', 'Quiz is added', 'success').then((result) => {
          if (result.isConfirmed) {
            //Reset form
            this.quizData = {
              title: '',
              description: '',
              maxMarks: '',
              numberOfQuestions: '',
              active: true,
              category: {
                cid: null,
              },
            };
            //Redirect
            this.router.navigate(['/admin/quizzes']);
          }
        });
      },
      (error) => {
        Swal.fire('Error !!', 'Error while adding quiz', 'error');
        console.log(error);
      }
    );
  }
}
