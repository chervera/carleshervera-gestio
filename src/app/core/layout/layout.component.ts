import { Component, OnInit } from '@angular/core';
import { State } from '../state/state';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { CoreState } from '../state/core.state';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  user: Observable<any> = null;

  constructor(
    private state: CoreState,
    private service: AuthService,
    private router: Router
  ) {
    this.user = service.getUser$();
  }

  ngOnInit() {
  }

  printState() {
    this.state.printGlobalState();
  }

  logout() {
    this.service.logout();
    this.router.navigate(['user/login'])
  }

}
