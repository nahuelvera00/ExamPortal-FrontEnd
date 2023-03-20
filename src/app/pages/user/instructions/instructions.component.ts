import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  qid: any;
  quiz: any;

  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.paramMap.get('qid');

    this._quizService.getQuiz(this.qid).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
