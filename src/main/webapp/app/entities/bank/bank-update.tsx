import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './bank.reducer';
import { IBank } from 'app/shared/model/bank.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBankUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBankUpdateState {
  isNew: boolean;
}

export class BankUpdate extends React.Component<IBankUpdateProps, IBankUpdateState> {
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
      const { bankEntity } = this.props;
      const entity = {
        ...bankEntity,
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
    this.props.history.push('/entity/bank');
  };

  render() {
    const { bankEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecfgatewaysvcApp.bank.home.createOrEditLabel">Create or edit a Bank</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : bankEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="bank-id">ID</Label>
                    <AvInput id="bank-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="bankCodeLabel" for="bank-bankCode">
                    Bank Code
                  </Label>
                  <AvField
                    id="bank-bankCode"
                    type="text"
                    name="bankCode"
                    validate={{
                      maxLength: { value: 10, errorMessage: 'This field cannot be longer than 10 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="bankNameLabel" for="bank-bankName">
                    Bank Name
                  </Label>
                  <AvField
                    id="bank-bankName"
                    type="text"
                    name="bankName"
                    validate={{
                      maxLength: { value: 60, errorMessage: 'This field cannot be longer than 60 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="initialNameLabel" for="bank-initialName">
                    Initial Name
                  </Label>
                  <AvField
                    id="bank-initialName"
                    type="text"
                    name="initialName"
                    validate={{
                      maxLength: { value: 60, errorMessage: 'This field cannot be longer than 60 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="biCodeLabel" for="bank-biCode">
                    Bi Code
                  </Label>
                  <AvField
                    id="bank-biCode"
                    type="text"
                    name="biCode"
                    validate={{
                      maxLength: { value: 3, errorMessage: 'This field cannot be longer than 3 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="swiftCodeLabel" for="bank-swiftCode">
                    Swift Code
                  </Label>
                  <AvField
                    id="bank-swiftCode"
                    type="text"
                    name="swiftCode"
                    validate={{
                      maxLength: { value: 20, errorMessage: 'This field cannot be longer than 20 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="bank-createSystemDate">
                    Create System Date
                  </Label>
                  <AvField id="bank-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="bank-createDate">
                    Create Date
                  </Label>
                  <AvInput
                    id="bank-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.bankEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="bank-createUserId">
                    Create User Id
                  </Label>
                  <AvField id="bank-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="bank-lastModificationSystemDate">
                    Last Modification System Date
                  </Label>
                  <AvField id="bank-lastModificationSystemDate" type="date" className="form-control" name="lastModificationSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="bank-lastModificationDate">
                    Last Modification Date
                  </Label>
                  <AvInput
                    id="bank-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.bankEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="bank-lastModificationUserId">
                    Last Modification User Id
                  </Label>
                  <AvField id="bank-lastModificationUserId" type="string" className="form-control" name="lastModificationUserId" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/bank" replace color="info">
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
  bankEntity: storeState.bank.entity,
  loading: storeState.bank.loading,
  updating: storeState.bank.updating,
  updateSuccess: storeState.bank.updateSuccess
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
)(BankUpdate);
