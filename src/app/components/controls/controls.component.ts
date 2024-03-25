import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Controls } from '../../typings/generic-types';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [MatMiniFabButton, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {
  @Output() currentGameControlInput: EventEmitter<Controls> = new EventEmitter();

  constructor(public controlService: ControlService) {}
}
