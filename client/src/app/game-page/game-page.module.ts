import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './components/board/board.component';
import { CardComponent } from './components/card/card.component';
import { ToolSettingsComponent } from './components/tool-settings/tool-settings.component';
import { SharedModule } from '../shared/shared.module';
import { GamePageComponent } from './game-page.component';
import { TrackResultsComponent } from './components/track-results/track-results.component';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        GamePageComponent,
        BoardComponent,
        CardComponent,
        ToolSettingsComponent,
        TrackResultsComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule
    ]
})
export class GamePageModule {}