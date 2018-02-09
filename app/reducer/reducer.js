import CONST from "../config/Const";

const initialState = {
    tax: CONST.TAX.IR,
    laws: [],
};

const reducers = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case CONST.ACTIONS.SELECT_TAX:
            return Object.assign({}, state, {
                tax: action.tax,
            });
        default:
            return state;
    }
};

export const returnState = state => {
    return state;
};


export default reducers;