import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qid: Number,
      title: String,
      description: String,
      maxMarks: String,
      numberOfQuestions: String,
      active: '',
      category: {
        cid: Number,
        title: String,
        describe: String,
      },
    },
  ];

  constructor(private _quizService: QuizService) {}

  ngOnInit(): void {
    this._quizService.getQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data', 'error');
      }
    );
  }

  //Delete quiz
  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete
        this._quizService.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qId);
            Swal.fire('Success!', 'Quiz deleted', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Error in deleting quiz', 'error');
            console.log(error);
          }
        );
      }
    });
  }
}
