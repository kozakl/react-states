import {createState, State,
        useState} from '@hookstate/core';

const value = createState<boolean>(false);
const wrapper = (state:State<boolean>)=> ({
    get: ()=>
        state.value,
    showSpinner: ()=>
        state.set(true),
    hideSpinner: ()=>
        state.set(false)
});

export const spinnerState = (()=> wrapper(value))();
export const useSpinnerState = ()=> wrapper(useState<boolean>(value));
