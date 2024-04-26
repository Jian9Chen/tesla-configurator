import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {Step} from "../models/step.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CarModelService} from "../services/car-model.service";
import {CarConfigurationService} from "../services/car-configuration.service";

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
export class StepperComponent implements OnInit, OnDestroy {
  steps: Step[];

  private subscriptions: Subscription[] = [];
  constructor(private carModelService: CarModelService,
              private carConfigService: CarConfigurationService,
              private router: Router) {
    this.steps = [];
    this.steps.push(
      new Step({
        route: 'choose-model',
        description: 'Step 1',
        index: 1,
        id: 'step1',
        disabled: false
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
  }

  ngOnInit() {
    this.subscriptions.push(
      this.carConfigService.getSelectedConfigurationObservable().subscribe(selectedConfig => {
        if (selectedConfig) {
          // config selected -> enable step 3
          let step3 = this.steps.find(step => step.id === "step3")!;
          step3.disabled = false;
        } else {
          // config not selected -> disable step 3
          let step2 = this.steps.find(step => step.id === "step2")!;
          this.updateSubsequentStepDisabledStatus(step2, true);
        }
      })
    );
    this.subscriptions.push(
      this.carModelService.getSelectedCarObservable().subscribe(selectedModel => {
        if (selectedModel) {
          // car model selected -> enable step 2
          let step2 = this.steps.find(step => step.id === "step2")!;
          step2.disabled = false;
          if (this.carConfigService.getSelectedConfigurationValue()) {
            // config selected -> enable step 3
            let step3 = this.steps.find(step => step.id === "step3")!;
            step3.disabled = false;
          }
        } else {
          // model not selected -> disable step 2, step 3
          let step1 = this.steps.find(step => step.id === "step1")!;
          this.updateSubsequentStepDisabledStatus(step1, true);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  changeStep(selectedStep: Step) {
    this.router.navigate([selectedStep.route]);
  }

  private updateSubsequentStepDisabledStatus(checkStep: Step, disabled: boolean) {
    this.steps.forEach(step => {
      if (step.index > checkStep.index) {
        step.disabled = disabled;
      }
    });
  }

}
