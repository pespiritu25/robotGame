import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {
  @Input() milliseconds: number = 60000;
  @Output() finished: EventEmitter<boolean> = new EventEmitter<boolean>();
  start = false;
  display;
  interval;

  constructor(private gameService: GameService) {
    this.generateDisplay(this.milliseconds);
  }

  ngOnInit() {
    this.gameService.gameState.subscribe((state) => {
        switch (state) {
          case "GAME_START": {
            this.beginCountdown();
            break;
          }
          case "GAME_OVER": {
            this.resetCountdown();
          }
        }
    });
  }

  beginCountdown() {
    let ms = this.milliseconds;
    this.start = true;

    this.interval = setInterval(() => {
      ms -= 1000;
      this.generateDisplay(ms);

      if (ms <= 0) {
        this.finished.emit(true);
        this.resetCountdown();
      }
    }, 1000);
  }

  resetCountdown() {
    this.start = false;
    clearInterval(this.interval);
    this.generateDisplay(this.milliseconds);
  }

  generateDisplay(ms: number) {
    const generate = (value) => {
      return new Date(value).toISOString().slice(14,19);
    }
    this.display = this.start ? generate(ms) : generate(this.milliseconds);
  }
}
