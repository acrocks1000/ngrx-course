import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  // constructor(private actions$: Actions, private store: Store<AppState>) {
  //     actions$.subscribe(action => {
  //         if (action.type == '[Login Page] User Login') {
  //             localStorage.setItem('user', JSON.stringify(action['user']));
  //         }
  //     })
  // }

  //   constructor(private actions$: Actions) {
  //     const login$ = this.actions$.pipe(
  //       ofType(AuthActions.login),
  //       tap((action) => {
  //         localStorage.setItem("user", JSON.stringify(action.user));
  //       })
  //     );
  //     login$.subscribe();
  //   }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap((action) => {
        localStorage.setItem("user", JSON.stringify(action.user));
      })
    ),
    {dispatch: false}  // v important to inform ngrx that this effect does not result in dispatching new action
  );

  logout$ = createEffect(() => 
    this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((action) => {
            localStorage.removeItem("user");
            this.router.navigateByUrl('/login');
        })
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private router: Router) {}
}
