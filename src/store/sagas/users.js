import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';

import { Creators as UsersActions } from '~/store/ducks/users';
import { Creators as ModalActions } from '~/store/ducks/modal';

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.user}`);

    const isDuplicated = yield select(state => state.users.data.find(user => user.id === data.id));

    if (isDuplicated) {
      yield put(UsersActions.addUserFailure('Usuário Duplicado!'));
    } else {
      const userData = {
        id: data.id,
        name: data.name,
        avatar_url: data.avatar_url,
        login: data.login,
        bio: data.bio,
        coordinate: action.payload.coordinate,
      };

      yield put(UsersActions.addUserSuccess(userData));
      yield put(ModalActions.hideModal());
    }
  } catch (err) {
    yield put(UsersActions.addUserFailure('Erro ao adicionar Usuário!'));
  }
}
