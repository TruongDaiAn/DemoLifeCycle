import { Component, Input, OnInit, OnChanges, AfterContentInit, 
  AfterViewInit, AfterContentChecked, AfterViewChecked, OnDestroy, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lifecycle-demo',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="lifecycle-container">
      <h2>Lifecycle Hooks Visualizer</h2>
      
      <div class="hook-card" *ngFor="let event of lifecycleEvents">
        <div class="hook-header">{{event.name}}</div>
        <div class="hook-body">
          <div>Timestamp: {{event.timestamp | date:'HH:mm:ss.SSS'}}</div>
          <div *ngIf="event.changes">Changes: {{event.changes | json}}</div>
        </div>
      </div>

      <div class="input-control">
        <label>Input Value: </label>
        <input [(ngModel)]="inputValue" placeholder="Change to trigger ngOnChanges">
      </div>
    </div>
  `,
  styles: [`
    .lifecycle-container {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .hook-card {
      margin: 10px 0;
      padding: 10px;
      border-left: 4px solid #4285f4;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .hook-header {
      font-weight: bold;
      color: #4285f4;
      margin-bottom: 5px;
    }
    .hook-body {
      font-size: 14px;
    }
    .input-control {
      margin-top: 20px;
      padding: 10px;
      background-color: #e8f0fe;
      border-radius: 4px;
    }
  `]
})
export class LifeCycleDemoComponent implements 
  OnInit, 
  OnChanges, 
  AfterContentInit, 
  AfterViewInit,
  AfterContentChecked,
  AfterViewChecked,
  OnDestroy {

  @Input() inputValue = '';
  lifecycleEvents: any[] = [];

  constructor() {
    this.recordLifecycleEvent('constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.recordLifecycleEvent('ngOnChanges', changes);
  }

  ngOnInit() {
    this.recordLifecycleEvent('ngOnInit');
  }

  ngAfterContentInit() {
    this.recordLifecycleEvent('ngAfterContentInit');
  }

  ngAfterViewInit() {
    this.recordLifecycleEvent('ngAfterViewInit');
  }

  ngAfterContentChecked() {
    this.recordLifecycleEvent('ngAfterContentChecked');
  }

  ngAfterViewChecked() {
    this.recordLifecycleEvent('ngAfterViewChecked');
  }

  ngOnDestroy() {
    this.recordLifecycleEvent('ngOnDestroy');
  }

  private recordLifecycleEvent(name: string, changes?: any) {
    this.lifecycleEvents.push({
      name,
      timestamp: new Date(),
      changes: changes ? this.simplifyChanges(changes) : null
    });
  }

  private simplifyChanges(changes: SimpleChanges) {
    const result: any = {};
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        result[propName] = {
          previous: changes[propName].previousValue,
          current: changes[propName].currentValue
        };
      }
    }
    return result;
  }
}