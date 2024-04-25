import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private currentStepId: Subject<string> = new Subject<string>();
  private currentStepCompleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getCurrentStepIdObservable() {
    return this.currentStepId.asObservable();
  }

  setCurrentStepId(stepId: string) {
    this.currentStepId.next(stepId);
  }

  setCurrentStepCompleted(stepCompleted: boolean) {
    this.currentStepCompleted.next(stepCompleted);
  }

  getCurrentStepCompleted() {
    return this.currentStepCompleted.asObservable();
  }
}
