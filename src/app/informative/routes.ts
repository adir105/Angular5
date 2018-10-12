import { Routes } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard';
import { TableDataComponent } from './table-data/table-data.component';

export const informativeRoutes: Routes = [
    { 
        path: 'home/customerManagment/tableData', component: TableDataComponent,canActivate:[AuthGuard]
    },
    { 
        path: 'home/customerManagment/tableData/:id', redirectTo: 'home/customerManagment/tableData', canActivate:[AuthGuard]
    },

    // {
    //     path: 'login', component: UserComponent,
    //     children: [{ path: '', component: SignInComponent }]
    // },
    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
];