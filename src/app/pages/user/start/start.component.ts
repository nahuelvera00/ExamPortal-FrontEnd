import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid: any;
  questions: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();

    this.qid = this._route.snapshot.paramMap.get('qid');
    this.loadQuestions();
  }
  loadQuestions() {
    this._questionService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
}
