import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ServicesService } from '../../services/services.service';
import { ThemeService } from '../../services/theme.service';
import { LoginRequestService } from '../../services/request/login-request.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  uid: any;
  item: any;
  anuncios: any;
  empty: boolean;
  darkMode: boolean;
  constructor(private nav: NavController,
              private services: ServicesService,
              private theme: ThemeService,
              private login: LoginRequestService,
    private router: Router) {

  }

  enableDark() {
    this.theme.enableDark();
    this.theme.setDarkStorage();
  }
  enableLight() {
    this.theme.enableLight();
    this.theme.setLightStorage();
  }

  update(e) {
    e.detail.checked ? this.enableDark() : this.enableLight();
  }

  ngOnInit() {
    this.getLogueado();
    this.darkMode = this.theme.isDarkMode();
   }

  getLogueado() {
    this.getProfile(this.uid);
    // this.aut.authState
    //   .subscribe(
    //     user => {
    //       if (user) {
    //         console.log('logeado');
    //         this.uid = user.uid;
    //         console.log(this.uid);
    //         this.getProfile(this.uid);
    //       } else {
    //         this.rout.navigateByUrl('/login');
    //       }
    //     },
    //     () => {
    //       this.rout.navigateByUrl('/login');
    //     }
    //   );
  }


  async getProfile(id) {
    this.empty = true;
    // await this.services.getProfile(id).subscribe((data => {
    //   console.log(data);
    //   if (data.length === 0) {
    //     this.empty = false;
    //     console.log('empty');
    //   } else {
    //     this.empty = true;
    //     this.item = data;
    //   }
    // }));
  }



  goedit() {
    // this.rout.navigateByUrl(`/edit-profile`);
  }

  async signOut() {
    const res = await this.login.logout();
    this.nav.navigateRoot('login');
  }


}
