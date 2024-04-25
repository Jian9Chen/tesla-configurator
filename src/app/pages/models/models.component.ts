import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarModelService} from "../../services/car-model.service";
import {Car, SelectedCar} from "../../models/car.model";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription, switchMap, tap} from "rxjs";
import {StepperService} from "../../services/stepper.service";

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss'
})
export class ModelsComponent implements OnInit, OnDestroy {
    carModels: Car[] = [];
    carModelForm: FormGroup;

    selectedCar?: Car;
    carImagePath?: string | null;

    private subscriptions: Subscription[] = [];
    private readonly imageBasePath: string = "https://interstate21.com/tesla-app/images/";

    constructor(private carModelService: CarModelService,
                private stepperService: StepperService,
                private formBuilder: FormBuilder) {
      this.carModelForm = this.formBuilder.group({
          code: new FormControl<string | null>(null),
          color: new FormControl<string | null>(null)
        }
      );
      this.subscriptions.push(
        this.carModelForm.get('code')!.valueChanges.subscribe(
          carCode => {
            this.selectedCar = this.carModels.find(car => car.code === carCode);
            this.carModelForm.get('color')!.setValue(null);
          }
        )
      );
      this.subscriptions.push(
        this.carModelForm.get('color')!.valueChanges.subscribe(
          colorCode => {
            if (colorCode) {
              let selectedColor = this.selectedCar!.colors.find(color => color.code === colorCode);
              let selectedCar = new SelectedCar({
                code: this.selectedCar!.code,
                description: this.selectedCar!.description,
                color: selectedColor!
              })
              this.carModelService.setSelectedCar(selectedCar);
              this.carImagePath = `${this.imageBasePath}${selectedCar.code}/${selectedCar.color.code}.jpg`;
              this.stepperService.setCurrentStepCompleted(true);
            } else {
              this.carImagePath = null;
              this.carModelService.setSelectedCar(null);
              this.stepperService.setCurrentStepCompleted(false);
            }
          }
        )
      );
    }

    ngOnInit() {
      this.carModelService.getAllModels().subscribe(
        cars => {
          this.carModels = cars;
          // handle the case return back from next steps
          let selectedCar = this.carModelService.getSelectedCarValue();
          if (selectedCar) {
            this.carModelForm.get('code')?.setValue(selectedCar.code);
            this.carModelForm.get('color')?.setValue(selectedCar.color);
          } else {
            this.carModelForm.get('code')?.setValue(null);
          }
        }
      );
      this.stepperService.setCurrentStepId('step1');
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
