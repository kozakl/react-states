import {ReactNode} from 'react';
import {createState, Downgraded,
        State, useState} from '@hookstate/core';

let id = 0;

const toasts = createState<ToastProps[]>([]);
const wrapper = (state:State<ToastProps[]>)=> ({
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

interface ToastProps {
    className?:string;
    id?:number;
    body?:ReactNode;
    autoClose?:boolean;
}

export const toastsState = (()=> wrapper(toasts))();
export const useToastsState = ()=> wrapper(useState<ToastProps[]>(toasts));
