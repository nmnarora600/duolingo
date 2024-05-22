import {create} from "zustand"

type PracticeModalState={
    isOpen:boolean,
    open:()=>void,
    close:()=>void
}

export const usePracticeModal= create<PracticeModalState>((set)=>({
    isOpen:false, //change to false back
    open:()=>set({isOpen:true}),
    close:()=>set({isOpen:false}),
}))