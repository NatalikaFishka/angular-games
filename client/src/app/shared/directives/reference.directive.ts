import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[componentRef]'
})
export class ComponentRefDirective {
    constructor(
        public containerRef: ViewContainerRef
    ) {}
    
}