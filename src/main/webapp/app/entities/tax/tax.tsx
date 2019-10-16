import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tax.reducer';
import { ITax } from 'app/shared/model/tax.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaxProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Tax extends React.Component<ITaxProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { taxList, match } = this.props;
    return (
      <div>
        <h2 id="tax-heading">
          Taxes
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Tax
          </Link>
        </h2>
        <div className="table-responsive">
          {taxList && taxList.length > 0 ? (
            <Table responsive aria-describedby="tax-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tax Code</th>
                  <th>Short Desc</th>
                  <th>Long Desc</th>
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
                {taxList.map((tax, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${tax.id}`} color="link" size="sm">
                        {tax.id}
                      </Button>
                    </td>
                    <td>{tax.taxCode}</td>
                    <td>{tax.shortDesc}</td>
                    <td>{tax.longDesc}</td>
                    <td>
                      <TextFormat type="date" value={tax.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={tax.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{tax.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={tax.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={tax.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{tax.lastModificationUserId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${tax.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${tax.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${tax.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Taxes found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tax }: IRootState) => ({
  taxList: tax.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tax);
