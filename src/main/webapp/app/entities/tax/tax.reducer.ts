import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITax, defaultValue } from 'app/shared/model/tax.model';

export const ACTION_TYPES = {
  FETCH_TAX_LIST: 'tax/FETCH_TAX_LIST',
  FETCH_TAX: 'tax/FETCH_TAX',
  CREATE_TAX: 'tax/CREATE_TAX',
  UPDATE_TAX: 'tax/UPDATE_TAX',
  DELETE_TAX: 'tax/DELETE_TAX',
  RESET: 'tax/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITax>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TaxState = Readonly<typeof initialState>;

// Reducer

export default (state: TaxState = initialState, action): TaxState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TAX_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TAX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TAX):
    case REQUEST(ACTION_TYPES.UPDATE_TAX):
    case REQUEST(ACTION_TYPES.DELETE_TAX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TAX_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TAX):
    case FAILURE(ACTION_TYPES.CREATE_TAX):
    case FAILURE(ACTION_TYPES.UPDATE_TAX):
    case FAILURE(ACTION_TYPES.DELETE_TAX):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAX_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAX):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TAX):
    case SUCCESS(ACTION_TYPES.UPDATE_TAX):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TAX):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/taxes';

// Actions

export const getEntities: ICrudGetAllAction<ITax> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TAX_LIST,
  payload: axios.get<ITax>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITax> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TAX,
    payload: axios.get<ITax>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITax> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TAX,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITax> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TAX,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITax> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TAX,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
