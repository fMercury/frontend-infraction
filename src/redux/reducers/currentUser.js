import { type as loginType } from '../actions/login';
import { type as registerType } from '../actions/register';
import { type as logoutType } from '../actions/logout';
import { type as updateProfileType } from '../actions/updateProfile';

const defaultState = {
  jwt: false,
};

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case loginType: {
      return {
        ...state,
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGFuZGlsLmRldiIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.yRKvF6EP78lqkOHNls37eeUBh4k3LPZ39HbNrnPfDfs',
        profile: {
          name: 'Test User',
          cars: ['aaa000', 'zzz999'],
          email: payload.email,
        },
      };
    }
    case registerType: {
      return {
        ...state,
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGFuZGlsLmRldiIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.yRKvF6EP78lqkOHNls37eeUBh4k3LPZ39HbNrnPfDfs',
        profile: {
          name: 'Test User',
          cars: ['aaa000', 'zzz999'],
          email: payload.email,
        },
      };
    }
    case updateProfileType: {
      return {
        ...state,
        profile: {
          name: payload.name,
          lastname: payload.lastname,
          cuil: payload.cuil,
          phone: payload.phone,
          email: payload.email,
          password: payload.password,
        },
      };
    }
    case logoutType: {
      return {
        ...state,
        jwt: false,
        profile: null,
      };
    }
    default: return state;
  }
};

export default reducer;
