import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CanvasBoardComponent } from "./components/canvas-board/canvas-board.component";
import { ImagePreviewComponent } from "./components/image-preview/image-preview.component";
import { PuzzleGameComponent } from "./puzzle-game.component";

@NgModule({
    declarations: [
        PuzzleGameComponent,
        CanvasBoardComponent,
        ImagePreviewComponent
    ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    // SharedModule,
    // MatIconModule,
    // MatCardModule,
    // MatTooltipModule
  ]
})
export class PuzzleGameModule {}