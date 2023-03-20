import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  //Get all questions
  public getQuestionsOfQuiz(qId: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }

  public getQuestionsOfQuizForTest(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  //Delete question
  public deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }
}
