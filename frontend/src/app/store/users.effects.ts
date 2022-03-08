import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { registerUserFailure, registerUserRequest, registerUserSuccess } from './users.actions';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UsersEffects {
  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.snackbar.open(
          'Register successful',
          'OK',
          {duration: 3000}
        );
        void this.router.navigate(['/']);
      }),
      catchError(reqErr => {
        let registerError = null;

        if (reqErr instanceof HttpErrorResponse && reqErr.status === 400) {
          registerError = reqErr.error;
        } else {
          this.snackbar.open('Server error', 'OK', {duration: 3000})
        }

        return of(registerUserFailure({error: registerError}));
      })
    ))
  ))
}
