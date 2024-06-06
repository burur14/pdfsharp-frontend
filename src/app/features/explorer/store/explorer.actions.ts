import { Action, createAction, props } from '@ngrx/store';
import { MessageModel } from 'src/app/shared/models/message-model';
import { ResetPassword } from 'src/app/features/authentication/services/models/reset-password.model';
import { EXPLORER_ACTION_KEY } from './explorer.store';
import { ProjectModel } from '../models/project-model';

export const GET_PROJECTS = `${EXPLORER_ACTION_KEY} Get Projects`;
export const GET_PROJECTS_SUCCESS_TYPE = `${EXPLORER_ACTION_KEY} Get Projects Success`;
export const GET_PROJECTS_FAIL_TYPE = `${EXPLORER_ACTION_KEY} Get Projects Fail`;

export const getProjectsAction = createAction(
    GET_PROJECTS,
    props<{ userId: number }>()
);

export const getProjectsSuccessAction = createAction(
    GET_PROJECTS_SUCCESS_TYPE,
    props<{ projects: ProjectModel[] }>()
);

export const getProjectsFailAction = createAction(
    GET_PROJECTS_FAIL_TYPE,
    props<{ message: MessageModel }>()
);

export const GET_PROJECT = `${EXPLORER_ACTION_KEY} Get Project`;
export const GET_PROJECT_SUCCESS_TYPE = `${EXPLORER_ACTION_KEY} Get Project Success`;
export const GET_PROJECT_FAIL_TYPE = `${EXPLORER_ACTION_KEY} Get Project Fail`;

export const getProjectAction = createAction(
    GET_PROJECT,
    props<{ projectId: number }>()
);

export const getProjectSuccessAction = createAction(
    GET_PROJECT_SUCCESS_TYPE,
    props<{ project: ProjectModel }>()
);

export const getProjectFailAction = createAction(
    GET_PROJECT_FAIL_TYPE,
    props<{ message: MessageModel }>()
);

export const ADD_PROJECT = `${EXPLORER_ACTION_KEY} Add Projects`;
export const ADD_PROJECT_SUCCESS_TYPE = `${EXPLORER_ACTION_KEY} Add Projects Success`;
export const ADD_PROJECT_FAIL_TYPE = `${EXPLORER_ACTION_KEY} Add Projects Fail`;

export const addProjectAction = createAction(
    ADD_PROJECT,
    props<{ project: ProjectModel }>()
);

export const addProjectSuccessAction = createAction(
    ADD_PROJECT_SUCCESS_TYPE,
    props<{ project: ProjectModel }>()
);

export const addProjectFailAction = createAction(
    ADD_PROJECT_FAIL_TYPE,
    props<{ message: MessageModel }>()
);


