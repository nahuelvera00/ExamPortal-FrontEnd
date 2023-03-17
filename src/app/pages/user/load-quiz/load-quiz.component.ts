import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  catId: any;
  quizzes: any = [];

  constructor(
    private _router: ActivatedRoute,
    private _quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.catId = this._router.snapshot.paramMap.get('catId');

    this._router.params.subscribe((params) => {
      this.catId = params['catId'];

      if (this.catId == 0) {
        console.log('Quizzes loading');
        this._quizService.getQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this._quizService.getQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error) => {
            alert('Error');
          }
        );
      }
    });
  }
}
