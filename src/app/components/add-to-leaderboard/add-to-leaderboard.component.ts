import {Component, Input, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {LeaderboardService} from "../../services/leaderboard.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-to-leaderboard',
  standalone: true,
  imports: [
    MatInput,
    MatLabel,
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './add-to-leaderboard.component.html',
  styleUrl: './add-to-leaderboard.component.scss'
})
export class AddToLeaderboardComponent implements OnInit {
  @Input() userScore: number = 0;
  maxNameLength = 6;
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddToLeaderboardComponent>,
              private leaderboardService: LeaderboardService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      userName: [null, [Validators.required]]
    });
  }

  submitToLeaderboard() {
    const data = {
      userName: this.userForm.value.userName,
      userScore: this.userScore,
    };

    this.leaderboardService.create(data);
    this.dialogRef.close();
  }
}
