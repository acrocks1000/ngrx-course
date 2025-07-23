import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

// Follow standard convention to name an action
// " [<source_component_of_action>] <event_or_command_that_the_action_corresponds_to> "

export const login = createAction(
  "[Login Page] User Login",
  props<{ user: User }>()
);

export const logout = createAction("[Top Menu] Logout");
