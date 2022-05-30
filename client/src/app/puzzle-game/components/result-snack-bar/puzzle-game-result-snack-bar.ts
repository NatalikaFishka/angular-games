import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/app-store.model';


@Component({
    selector: "app-puzzle-game-result-snack-bar",
    templateUrl: "./puzzle-game-result-snack-bar.html",
    styleUrls: ["./puzzle-game-result-snack-bar.scss"]
})
export class PuzzleGameResultSnackBarComponent implements OnInit {

    private barConfig: MatSnackBarConfig = {
        panelClass: "snack-bar"
    }

    private isGameFinishedWithSuccess$: Observable<boolean>;

    constructor(
        private snackBar: MatSnackBar,
        private store: Store<AppStore>
    ) {
        this.isGameFinishedWithSuccess$ = this.store.select(store => store.puzzleGame.finishedWithSuccess)
    }

    ngOnInit(): void {

        this.isGameFinishedWithSuccess$.subscribe((result) => {
            if(result) {
                this.snackBar.open("Game finished! Congratulations!", undefined, this.barConfig);
            } else {
                this.snackBar.dismiss();
            }
        }) 

    }

}