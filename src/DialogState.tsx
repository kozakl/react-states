import {ReactNode} from 'react';
import {createState, Downgraded,
        State, useState} from '@hookstate/core';

let id = 0;

const dialogs = createState<DialogProps[]>([]);
const wrapper = (state:State<DialogProps[]>)=> ({
    get: ()=>
        state.attach(Downgraded).value,
    createDialog: (dialog:DialogProps)=>
        state.merge([{
            id: id++,
            ...dialog
        }]),
    deleteDialog: (id:number)=>
        state.set((state)=>
            state.filter((dialog)=>
                dialog.id != id))
});

interface DialogProps {
    className?:string;
    id?:number;
    title:string;
    message:ReactNode;
    reversed?:boolean;
    confirm?:string;
    dismiss?:string;
    onConfirm?:()=> void;
    onDismiss?:()=> void;
}

export const dialogsState = (()=> wrapper(dialogs))();
export const useDialogsState = ()=> wrapper(useState<DialogProps[]>(dialogs));
