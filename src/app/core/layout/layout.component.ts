import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';
import { RootQuery } from '../state/root.query';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  user$: Observable<any> = null;

  constructor(
    private rootQuery: RootQuery,
    private service: AuthService,
    private router: Router
  ) {
    this.user$ = this.rootQuery.selectUser();
  }

  ngOnInit() {}

  logout() {
    this.service.logout();
    this.router.navigate(['user/login']);
  }
}
