import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bank.reducer';
import { IBank } from 'app/shared/model/bank.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Bank extends React.Component<IBankProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { bankList, match } = this.props;
    return (
      <div>
        <h2 id="bank-heading">
          Banks
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Bank
          </Link>
        </h2>
        <div className="table-responsive">
          {bankList && bankList.length > 0 ? (
            <Table responsive aria-describedby="bank-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Bank Code</th>
                  <th>Bank Name</th>
                  <th>Initial Name</th>
                  <th>Bi Code</th>
                  <th>Swift Code</th>
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
                {bankList.map((bank, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${bank.id}`} color="link" size="sm">
                        {bank.id}
                      </Button>
                    </td>
                    <td>{bank.bankCode}</td>
                    <td>{bank.bankName}</td>
                    <td>{bank.initialName}</td>
                    <td>{bank.biCode}</td>
                    <td>{bank.swiftCode}</td>
                    <td>
                      <TextFormat type="date" value={bank.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={bank.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{bank.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={bank.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={bank.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{bank.lastModificationUserId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${bank.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${bank.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${bank.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Banks found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bank }: IRootState) => ({
  bankList: bank.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
