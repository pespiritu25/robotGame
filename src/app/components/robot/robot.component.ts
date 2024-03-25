import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-robot',
  standalone: true,
  imports: [],
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss',
})
export class RobotComponent {
  @Input() orientation: number = 0;
}
