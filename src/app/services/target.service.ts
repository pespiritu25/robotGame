import { Injectable } from '@angular/core';
import { PositionXY } from '../typings/generic-interfaces';
import { RobotService } from './robot.service';

@Injectable({
  providedIn: 'root',
})
export class TargetService {
  private _targetPOS: PositionXY = { x: -1, y: -1 };

  constructor(private robotService: RobotService) {}

  get targetPOS() {
    return this._targetPOS;
  }

  hideTarget() {
    this._targetPOS = { x: -1, y: -1 };
  }

  setNewTargetPOS(gridSize: PositionXY) {
    const generateNewPosition = (maxValue: number, valueToExclude?: number[]): number => {
      const newValue = Math.floor(Math.random() * (maxValue - 1));

      // Handle randomness of new target position to prevent same previous target position and current robot position.
      if (valueToExclude?.includes(newValue)) {
        return generateNewPosition(maxValue, valueToExclude);
      }

      return newValue;
    };

    this._targetPOS.x = generateNewPosition(gridSize.x, [this._targetPOS.x, this.robotService.robotPOS.x]);
    this._targetPOS.y = generateNewPosition(gridSize.y, [this._targetPOS.y, this.robotService.robotPOS.y]);
  }
}
