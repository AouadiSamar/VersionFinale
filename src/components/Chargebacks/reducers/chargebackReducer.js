import { TOGGLE_ACTIVE_STATUS } from '../actions';

const initialState = {
  chargebacks: [],
};

const chargebackReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACTIVE_STATUS:
      return {
        ...state,
        chargebacks: state.chargebacks.map(cb => {
          if (cb.id === action.payload.chargebackId) {
            return {
              ...cb,
              is_active: !action.payload.isActive,
              status: !action.payload.isActive ? "Reactivated" : "Desactivated",
            };
          }
          return cb;
        }),
      };
    default:
      return state;
  }
};

export default chargebackReducer;
