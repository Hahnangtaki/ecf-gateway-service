import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bank.reducer';
import { IBank } from 'app/shared/model/bank.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BankDetail extends React.Component<IBankDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bankEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Bank [<b>{bankEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="bankCode">Bank Code</span>
            </dt>
            <dd>{bankEntity.bankCode}</dd>
            <dt>
              <span id="bankName">Bank Name</span>
            </dt>
            <dd>{bankEntity.bankName}</dd>
            <dt>
              <span id="initialName">Initial Name</span>
            </dt>
            <dd>{bankEntity.initialName}</dd>
            <dt>
              <span id="biCode">Bi Code</span>
            </dt>
            <dd>{bankEntity.biCode}</dd>
            <dt>
              <span id="swiftCode">Swift Code</span>
            </dt>
            <dd>{bankEntity.swiftCode}</dd>
            <dt>
              <span id="createSystemDate">Create System Date</span>
            </dt>
            <dd>
              <TextFormat value={bankEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">Create Date</span>
            </dt>
            <dd>
              <TextFormat value={bankEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">Create User Id</span>
            </dt>
            <dd>{bankEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">Last Modification System Date</span>
            </dt>
            <dd>
              <TextFormat value={bankEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">Last Modification Date</span>
            </dt>
            <dd>
              <TextFormat value={bankEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">Last Modification User Id</span>
            </dt>
            <dd>{bankEntity.lastModificationUserId}</dd>
          </dl>
          <Button tag={Link} to="/entity/bank" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/bank/${bankEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ bank }: IRootState) => ({
  bankEntity: bank.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankDetail);
