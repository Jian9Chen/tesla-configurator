import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {StepperComponent} from "./stepper/stepper.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, StepperComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'tesla-configurator';
}
