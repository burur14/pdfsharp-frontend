import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EXPLORER_ACTION_KEY, ExplorerState } from "./explorer.store";


export const selectExplorerState = createFeatureSelector<ExplorerState>(EXPLORER_ACTION_KEY);

export const selectProjects = createSelector(
  selectExplorerState,
    (state: ExplorerState) => state.projects
);

export const selectProject = createSelector(
  selectExplorerState,
    (state: ExplorerState) => state.project
);

export const selectIsLoadingProject = createSelector(
  selectExplorerState,
    (state: ExplorerState) => state.isLoadingProject
);