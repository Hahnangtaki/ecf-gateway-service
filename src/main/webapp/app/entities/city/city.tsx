import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class City extends React.Component<ICityProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { cityList, match } = this.props;
    return (
      <div>
        <h2 id="city-heading">
          Cities
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new City
          </Link>
        </h2>
        <div className="table-responsive">
          {cityList && cityList.length > 0 ? (
            <Table responsive aria-describedby="city-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>City Code</th>
                  <th>City Name</th>
                  <th>Create System Date</th>
                  <th>Create Date</th>
                  <th>Create User Id</th>
                  <th>Last Modification System Date</th>
                  <th>Last Modification Date</th>
                  <th>Last Modification User Id</th>
                  <th>Province</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cityList.map((city, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${city.id}`} color="link" size="sm">
                        {city.id}
                      </Button>
                    </td>
                    <td>{city.cityCode}</td>
                    <td>{city.cityName}</td>
                    <td>
                      <TextFormat type="date" value={city.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={city.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{city.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={city.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={city.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{city.lastModificationUserId}</td>
                    <td>{city.provinceId ? <Link to={`province/${city.provinceId}`}>{city.provinceId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${city.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${city.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${city.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Cities found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ city }: IRootState) => ({
  cityList: city.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City);
