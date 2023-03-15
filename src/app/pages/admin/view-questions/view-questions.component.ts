import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;
  questions: any = [];

  constructor(
    private _route: ActivatedRoute,
    private questionService: QuestionService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.paramMap.get('id');
    this.qTitle = this._route.snapshot.paramMap.get('title');
    this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Delete question
  deleteQuestion(questionId: any) {
    Swal.fire({
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, want to delete this question?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(questionId).subscribe(
          (data) => {
            this._snackBar.open('Question deleted !', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
            this.questions = this.questions.filter(
              (q: any) => q.quesId != questionId
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
