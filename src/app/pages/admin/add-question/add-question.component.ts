import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  quizId: any;
  quizTitle: any;

  question: any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private _questionService: QuestionService,
    private _quizService: QuizService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.quizId = this._route.snapshot.paramMap.get('qid');
    this.quizTitle = this._route.snapshot.paramMap.get('title');

    console.log(this.quizId);
    this.question.quiz['qid'] = this.quizId;
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snackBar.open('Invalid content field !!', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }
    if (
      [
        this.question.option1,
        this.question.option2,
        this.question.option3,
        this.question.option4,
      ].includes('') ||
      [
        this.question.option1,
        this.question.option2,
        this.question.option3,
        this.question.option4,
      ].includes(null)
    ) {
      this._snackBar.open('Invalid option field !!', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    if (this.question.answer == '' || this.question.answer == null) {
      this._snackBar.open('Select answer invalid !!', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    //form submit
    this._questionService.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Success!!', 'Question Added', 'success').then((result) => {
          if (result.isConfirmed) {
            //REset Form
            this.question.content = '';
            this.question.option1 = '';
            this.question.option2 = '';
            this.question.option3 = '';
            this.question.option4 = '';
            this.question.answer = '';

            //Redirect
            this.router.navigate([
              '/admin/view-questions/' + this.quizId + '/' + this.quizTitle,
            ]);
          }
        });
      },
      (error) => {
        Swal.fire('Error', 'something went wrong!!', 'error');
      }
    );
  }
}
