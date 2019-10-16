import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './global-parameter.reducer';
import { IGlobalParameter } from 'app/shared/model/global-parameter.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGlobalParameterUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IGlobalParameterUpdateState {
  isNew: boolean;
}

export class GlobalParameterUpdate extends React.Component<IGlobalParameterUpdateProps, IGlobalParameterUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.createDate = convertDateTimeToServer(values.createDate);
    values.lastModificationDate = convertDateTimeToServer(values.lastModificationDate);

    if (errors.length === 0) {
      const { globalParameterEntity } = this.props;
      const entity = {
        ...globalParameterEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/global-parameter');
  };

  render() {
    const { globalParameterEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecfgatewaysvcApp.globalParameter.home.createOrEditLabel">Create or edit a GlobalParameter</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : globalParameterEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="global-parameter-id">ID</Label>
                    <AvInput id="global-parameter-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="paramCodeLabel" for="global-parameter-paramCode">
                    Param Code
                  </Label>
                  <AvField
                    id="global-parameter-paramCode"
                    type="text"
                    name="paramCode"
                    validate={{
                      maxLength: { value: 10, errorMessage: 'This field cannot be longer than 10 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="paramNameLabel" for="global-parameter-paramName">
                    Param Name
                  </Label>
                  <AvField
                    id="global-parameter-paramName"
                    type="text"
                    name="paramName"
                    validate={{
                      maxLength: { value: 100, errorMessage: 'This field cannot be longer than 100 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="paramTypeLabel" for="global-parameter-paramType">
                    Param Type
                  </Label>
                  <AvField
                    id="global-parameter-paramType"
                    type="text"
                    name="paramType"
                    validate={{
                      maxLength: { value: 1, errorMessage: 'This field cannot be longer than 1 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="intValueLabel" for="global-parameter-intValue">
                    Int Value
                  </Label>
                  <AvField id="global-parameter-intValue" type="string" className="form-control" name="intValue" />
                </AvGroup>
                <AvGroup>
                  <Label id="floatValueLabel" for="global-parameter-floatValue">
                    Float Value
                  </Label>
                  <AvField id="global-parameter-floatValue" type="string" className="form-control" name="floatValue" />
                </AvGroup>
                <AvGroup>
                  <Label id="stringValueLabel" for="global-parameter-stringValue">
                    String Value
                  </Label>
                  <AvField
                    id="global-parameter-stringValue"
                    type="text"
                    name="stringValue"
                    validate={{
                      maxLength: { value: 100, errorMessage: 'This field cannot be longer than 100 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateValueLabel" for="global-parameter-dateValue">
                    Date Value
                  </Label>
                  <AvField id="global-parameter-dateValue" type="date" className="form-control" name="dateValue" />
                </AvGroup>
                <AvGroup>
                  <Label id="showLabel" check>
                    <AvInput id="global-parameter-show" type="checkbox" className="form-control" name="show" />
                    Show
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editLabel" check>
                    <AvInput id="global-parameter-edit" type="checkbox" className="form-control" name="edit" />
                    Edit
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="global-parameter-createSystemDate">
                    Create System Date
                  </Label>
                  <AvField id="global-parameter-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="global-parameter-createDate">
                    Create Date
                  </Label>
                  <AvInput
                    id="global-parameter-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.globalParameterEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="global-parameter-createUserId">
                    Create User Id
                  </Label>
                  <AvField id="global-parameter-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="global-parameter-lastModificationSystemDate">
                    Last Modification System Date
                  </Label>
                  <AvField
                    id="global-parameter-lastModificationSystemDate"
                    type="date"
                    className="form-control"
                    name="lastModificationSystemDate"
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="global-parameter-lastModificationDate">
                    Last Modification Date
                  </Label>
                  <AvInput
                    id="global-parameter-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.globalParameterEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="global-parameter-lastModificationUserId">
                    Last Modification User Id
                  </Label>
                  <AvField
                    id="global-parameter-lastModificationUserId"
                    type="string"
                    className="form-control"
                    name="lastModificationUserId"
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/global-parameter" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  globalParameterEntity: storeState.globalParameter.entity,
  loading: storeState.globalParameter.loading,
  updating: storeState.globalParameter.updating,
  updateSuccess: storeState.globalParameter.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalParameterUpdate);
