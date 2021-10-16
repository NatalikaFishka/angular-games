import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppStore } from "src/app/app-store.model";
import { FindCountriesResultService } from "../../services/find-countries-result.service";
import * as actions from "../../store/actions/find-countries-game.actions";


@Component({
    selector: "app-game-controls",
    templateUrl: "./game-controls.component.html",
    styleUrls: ["./game-controls.component.scss"]
})
export class GameControlsComponent implements OnInit {

    public isGameOn$!: Observable<boolean>;

    @Output() showHintTooltip: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() isMobile: boolean = false;

    constructor(
        private store: Store<AppStore>,
        private resultService: FindCountriesResultService,
    ) {}
    ngOnInit() {
       this.isGameOn$ = this.store.select(store => store.findCountriesGame.isGameOn);
    }

    startGame() {
        this.store.dispatch(actions.startGame());
        this.resultService.trackResults();
    }

    reStartGame() {
        this.store.dispatch(actions.startGame())
    }

    skip() {
        this.store.dispatch(actions.skip())
    }
}