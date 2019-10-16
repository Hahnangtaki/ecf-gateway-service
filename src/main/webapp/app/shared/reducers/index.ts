import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import globalParameter, {
  GlobalParameterState
} from 'app/entities/global-parameter/global-parameter.reducer';
// prettier-ignore
import category, {
  CategoryState
} from 'app/entities/category/category.reducer';
// prettier-ignore
import city, {
  CityState
} from 'app/entities/city/city.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import province, {
  ProvinceState
} from 'app/entities/province/province.reducer';
// prettier-ignore
import bank, {
  BankState
} from 'app/entities/bank/bank.reducer';
// prettier-ignore
import companyBank, {
  CompanyBankState
} from 'app/entities/company-bank/company-bank.reducer';
// prettier-ignore
import currency, {
  CurrencyState
} from 'app/entities/currency/currency.reducer';
// prettier-ignore
import tax, {
  TaxState
} from 'app/entities/tax/tax.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly globalParameter: GlobalParameterState;
  readonly category: CategoryState;
  readonly city: CityState;
  readonly country: CountryState;
  readonly province: ProvinceState;
  readonly bank: BankState;
  readonly companyBank: CompanyBankState;
  readonly currency: CurrencyState;
  readonly tax: TaxState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  globalParameter,
  category,
  city,
  country,
  province,
  bank,
  companyBank,
  currency,
  tax,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
