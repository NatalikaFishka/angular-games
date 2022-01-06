import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";

@Component({
    selector: "app-image-preview",
    templateUrl: "./image-preview.component.html",
    styleUrls: ["./image-preview.component.scss"]
})
export class ImagePreviewComponent implements OnInit, OnChanges {

    @Output() image: EventEmitter<ElementRef<HTMLImageElement>> = new EventEmitter<ElementRef<HTMLImageElement>>(); 
    @ViewChild("previewImage", { static: true }) public previewImage!: ElementRef<HTMLImageElement>;
    @Input() imageUrl: string = "";

    ngOnInit(): void {
        this.previewImage.nativeElement.onload = () => {
            this.image.emit(this.previewImage);
            console.log("onLoad image", this.previewImage)
        }
    }

    ngOnChanges(value: SimpleChanges): void {
        console.log("Changes inside image preview???", value)
    }
}