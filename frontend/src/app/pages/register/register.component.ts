import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { RegisterError, RegisterUserData } from '../../models/user.model';
import { loginUserWithFacebookRequest, registerUserRequest } from '../../store/users/users.actions';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | RegisterError>;
  errorSub!: Subscription;
  authStateSub!: Subscription;
  loading: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
  }

  ngAfterViewInit(): void {
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

    this.errorSub = this.error.subscribe(error => {
      if (error) {
        const msg = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: msg});
      } else {
        this.form.form.get('email')?.setErrors({});
      }
    });
  }


  onSubmit() {
    const userData: RegisterUserData = this.form.value
    this.store.dispatch(registerUserRequest({userData: userData}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
