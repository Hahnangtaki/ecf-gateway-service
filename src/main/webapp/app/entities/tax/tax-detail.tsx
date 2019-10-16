import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tax.reducer';
import { ITax } from 'app/shared/model/tax.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaxDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TaxDetail extends React.Component<ITaxDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { taxEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Tax [<b>{taxEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="taxCode">Tax Code</span>
            </dt>
            <dd>{taxEntity.taxCode}</dd>
            <dt>
              <span id="shortDesc">Short Desc</span>
            </dt>
            <dd>{taxEntity.shortDesc}</dd>
            <dt>
              <span id="longDesc">Long Desc</span>
            </dt>
            <dd>{taxEntity.longDesc}</dd>
            <dt>
              <span id="createSystemDate">Create System Date</span>
            </dt>
            <dd>
              <TextFormat value={taxEntity.createSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createDate">Create Date</span>
            </dt>
            <dd>
              <TextFormat value={taxEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createUserId">Create User Id</span>
            </dt>
            <dd>{taxEntity.createUserId}</dd>
            <dt>
              <span id="lastModificationSystemDate">Last Modification System Date</span>
            </dt>
            <dd>
              <TextFormat value={taxEntity.lastModificationSystemDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationDate">Last Modification Date</span>
            </dt>
            <dd>
              <TextFormat value={taxEntity.lastModificationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModificationUserId">Last Modification User Id</span>
            </dt>
            <dd>{taxEntity.lastModificationUserId}</dd>
          </dl>
          <Button tag={Link} to="/entity/tax" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/tax/${taxEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ tax }: IRootState) => ({
  taxEntity: tax.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaxDetail);
