import { Moment } from 'moment';

export interface IGlobalParameter {
  id?: number;
  paramCode?: string;
  paramName?: string;
  paramType?: string;
  intValue?: number;
  floatValue?: number;
  stringValue?: string;
  dateValue?: Moment;
  show?: boolean;
  edit?: boolean;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
}

export const defaultValue: Readonly<IGlobalParameter> = {
  show: false,
  edit: false
};
