import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LifeCycleDemoComponent } from "./life-cycle-demo/life-cycle-demo.component";

@Component({
  selector: 'app-root',
  imports: [LifeCycleDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}
