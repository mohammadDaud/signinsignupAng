import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from 'angular-datatables';
import { CustomMatrialModule } from "../custommaterial";
import { HomeComponent } from "./home/home.component";

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DataTablesModule,
        CustomMatrialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [
        HomeComponent
    ]
})
export class ComponentsModule { }