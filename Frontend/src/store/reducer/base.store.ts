import { BaseAction, EBaseActions, IBaseState } from "../types/base.type";

export const reducer = (state: IBaseState, action: BaseAction): IBaseState => {
  switch (action.type) {
    case EBaseActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload.userDetails,
      };
    default:
      return state;
  }
};

export default reducer;
