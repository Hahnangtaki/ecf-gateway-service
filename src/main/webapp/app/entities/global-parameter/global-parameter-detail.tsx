import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './global-parameter.reducer';
import { IGlobalParameter } from 'app/shared/model/global-parameter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGlobalParameterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class GlobalParameterDetail extends React.Component<IGlobalParameterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { globalParameterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            GlobalParameter [<b>{globalParameterEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="paramCode">Param Code</span>
            </dt>
            <dd>{globalParameterEntity.paramCode}</dd>
            <dt>
              <span id="paramName">Param Name</span>
            </dt>
            <dd>{globalParameterEntity.paramName}</dd>
            <dt>
              <span id="paramType">Param Type</span>
            </dt>
            <dd>{globalParameterEntity.paramType}</dd>
            <dt>
              <span id="intValue">Int Value</span>
            </dt>
            <dd>{globalParameterEntity.intValue}</dd>
            <dt>
              <span id="floatValue">Float Value</span>
            </dt>
            <dd>{globalParameterEntity.floatValue}</dd>
            <dt>
              <span id="stringValue">String Value</span>
            </dt>
            <dd>{globalParameterEntity.stringValue}</dd>
            <dt>
              <span id="dateValue">Date Value</span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.dateValue} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="show">Show</span>
            </dt>
            <dd>{globalParameterEntity.show ? 'true' : 'false'}</dd>
            <dt>
              <span id="edit">Edit</span>
            </dt>
            <dd>{globalParameterEntity.edit ? 'true' : 'false'}</dd>
            <dt>
              <span id="createSystemDate">Create System Date</span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">Create Date</span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">Create User Id</span>
            </dt>
            <dd>{globalParameterEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">Last Modification System Date</span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">Last Modification Date</span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">Last Modification User Id</span>
            </dt>
            <dd>{globalParameterEntity.lastModificationUserId}</dd>
          </dl>
          <Button tag={Link} to="/entity/global-parameter" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/global-parameter/${globalParameterEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ globalParameter }: IRootState) => ({
  globalParameterEntity: globalParameter.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalParameterDetail);
