import { Injectable } from '@angular/core';
import { Speaker } from './interface';
import { Data } from '../TestData/TestData';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  speakerSubject = new BehaviorSubject<Speaker[]>(Data.speakers);

  constructor() {}

  getSpeakers() {
    this.speakerSubject.next(Data.speakers);
  }
}
