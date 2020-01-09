
import { Component , OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { LoginRequestService } from '../../services/request/login-request.service';
import {  ToastController} from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  item: any;
  id: string;

  q1 = [
    { value: 'Buy Milk', color: 'primary' },
    { value: 'Write new Post', color: 'primary' }
  ];
  q2 = [
    { value: 'Schedule newsletter', color: 'secondary' },
    { value: 'Find new Ionic Academy topics', color: 'secondary' }
  ];
  q3 = [
    { value: 'Improve page performance', color: 'tertiary' },
    { value: 'Clean the house', color: 'tertiary' }
  ];
  q4 = [
    { value: 'Unimportant things', color: 'warning' },
    { value: 'Watch Netflix', color: 'warning' }
  ];

  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';
  constructor(private router: Router ,
    public services: ServicesService,
    private login: LoginRequestService,
    private dragulaService: DragulaService,
    private toastController: ToastController ) {
    this.dragulaService.drag('bag')
      .subscribe(({ name, el, source }) => {
        el.setAttribute('color', 'danger');
      });

    this.dragulaService.removeModel('bag')
      .subscribe(({ item }) => {
        this.toastController.create({
          message: 'Removed: ' + item.value,
          duration: 2000
        }).then(toast => toast.present());
      });

    this.dragulaService.dropModel('bag')
      .subscribe(({ item }) => {
        item['color'] = 'success';
      });

    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });
    }
  addTodo() {
    switch (this.selectedQuadrant) {
      case 'q1':
        this.todo.color = 'primary';
        break;
      case 'q2':
        this.todo.color = 'secondary';
        break;
      case 'q3':
        this.todo.color = 'tertiary';
        break;
      case 'q4':
        this.todo.color = 'warning';
        break;
    }
    this[this.selectedQuadrant].push(this.todo);
    this.todo = { value: '', color: '' };
  }
  ngOnInit() {
    this.logued();
  }



  logued() {
    this.login.checkToken();
  }

  async signOut() {
    // const res = await this.aut.auth.signOut();
    // console.log(res);
    // this.router.navigateByUrl('/login');
  }

  async getProfile(id) {
    // await this.services.getProfile(id).subscribe((data: any) => {
    //   if (data.length === 0) {
    //     console.log('profile empty');
    //     this.router.navigateByUrl(`edit-profile`);
    //   } else {
    //     console.log('Profile not empty');
    //     console.log(data);
    //     this.item = data;
    //   }
    // });
  }


  profile() {
    this.router.navigateByUrl(`profile`);
  }
}
