import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.quizId = this._route.snapshot.paramMap.get('qid');
    this.quizTitle = this._route.snapshot.paramMap.get('title');

    console.log(this.quizId);
    this.question.quiz['qid'] = this.quizId;
  }
}
