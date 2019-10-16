import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/global-parameter">
      Global Parameter
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/category">
      Category
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/city">
      City
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/country">
      Country
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/province">
      Province
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/bank">
      Bank
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/company-bank">
      Company Bank
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/currency">
      Currency
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/tax">
      Tax
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
