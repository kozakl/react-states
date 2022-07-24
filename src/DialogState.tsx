import {ComponentProps} from 'react';
import {createState, Downgraded,
        State, useState} from '@hookstate/core';
//import {Dialog} from '../components/dialog';

let id = 0;

const dialogs = createState<ComponentProps<any>[]>([]);
const wrapper = (state:State<ComponentProps<any>[]>)=> ({
    get: ()=>
        state.attach(Downgraded).value,
    createDialog: (dialog:ComponentProps<any>)=>
        state.merge([{
            id: id++,
            ...dialog
        }]),
    deleteDialog: (id:number)=>
        state.set((state)=>
            state.filter((dialog)=>
                dialog.id != id))
});

export const dialogsState = (()=> wrapper(dialogs))();
export const useDialogsState = ()=> wrapper(
    //useState<ComponentProps<typeof Dialog>[]>(dialogs));
    useState<ComponentProps<any>[]>(dialogs));
