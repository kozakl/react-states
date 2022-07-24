import {ComponentProps, ReactNode} from 'react';
import {createState, Downgraded,
        State, useState} from '@hookstate/core';
import {Toast} from '@kozakl/components/toasts/toast';

let id = 0;

const toasts = createState<ComponentProps<typeof Toast>[]>([]);
const wrapper = (state:State<ComponentProps<typeof Toast>[]>)=> ({
    get: ()=>
        state.attach(Downgraded).value,
    createToast: (body:ReactNode, autoClose = true)=>
        state.merge([{
            id: id++,
            body,
            autoClose
        }
    ]),
    deleteToast: (id:number)=>
        state.set((state)=>
            state.filter((toast)=>
                toast.id != id))
});

export const toastsState = (()=> wrapper(toasts))();
export const useToastsState = ()=> wrapper(
    useState<ComponentProps<typeof Toast>[]>(toasts));
