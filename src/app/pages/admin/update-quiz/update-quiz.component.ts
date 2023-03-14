import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService,
    private _categoryService: CategoryService,
    private router: Router
  ) {}

  qId: any;
  quiz: any;
  categories: any = [];

  ngOnInit(): void {
    this.qId = this._route.snapshot.paramMap.get('qId');
    this._quizService.getQuiz(this.qId).subscribe(
      (data) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );

    this._categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //update form submit
  public updateData() {
    //Validate data

    this._quizService.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Updated !!', 'Quiz updated', 'success').then((e) => {
          this.router.navigate(['/admin/quizzes']);
        });
      },
      (error) => {
        Swal.fire('Error', 'Error in updating quiz', 'error');
        console.log(error);
      }
    );
  }
}
