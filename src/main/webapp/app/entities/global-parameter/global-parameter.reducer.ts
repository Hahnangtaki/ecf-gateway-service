import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGlobalParameter, defaultValue } from 'app/shared/model/global-parameter.model';

export const ACTION_TYPES = {
  FETCH_GLOBALPARAMETER_LIST: 'globalParameter/FETCH_GLOBALPARAMETER_LIST',
  FETCH_GLOBALPARAMETER: 'globalParameter/FETCH_GLOBALPARAMETER',
  CREATE_GLOBALPARAMETER: 'globalParameter/CREATE_GLOBALPARAMETER',
  UPDATE_GLOBALPARAMETER: 'globalParameter/UPDATE_GLOBALPARAMETER',
  DELETE_GLOBALPARAMETER: 'globalParameter/DELETE_GLOBALPARAMETER',
  RESET: 'globalParameter/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGlobalParameter>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type GlobalParameterState = Readonly<typeof initialState>;

// Reducer

export default (state: GlobalParameterState = initialState, action): GlobalParameterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GLOBALPARAMETER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GLOBALPARAMETER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GLOBALPARAMETER):
    case REQUEST(ACTION_TYPES.UPDATE_GLOBALPARAMETER):
    case REQUEST(ACTION_TYPES.DELETE_GLOBALPARAMETER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GLOBALPARAMETER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GLOBALPARAMETER):
    case FAILURE(ACTION_TYPES.CREATE_GLOBALPARAMETER):
    case FAILURE(ACTION_TYPES.UPDATE_GLOBALPARAMETER):
    case FAILURE(ACTION_TYPES.DELETE_GLOBALPARAMETER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GLOBALPARAMETER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_GLOBALPARAMETER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GLOBALPARAMETER):
    case SUCCESS(ACTION_TYPES.UPDATE_GLOBALPARAMETER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GLOBALPARAMETER):
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

const apiUrl = 'api/global-parameters';

// Actions

export const getEntities: ICrudGetAllAction<IGlobalParameter> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GLOBALPARAMETER_LIST,
  payload: axios.get<IGlobalParameter>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IGlobalParameter> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GLOBALPARAMETER,
    payload: axios.get<IGlobalParameter>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGlobalParameter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GLOBALPARAMETER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGlobalParameter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GLOBALPARAMETER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGlobalParameter> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GLOBALPARAMETER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
