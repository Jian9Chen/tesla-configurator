import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CarConfiguration, SelectedCarConfiguration} from "../models/car.configuration.model";

@Injectable({
  providedIn: 'root'
})
export class CarConfigurationService {

  private selectedConfigurationSubject: BehaviorSubject<SelectedCarConfiguration | null> = new BehaviorSubject<SelectedCarConfiguration | null>(null);
  constructor(private httpClient: HttpClient) { }

  getSelectedConfigurationValue() {
    return this.selectedConfigurationSubject.value;
  }

  setSelectedConfiguration(configuration: SelectedCarConfiguration | null) {
    this.selectedConfigurationSubject.next(configuration);
  }
  getAvailableConfigurations(modelCode: string) {
    return this.httpClient.get<CarConfiguration>(`http://localhost:4200/options/${modelCode}`);
  }
}
