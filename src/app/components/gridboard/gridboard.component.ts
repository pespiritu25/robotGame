import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { RobotComponent } from '../robot/robot.component';
import { TargetComponent } from '../target/target.component';
import { PositionXY } from '../../typings/generic-interfaces';

@Component({
  selector: 'app-gridboard',
  standalone: true,
  imports: [NgForOf, NgIf, RobotComponent, TargetComponent, CommonModule],
  templateUrl: './gridboard.component.html',
  styleUrl: './gridboard.component.scss',
})
export class GridboardComponent {
  protected readonly Array = Array;

  @Input() gridSize: PositionXY = { x: 5, y: 5 };

  @ContentChild(TemplateRef)
  templateRef: TemplateRef<any>;
}
