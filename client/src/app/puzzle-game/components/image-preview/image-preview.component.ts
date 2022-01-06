import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

@Component({
    selector: "app-image-preview",
    templateUrl: "./image-preview.component.html",
    styleUrls: ["./image-preview.component.scss"]
})
export class ImagePreviewComponent implements OnInit {

    @ViewChild("previewImage", { static: true }) public previewImage!: ElementRef<HTMLImageElement>;
    @Output() imageElement: EventEmitter<HTMLImageElement> = new EventEmitter<HTMLImageElement>(); 
    @Input() imageUrl: string = "";

    ngOnInit(): void {

        this.previewImage.nativeElement.onload = () => {
            this.imageElement.emit(this.previewImage.nativeElement);
        }

          
        console.log("HTML native element of image", this.previewImage)
    }

    onImageUrlChange(event: string): void {
        this.imageUrl = event;
    }
}