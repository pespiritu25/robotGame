import { Injectable } from '@angular/core';
import { Controls } from '../typings/generic-types';
import { PositionXY } from '../typings/generic-interfaces';

@Injectable({
  providedIn: 'root',
})
export class RobotService {
  private _robotPOS: PositionXY = { x: -1, y: -1 };
  private _robotOrientation: number = 0;

  get robotPOS() {
    return this._robotPOS;
  }

  setRobotPOS(value: PositionXY) {
    this._robotPOS = value;
  }

  get robotOrientation() {
    return this._robotOrientation;
  }

  manageRobotControl(control: Controls) {
    const changeRotation = (value: number) => {
      this._robotOrientation += value;
    };

    const changePosition = () => {
      // North
      if ([0].includes(this._robotOrientation)) {
        this._robotPOS.y--;
      }

      // SOUTH
      if ([180, -180].includes(this._robotOrientation)) {
        this._robotPOS.y++;
      }

      // EAST
      if ([90, -270].includes(this._robotOrientation)) {
        this._robotPOS.x++;
      }

      // WEST
      if ([270, -90].includes(this._robotOrientation)) {
        this._robotPOS.x--;
      }
    };

    switch (control) {
      case 'ROTATE_RIGHT':
        this._robotOrientation <= 180 ? changeRotation(90) : changeRotation(this._robotOrientation * -1);
        return;
      case 'ROTATE_LEFT':
        this._robotOrientation >= -180 ? changeRotation(-90) : changeRotation(this._robotOrientation * -1);
        return;
      case 'FORWARD': {
        changePosition();
        return;
      }
    }
  }

  returnRobotLastLocation(gridSize: PositionXY) {
    for (let position of Object.keys(this._robotPOS)) {
      if (this._robotPOS[position] < 0) {
        this._robotPOS[position]++;
      }

      if (this._robotPOS[position] > gridSize[position] - 1) {
        this._robotPOS[position]--;
      }
    }
  }
}
