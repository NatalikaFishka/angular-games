import { Component, Input } from "@angular/core";

@Component({
    selector: "app-image-preview",
    templateUrl: "./image-preview.component.html",
    styleUrls: ["./image-preview.component.scss"]
})
export class ImagePreviewComponent {

    @Input() imageUrl: string = "";

    onImageUrlChange(event: string): void {
        this.imageUrl = event;
    }
}