import { NgModule } from "@angular/core";
import { ComponentRefDirective } from './directives/reference.directive';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { SecondsConverterPipe } from './pipes/seconds-converter.pipe';

@NgModule({
    declarations: [
        ComponentRefDirective,
        NumberToArrayPipe,
        SecondsConverterPipe
    ],
    exports: [
        ComponentRefDirective,
        NumberToArrayPipe,
        SecondsConverterPipe
    ]
})
export class SharedModule {}