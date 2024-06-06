import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addProjectAction, addProjectFailAction, addProjectSuccessAction, getProjectAction, getProjectFailAction, getProjectSuccessAction, getProjectsAction, getProjectsFailAction, getProjectsSuccessAction } from "./explorer.actions";
import { ProjectService } from "../services/project.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { MessageModel } from "src/app/shared/models/message-model";
import { AuthService } from "../../authentication/services/auth.service";

//export const AUTHENTICATED_USER = 'authenticatedUser';

@Injectable()
export class ExplorerEffects {
    getProjects = createEffect(() =>
        this.actions.pipe(
            ofType(getProjectsAction),
            mergeMap((props) => {
                return this.projectService.getUsersProjects(props.userId).pipe(
                    map((projects) => getProjectsSuccessAction({ projects })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(getProjectsFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    getProject = createEffect(() =>
        this.actions.pipe(
            ofType(getProjectAction),
            mergeMap((props) => {
                return this.projectService.getProjectById(props.projectId).pipe(
                    map((project) => getProjectSuccessAction({ project })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(getProjectFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    addProject = createEffect(() =>
        this.actions.pipe(
            ofType(addProjectAction),
            mergeMap((props) => {
                return this.projectService.addProject(props.project).pipe(
                    map((project) => addProjectSuccessAction({ project })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(addProjectFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    addProjectSuccess = createEffect(() =>
        this.actions.pipe(
            ofType(addProjectSuccessAction),
            mergeMap((props) => {
                return of(getProjectsAction({userId: this.authService.getAuthenticatedUser()?.id!}));
            })
        )
    );

    constructor(
        private actions: Actions,
        private projectService: ProjectService,
        private authService: AuthService,
        private store: Store,
        private router: Router
    ) { }
}
