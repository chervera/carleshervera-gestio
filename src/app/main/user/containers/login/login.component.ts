import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserFacade } from '../../user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userFacade: UserFacade
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.form.valid) {
      let { username, password } = this.form.value;
      this.userFacade.login(username, password).subscribe(
        () => {
          this.userFacade.printState();
          console.log('login de puta mare');
        }
      )
    }
  }
}
