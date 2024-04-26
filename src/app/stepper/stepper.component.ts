import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {Step} from "../models/step.model";
import {StepperService} from "../services/stepper.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnDestroy {
  currentStep?: Step;
  steps: Step[];

  private subscriptions: Subscription[] = [];
  constructor(private stepperService: StepperService,
              private router: Router) {
    this.steps = [];
    this.steps.push(
      new Step({
        route: 'choose-model',
        description: 'Step 1',
        index: 1,
        id: 'step1',
        disabled: true
      }),
      new Step({
        route: 'choose-options',
        description: 'Step 2',
        index: 2,
        id: 'step2',
        disabled: true
      }),
      new Step({
        route: 'summary',
        description: 'Step 3',
        index: 3,
        id: 'step3',
        disabled: true
      })
    );

    this.subscriptions.push(
      this.stepperService.getCurrentStepIdObservable().subscribe(
        stepId => this.currentStep = this.steps.find(step => step.id === stepId)
      )
    );

    this.subscriptions.push(
      this.stepperService.getCurrentStepCompleted().subscribe(
        // completion is computed inside each page after the navigation
        completed => {
          if (completed) {
            this.steps.forEach(step => {
              // enable the next step and the previously completed
              if (this.currentStep && (step.index - 1) <= this.currentStep.index) {
                step.disabled = false;
              } else {
                step.disabled = true;
              }
            })
          } else {
            this.steps.forEach(step => {
              // enable the previously completed
              if (this.currentStep && step.index <= this.currentStep.index) {
                step.disabled = false;
              } else {
                step.disabled = true;
              }
            })
          }
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  changeStep(selectedStep: Step) {
    this.router.navigate([selectedStep.route]);
  }

}
