import { Component } from '@angular/core';
import { RobotService } from '../../services/robot.service';

@Component({
  selector: 'app-robot',
  standalone: true,
  imports: [],
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss',
})
export class RobotComponent {
  constructor(public robotService: RobotService) {}
}
