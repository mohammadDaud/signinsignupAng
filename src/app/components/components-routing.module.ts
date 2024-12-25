import { Routes } from "@angular/router";
import { AuthguardGuard } from "../authentication/authguard.guard";
import { LayoutComponent } from "../layout/layout/layout.component";
import { HomeComponent } from "./home/home.component";


export const ComponentsRoutingModule: Routes = [
    {
        path: 'dash', component: LayoutComponent, canActivate: [AuthguardGuard],
        children: [
            { path: 'home', component: HomeComponent, canActivate: [AuthguardGuard] }
        ]
    }
]
