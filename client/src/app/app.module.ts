import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';

// Custom Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent, DeleteDialog } from './dashboard/dashboard.component';
import { ProtectedNavbarComponent } from './protected-navbar/protected-navbar.component';
import { ResultsComponent, ResultsDialog } from './results/results.component';
import { SearchComponent } from './search/search.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import {MatIconModule} from '@angular/material/icon';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    ProtectedNavbarComponent,
    ResultsComponent,
    ResultsDialog,
    DeleteDialog,
    SearchComponent,
    PublicProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    // Angular Material
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,

    // JWT Mw
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
  ],
  entryComponents: [
    ResultsDialog,
    DeleteDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
