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

@NgModule({
    declarations: [
        GamePageComponent,
        BoardComponent,
        CardComponent,
        ToolSettingsComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class GamePageModule {}