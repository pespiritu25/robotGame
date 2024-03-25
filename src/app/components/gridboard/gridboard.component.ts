import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {RobotComponent} from "../robot/robot.component";
import {TargetComponent} from "../target/target.component";
import {PositionXY} from "../../typings/generic-interfaces";

@Component({
  selector: 'app-gridboard',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RobotComponent,
    TargetComponent,
    CommonModule,
  ],
  templateUrl: './gridboard.component.html',
  styleUrl: './gridboard.component.scss'
})
export class GridboardComponent {
  @Input() gridSize: PositionXY = {x: 5, y: 5};

  private readonly _xGrid = [];
  private readonly _yGrid = [];

  @ContentChild(TemplateRef)
  templateRef : TemplateRef<any>;

  constructor() {
    this._xGrid = new Array(this.gridSize.x);
    this._yGrid = new Array(this.gridSize.y);
  }

  get xGrid() {
    return this._xGrid;
  }

  get yGrid() {
    return this._yGrid;
  }
}
