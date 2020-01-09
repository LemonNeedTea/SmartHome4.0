import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  anuncios: any[] = [];
  info: any[] = [];


  constructor(public rout: Router) {
  }


  goto(id) {
    this.rout.navigateByUrl(id);
  }


  getProfile(id) {
    // this.itemsCollection = this.afs.collection<any>(`users/${id}/profile/`);

    // return this.itemsCollection.snapshotChanges().pipe(map((info: any[]) => {
    //   this.info = [];

    //   for (const infos of info) {
    //     this.info.unshift(infos);
    //   }

    //   return this.info;
    // }));
  }




  createUser(value) {
    // return new Promise<any>((resolve, reject) => {
    //   this.afs.collection(`users/${value.uid}/profile`).add({
    //     name: value.name,
    //     phone: value.phone,
    //     mail: value.mail,
    //     img: value.img,
    //     uid: value.uid,
    //     adress: value.adress,
    //     date: Date.now()
    //   });
    //   this.rout.navigateByUrl(`profile`);
    // });
  }



  updateUser(value, id?) {
  //  return this.afs.collection('users').doc(value.uid).collection('profile').doc(id).set(value);
  }

}
