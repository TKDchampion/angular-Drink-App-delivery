import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { DrinkDmComponent } from './drink-dm/drink-dm.component';
import { DrinkService } from './drink-dm/drink.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './../environments/firebase.config'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DrinkHomeComponent } from './drink-home/drink-home.component';
import { DrinkAdminComponent } from './drink-admin/drink-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    DrinkDmComponent,
    DrinkListComponent,
    DrinkHomeComponent,
    DrinkAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AppRoutingModule,
    ClipboardModule
  ],
  providers: [DrinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
