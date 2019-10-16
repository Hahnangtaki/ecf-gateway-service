import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './category.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICategoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Category extends React.Component<ICategoryProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { categoryList, match } = this.props;
    return (
      <div>
        <h2 id="category-heading">
          Categories
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Category
          </Link>
        </h2>
        <div className="table-responsive">
          {categoryList && categoryList.length > 0 ? (
            <Table responsive aria-describedby="category-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cat Code</th>
                  <th>Cat Name</th>
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
                {categoryList.map((category, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${category.id}`} color="link" size="sm">
                        {category.id}
                      </Button>
                    </td>
                    <td>{category.catCode}</td>
                    <td>{category.catName}</td>
                    <td>
                      <TextFormat type="date" value={category.createSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={category.createDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{category.createUserId}</td>
                    <td>
                      <TextFormat type="date" value={category.lastModificationSystemDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={category.lastModificationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{category.lastModificationUserId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${category.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${category.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${category.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Categories found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ category }: IRootState) => ({
  categoryList: category.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
