import {Injectable} from "@angular/core";
import {ControlUIMode} from "../typings/generic-types";

@Injectable({
  providedIn: 'root',
})

export class ControlService {
  private _controlUIMode: ControlUIMode = 'START';

  get controlUIMode() {
    return this._controlUIMode;
  }

  setControlUIMode(value: ControlUIMode) {
    this._controlUIMode = value;
  }
}
