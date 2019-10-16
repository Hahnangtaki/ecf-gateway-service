import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBank } from 'app/shared/model/bank.model';
import { getEntities as getBanks } from 'app/entities/bank/bank.reducer';
import { ICurrency } from 'app/shared/model/currency.model';
import { getEntities as getCurrencies } from 'app/entities/currency/currency.reducer';
import { getEntity, updateEntity, createEntity, reset } from './company-bank.reducer';
import { ICompanyBank } from 'app/shared/model/company-bank.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyBankUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICompanyBankUpdateState {
  isNew: boolean;
  bankId: string;
  currencyId: string;
}

export class CompanyBankUpdate extends React.Component<ICompanyBankUpdateProps, ICompanyBankUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      bankId: '0',
      currencyId: '0',
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

    this.props.getBanks();
    this.props.getCurrencies();
  }

  saveEntity = (event, errors, values) => {
    values.createDate = convertDateTimeToServer(values.createDate);
    values.lastModificationDate = convertDateTimeToServer(values.lastModificationDate);

    if (errors.length === 0) {
      const { companyBankEntity } = this.props;
      const entity = {
        ...companyBankEntity,
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
    this.props.history.push('/entity/company-bank');
  };

  render() {
    const { companyBankEntity, banks, currencies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecfgatewaysvcApp.companyBank.home.createOrEditLabel">Create or edit a CompanyBank</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : companyBankEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="company-bank-id">ID</Label>
                    <AvInput id="company-bank-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="bankAccountNoLabel" for="company-bank-bankAccountNo">
                    Bank Account No
                  </Label>
                  <AvField
                    id="company-bank-bankAccountNo"
                    type="text"
                    name="bankAccountNo"
                    validate={{
                      maxLength: { value: 60, errorMessage: 'This field cannot be longer than 60 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="bankAccountNameLabel" for="company-bank-bankAccountName">
                    Bank Account Name
                  </Label>
                  <AvField
                    id="company-bank-bankAccountName"
                    type="text"
                    name="bankAccountName"
                    validate={{
                      maxLength: { value: 100, errorMessage: 'This field cannot be longer than 100 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="bankBranchLabel" for="company-bank-bankBranch">
                    Bank Branch
                  </Label>
                  <AvField
                    id="company-bank-bankBranch"
                    type="text"
                    name="bankBranch"
                    validate={{
                      maxLength: { value: 100, errorMessage: 'This field cannot be longer than 100 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="company-bank-status">
                    Status
                  </Label>
                  <AvField
                    id="company-bank-status"
                    type="text"
                    name="status"
                    validate={{
                      maxLength: { value: 1, errorMessage: 'This field cannot be longer than 1 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createSystemDateLabel" for="company-bank-createSystemDate">
                    Create System Date
                  </Label>
                  <AvField id="company-bank-createSystemDate" type="date" className="form-control" name="createSystemDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="company-bank-createDate">
                    Create Date
                  </Label>
                  <AvInput
                    id="company-bank-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.companyBankEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createUserIdLabel" for="company-bank-createUserId">
                    Create User Id
                  </Label>
                  <AvField id="company-bank-createUserId" type="string" className="form-control" name="createUserId" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationSystemDateLabel" for="company-bank-lastModificationSystemDate">
                    Last Modification System Date
                  </Label>
                  <AvField
                    id="company-bank-lastModificationSystemDate"
                    type="date"
                    className="form-control"
                    name="lastModificationSystemDate"
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationDateLabel" for="company-bank-lastModificationDate">
                    Last Modification Date
                  </Label>
                  <AvInput
                    id="company-bank-lastModificationDate"
                    type="datetime-local"
                    className="form-control"
                    name="lastModificationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.companyBankEntity.lastModificationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModificationUserIdLabel" for="company-bank-lastModificationUserId">
                    Last Modification User Id
                  </Label>
                  <AvField id="company-bank-lastModificationUserId" type="string" className="form-control" name="lastModificationUserId" />
                </AvGroup>
                <AvGroup>
                  <Label for="company-bank-bank">Bank</Label>
                  <AvInput id="company-bank-bank" type="select" className="form-control" name="bankId">
                    <option value="" key="0" />
                    {banks
                      ? banks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="company-bank-currency">Currency</Label>
                  <AvInput id="company-bank-currency" type="select" className="form-control" name="currencyId">
                    <option value="" key="0" />
                    {currencies
                      ? currencies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/company-bank" replace color="info">
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
  banks: storeState.bank.entities,
  currencies: storeState.currency.entities,
  companyBankEntity: storeState.companyBank.entity,
  loading: storeState.companyBank.loading,
  updating: storeState.companyBank.updating,
  updateSuccess: storeState.companyBank.updateSuccess
});

const mapDispatchToProps = {
  getBanks,
  getCurrencies,
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
)(CompanyBankUpdate);
