import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarConfigurationService} from "../../services/car-configuration.service";
import {Subscription} from "rxjs";
import {CarModelService} from "../../services/car-model.service";
import {SelectedCar} from "../../models/car.model";
import {CarConfiguration, ConfigurationDetail, SelectedCarConfiguration} from "../../models/car.configuration.model";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent implements OnInit, OnDestroy{
  configForm: FormGroup;
  availableConfiguration?: CarConfiguration;
  selectedConfigDetail?: ConfigurationDetail | null;

  private selectedCarModel: SelectedCar;
  private subscriptions: Subscription[] = [];

  constructor(private carConfigurationService: CarConfigurationService,
              private carModelService: CarModelService,
              private formBuilder: FormBuilder) {
    this.selectedCarModel = this.carModelService.getSelectedCarValue()!;
    this.configForm = this.formBuilder.group({
      id: new FormControl<number | null>(null),
    });
    this.subscriptions.push(
      this.configForm.get('id')!.valueChanges.subscribe(
        (id: number) => {
          this.selectedConfigDetail = this.availableConfiguration!.configs.find(config => config.id == id);
          this.updateSubject();
        }
      )
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.carConfigurationService.getAvailableConfigurations(this.selectedCarModel.code).subscribe(
        configurations => {
          this.availableConfiguration = configurations;
          if (configurations.towHitch) {
            this.configForm.addControl('towHitch', new FormControl<boolean>(false));
            this.subscriptions.push(
              this.configForm.get('towHitch')!.valueChanges.subscribe(
                (towHitch: boolean) => {
                  this.updateSubject();
                }
              )
            );
          }
          if (configurations.yoke) {
            this.configForm.addControl('yoke', new FormControl<boolean>(false));
            this.subscriptions.push(
              this.configForm.get('yoke')!.valueChanges.subscribe(
                (yoke: boolean) => {
                  this.updateSubject();
                }
              )
            );
          }
          let configDetail = this.carConfigurationService.getSelectedConfigurationValue();
          if (configDetail) {
            this.selectedConfigDetail = configDetail.config;
            this.configForm.get('id')?.setValue(configDetail.config.id, {emitEvent: false});
            this.configForm.get('towHitch')?.setValue(configDetail.towHitch, {emitEvent: false});
            this.configForm.get('yoke')?.setValue(configDetail.yoke, {emitEvent: false});
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  /**
   * update the subject inside CarConfigurationService
   * @private
   */
  private updateSubject() {
    let towHitch: boolean | undefined = this.configForm.get('towHitch')?.value ?? undefined;
    let yoke: boolean | undefined = this.configForm.get('yoke')?.value ?? undefined;
    let configuration: SelectedCarConfiguration = new SelectedCarConfiguration({
      config: this.selectedConfigDetail!,
      towHitch: towHitch,
      yoke: yoke
    })
    this.carConfigurationService.setSelectedConfiguration(configuration);
  }

}
