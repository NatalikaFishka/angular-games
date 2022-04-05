
import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


@Component({
    selector: "app-puzzle-game-result-snack-bar",
    templateUrl: "./puzzle-game-result-snack-bar.html",
    styleUrls: ["./puzzle-game-result-snack-bar.scss"]
})
export class PuzzleGameResultSnackBarComponent implements OnInit {

    private barConfig: MatSnackBarConfig = {
        panelClass: "snack-bar"
    }

    constructor(
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.snackBar.open("Game finished! Congratulations!", undefined, this.barConfig);
    }

}