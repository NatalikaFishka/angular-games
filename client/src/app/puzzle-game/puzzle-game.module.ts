import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "../shared/shared.module";
import { ImagePreviewComponent } from "./components/image-preview/image-preview.component";
import { PuzzleResultComponent } from "./components/puzzle-results/puzzle-results.component";
import { PuzzleGameResultSnackBarComponent } from "./components/result-snack-bar/puzzle-game-result-snack-bar";
import { PuzzleSettingsComponent } from "./components/tool-settings/puzzle-settings.component";
import { PuzzleGameComponent } from "./puzzle-game.component";

@NgModule({
    declarations: [
        PuzzleGameComponent,
        ImagePreviewComponent,
        PuzzleSettingsComponent,
        PuzzleResultComponent,
        PuzzleGameResultSnackBarComponent
    ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ]
})
export class PuzzleGameModule {}