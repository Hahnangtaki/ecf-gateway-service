import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Country extends React.Component<ICountryProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { countryList, match } = this.props;
    return (
      <div>
        <h2 id="country-heading">
          Countries
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Country
          </Link>
        </h2>
        <div className="table-responsive">
          {countryList && countryList.length > 0 ? (
            <Table responsive aria-describedby="country-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Country Code</th>
                  <th>Country Name</th>
                  <th>Nationality</th>
                  <th>Create System Date</th>
                  <th>Create Date</th>
                  <th>Create User Id</th>
                  <th>Last Modification System Date</th>
                  <th>Last Modification Date</th>
                  <th>Last Modification User Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {countryList.map((country, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${country.id}`} color="link" size="sm">
                        {country.id}
                      </Button>
                    </td>
                    <td>{country.countryCode}</td>
                    <td>{country.countryName}</td>
                    <td>{country.nationality}</td>
                    <td>
                      <TextFormat type="date" value={country.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={country.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{country.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={country.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={country.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{country.lastModificationUserId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${country.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${country.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${country.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Countries found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ country }: IRootState) => ({
  countryList: country.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Country);
