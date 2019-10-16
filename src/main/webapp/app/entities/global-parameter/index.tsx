import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GlobalParameter from './global-parameter';
import GlobalParameterDetail from './global-parameter-detail';
import GlobalParameterUpdate from './global-parameter-update';
import GlobalParameterDeleteDialog from './global-parameter-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GlobalParameterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GlobalParameterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GlobalParameterDetail} />
      <ErrorBoundaryRoute path={match.url} component={GlobalParameter} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={GlobalParameterDeleteDialog} />
  </>
);

export default Routes;
