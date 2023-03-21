import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid: any;
  questions: any;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;

  isSubmit = false;

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

        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
        console.log(this.questions);
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

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit quiz',
      icon: 'question',
    }).then((response) => {
      if (response.isConfirmed) {
        this.isSubmit = true;

        //calculate
        this.questions.forEach((q: any) => {
          if (q.givenAnswer == q.answer) {
            this.correctAnswer++;
            let markSingle =
              this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += markSingle;
          }

          if (q.givenAnswer.trim() != '') {
            this.attempted++;
          }

          console.log('Correct answers: ' + this.correctAnswer);
          console.log('Marks got ' + this.marksGot);
        });
      }
    });
  }
}
