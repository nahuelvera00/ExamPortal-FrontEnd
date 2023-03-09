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
      qId: Number,
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
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data', 'error');
      }
    );
  }
}
