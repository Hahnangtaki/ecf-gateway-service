import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GlobalParameter from './global-parameter';
import Category from './category';
import City from './city';
import Country from './country';
import Province from './province';
import Bank from './bank';
import CompanyBank from './company-bank';
import Currency from './currency';
import Tax from './tax';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/global-parameter`} component={GlobalParameter} />
      <ErrorBoundaryRoute path={`${match.url}/category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}/city`} component={City} />
      <ErrorBoundaryRoute path={`${match.url}/country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}/province`} component={Province} />
      <ErrorBoundaryRoute path={`${match.url}/bank`} component={Bank} />
      <ErrorBoundaryRoute path={`${match.url}/company-bank`} component={CompanyBank} />
      <ErrorBoundaryRoute path={`${match.url}/currency`} component={Currency} />
      <ErrorBoundaryRoute path={`${match.url}/tax`} component={Tax} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
