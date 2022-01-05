import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";

@Component({
    selector: "app-image-preview",
    templateUrl: "./image-preview.component.html",
    styleUrls: ["./image-preview.component.scss"]
})
export class ImagePreviewComponent implements OnInit {

    @Output() image = new EventEmitter<ElementRef<HTMLImageElement>>(); 
    @ViewChild("previewImage", { static: true }) public previewImage!: ElementRef<HTMLImageElement>;

    ngOnInit(): void {
        this.previewImage.nativeElement.onload = () => {
            this.image.emit(this.previewImage);
        }
    }
}