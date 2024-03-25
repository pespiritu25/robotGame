import {Injectable} from "@angular/core";
import {GameOverComponent} from "../components/game-over/game-over.component";
import {MatDialog} from "@angular/material/dialog";
import {GameOverDialogData, PositionXY} from "../typings/generic-interfaces";
import {RobotService} from "./robot.service";
import {ControlService} from "./control.service";
import {TargetService} from "./target.service";
import {Subject} from "rxjs";
import {GameState} from "../typings/generic-types";

@Injectable({
  providedIn: 'root',
})

export class GameService {

  private _currentGameScore = 0;
  private _gameState:Subject<GameState> = new Subject();


  constructor(private matDialog: MatDialog,
              private robotService: RobotService,
              private targetService: TargetService,
              private controlService: ControlService) {
  }

  get gameState() {
    return this._gameState.asObservable();
  }

  get currentGameScore() {
    return this._currentGameScore;
  }

  private initializeGameOverModal() {
    this.matDialog.open<GameOverComponent, GameOverDialogData>(GameOverComponent, {
      disableClose: true,
      data:{
        score: this._currentGameScore,
      },
    });
  }

  private initializeNewGame(gridSize: PositionXY) {
    this.targetService.setNewTargetPOS(gridSize);
    this._gameState.next('GAME_START');
    this.controlService.setControlUIMode('GAME');
  }

  startCurrentGame(initialRobotXPOS: PositionXY, gridSize: PositionXY) {
    this.robotService.setRobotPOS(initialRobotXPOS);
    this.initializeNewGame(gridSize);
  }

  resetCurrentGame(gridSize: PositionXY) {
    this.robotService.returnRobotLastLocation(gridSize);
    this._currentGameScore = 0;
    this.initializeNewGame(gridSize);
  }

  gameFinished() {
    this.initializeGameOverModal();
    this._gameState.next('GAME_OVER');
    this.targetService.hideTarget();
    this.controlService.setControlUIMode('RESET');
  }

  checkOutOfBounds(gridSize: PositionXY) {
    const hitEdge = (min: number, max: number) => {
      return min < 0 || min > max;
    }

    const isEdgeCollide = hitEdge(this.robotService.robotPOS.x, gridSize.x - 1) ||
      hitEdge(this.robotService.robotPOS.y, gridSize.y - 1);

    if (isEdgeCollide) {
      this.gameFinished();
    }
  }

  checkTargetHit(gridSize: PositionXY) {
    if (this.robotService.robotPOS.x === this.targetService.targetPOS.x && this.robotService.robotPOS.y === this.targetService.targetPOS.y) {
      this.targetService.setNewTargetPOS(gridSize);
      this._currentGameScore++;
    }
  }
}
