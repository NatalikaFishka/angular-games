import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

const MapsToSelect = ["Russia", "USA"]
@Component({
    selector: "app-find-countries-settings",
    templateUrl: "./find-countries-settings.component.html",
    styleUrls: ["./find-countries-settings.component.scss"]
})
export class FindCountriesSettingsComponent implements OnInit {

    private initialMap: string = "Russia";
    public mapsToSelect: Array<string> = MapsToSelect;
    public form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            selectedMap: [this.initialMap]
        })
    }
    ngOnInit() {}

    formSubmit() {
        console.log('FORM DATA', this.form.value)
    }
}