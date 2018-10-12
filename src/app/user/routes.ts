import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';



export const userRoutes: Routes = [
    // {
    //     path: 'home/addUser', component: AddUserComponent
    // },
    // {
    //     path: 'home/editUser', component: AddUserComponent
    // },
    
    // {
    //     path: 'login', component: UserComponent,
    //     children: [{ path: '', component: SignInComponent }]
    // },
    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
];