import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { LoginError, LoginUserData } from '../../models/user.model';
import { loginUserRequest, loginUserWithFacebookRequest } from '../../store/users/users.actions';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnInit() {
    this.authStateSub = this.auth.authState.subscribe((user: SocialUser) => {
      this.store.dispatch(loginUserWithFacebookRequest({userData: {
          authToken: user.authToken,
          id: user.id,
          email: user.email,
          photoUrl: user.photoUrl,
          name: user.name
        }
      }));
    });
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }
}
