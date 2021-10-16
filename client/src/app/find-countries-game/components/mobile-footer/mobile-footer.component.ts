import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FindCountriesSettingsComponent } from "../find-countries-settings/find-countries-settings.component";

@Component({
    selector: "app-mobile-footer",
    templateUrl: "mobile-footer.component.html",
    styleUrls: ["mobile-footer.component.scss"]
})
export class MobileFooterComponent {

    constructor(
        private dialog: MatDialog
    ) {}

    openDialog(): void {
        const settingsDialog = this.dialog.open(FindCountriesSettingsComponent);
        settingsDialog.addPanelClass('footer-settings-dialog')
    }

}