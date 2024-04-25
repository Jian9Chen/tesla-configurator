import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Car, SelectedCar} from "../models/car.model";

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  private selectedCarSubject: BehaviorSubject<SelectedCar | null> = new BehaviorSubject<SelectedCar | null>(null);

  constructor(private httpClient: HttpClient) { }

  getSelectedCarObservable() {
    return this.selectedCarSubject.asObservable();
  }

  getSelectedCarValue() {
    return this.selectedCarSubject.value;
  }

  setSelectedCar(newSelectedCar: SelectedCar | null) {
    console.log(newSelectedCar)
    this.selectedCarSubject.next(newSelectedCar);
  }

  getAllModels() {
    return this.httpClient.get<Car[]>("http://localhost:4200/models");
  }

}
