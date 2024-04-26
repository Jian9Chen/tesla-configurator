import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarModelService} from "../../services/car-model.service";
import {Car, SelectedCar} from "../../models/car.model";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {CarConfigurationService} from "../../services/car-configuration.service";

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

    private subscriptions: Subscription[] = [];

    constructor(private carModelService: CarModelService,
                private carConfigService: CarConfigurationService,
                private formBuilder: FormBuilder) {
      this.carModelForm = this.formBuilder.group({
          code: new FormControl<string | null>(null),
          color: new FormControl<string | null>(null)
        }
      );
      this.subscriptions.push(
        this.carModelForm.get('code')!.valueChanges.subscribe(
          (carCode: string) => {
            if (carCode && this.selectedCar?.code && carCode !== this.selectedCar?.code) {
              // changed car model -> invalidate selected configurations
              this.carConfigService.setSelectedConfiguration(null);
            }
            this.selectedCar = this.carModels.find(car => car.code === carCode);
            this.carModelForm.get('color')!.setValue(null);
          }
        )
      );
      this.subscriptions.push(
        this.carModelForm.get('color')!.valueChanges.subscribe(
          (colorCode: string) => {
            if (colorCode) {
              let selectedColor = this.selectedCar!.colors.find(color => color.code === colorCode);
              let selectedCar = new SelectedCar({
                code: this.selectedCar!.code,
                description: this.selectedCar!.description,
                color: selectedColor!
              })
              this.carModelService.setSelectedCar(selectedCar);
            } else {
              this.carModelService.setSelectedCar(null);
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
            this.carModelForm.get('color')?.setValue(selectedCar.color.code);
          } else {
            this.carModelForm.get('code')?.setValue(null);
          }
        }
      );
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
