import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

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
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.paramMap.get('id');
    this.qTitle = this._route.snapshot.paramMap.get('title');
    this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
