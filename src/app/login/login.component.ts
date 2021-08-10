import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { AuthService } from '@services/outros/auth.service';
import { Toast } from '@services/outros/toast.service';
import { Variables } from '@utils/variables';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('isLoading', [
      state(
        'fadeIn',
        style({ display: 'flex' })
      ),
      state(
        'fadeOut',
        style({ display: 'none' })
      ),
      transition(
        'fadeIn => fadeOut',
        [animate('0.3s')]
      ),
      transition(
        'fadeOut => fadeIn',
        [animate('0.5s')]
      )
    ])
  ]
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loading = false;
  showPassword = false;

  @ViewChild('userInput') userInput: MatInput;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toast: Toast,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const userSession = this.storage.get(Variables.USER_LOGIN) ? this.storage.get(Variables.USER_LOGIN) : '';
    this.formLogin = this._formBuilder.group(
      {
        username: [userSession.user, [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        remember: [!!userSession]
      }
    );
  }

  login() {
    this.loading = true;
    const data = {
      username: this.formLogin.get('username').value,
      password: this.formLogin.get('password').value
    }
    this._authService.authenticate(data,
      () => {
        const recover = this.formLogin.get('remember').value;
        if (recover) {
          this.storage.set(Variables.USER_LOGIN, { user: this.formLogin.get('username').value })
        } else {
          const user = this.storage.get(Variables.USER_LOGIN);
          if (user) {
            this.storage.remove(Variables.USER_LOGIN);
          }
        }
        this.loading = false;
        this._router.navigate(['home']);
      },
      (error) => {
        this.loading = false;
        if (error.status === 400) {
          this._toast.error('Erro ao autenticar', 'Usuário ou Senha inválidos.')
        } else {
          this._toast.error('Erro ao autenticar', 'Não foi possível autenticar seu usuário.')
        }
      }
    )
  }
}
