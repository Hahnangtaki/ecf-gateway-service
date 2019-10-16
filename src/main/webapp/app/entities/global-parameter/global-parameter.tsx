import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './global-parameter.reducer';
import { IGlobalParameter } from 'app/shared/model/global-parameter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGlobalParameterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class GlobalParameter extends React.Component<IGlobalParameterProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { globalParameterList, match } = this.props;
    return (
      <div>
        <h2 id="global-parameter-heading">
          Global Parameters
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Global Parameter
          </Link>
        </h2>
        <div className="table-responsive">
          {globalParameterList && globalParameterList.length > 0 ? (
            <Table responsive aria-describedby="global-parameter-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Param Code</th>
                  <th>Param Name</th>
                  <th>Param Type</th>
                  <th>Int Value</th>
                  <th>Float Value</th>
                  <th>String Value</th>
                  <th>Date Value</th>
                  <th>Show</th>
                  <th>Edit</th>
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
                {globalParameterList.map((globalParameter, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${globalParameter.id}`} color="link" size="sm">
                        {globalParameter.id}
                      </Button>
                    </td>
                    <td>{globalParameter.paramCode}</td>
                    <td>{globalParameter.paramName}</td>
                    <td>{globalParameter.paramType}</td>
                    <td>{globalParameter.intValue}</td>
                    <td>{globalParameter.floatValue}</td>
                    <td>{globalParameter.stringValue}</td>
                    <td>
                      <TextFormat type="date" value={globalParameter.dateValue} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{globalParameter.show ? 'true' : 'false'}</td>
                    <td>{globalParameter.edit ? 'true' : 'false'}</td>
                    <td>
                      <TextFormat type="date" value={globalParameter.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={globalParameter.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{globalParameter.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={globalParameter.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={globalParameter.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{globalParameter.lastModificationUserId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${globalParameter.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${globalParameter.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${globalParameter.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Global Parameters found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ globalParameter }: IRootState) => ({
  globalParameterList: globalParameter.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalParameter);
