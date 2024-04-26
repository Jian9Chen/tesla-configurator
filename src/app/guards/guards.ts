import {ActivatedRouteSnapshot, CanActivateFn, createUrlTreeFromSnapshot, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {CarModelService} from "../services/car-model.service";
import {CarConfigurationService} from "../services/car-configuration.service";

export const canActivateCarConfiguration : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const carModelService = inject(CarModelService);
  return carModelService.getSelectedCarValue() !== null ? true : createUrlTreeFromSnapshot(route, ["../choose-model"]);
}

export const canActivateSummary : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const carModelService = inject(CarModelService);
  const carConfigService = inject(CarConfigurationService);
  return carModelService.getSelectedCarValue() !== null && carConfigService.getSelectedConfigurationValue() !== null ? true : createUrlTreeFromSnapshot(route, ["../choose-model"]);
}
