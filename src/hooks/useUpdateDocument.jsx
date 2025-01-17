import { useState,useEffect,useReducer } from "react";
import {db} from '../firebase/config'
import { updateDoc,doc } from "firebase/firestore";

const initialState = {
    loading:null,
    error:null
}

const updateReducer = (state,action) =>{
    switch(action.type){
        case "LOADING":
            return {loading:true,error:null}
        case "UPDATE_DOC":
            return {loading:false,error:null}
        case "ERROR":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const useUpdateDocument = (docCollection) =>{
    const [response,dispatch] = useReducer(updateReducer,initialState)
    
    //lidar com vazamento de memória
    const [cancelled,setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) =>{
        if(!cancelled){
            dispatch(action)
        }
    }

    const updateDocument = async(uid,data) =>{

        checkCancelBeforeDispatch({type:"LOADING"})

        try {
            const docRef = await doc(db,docCollection,uid)
            const updatedDocument = await updateDoc(docRef,data)

            checkCancelBeforeDispatch({type:"UPDATE_DOC",payload:updatedDocument})

        } catch (error) {
            console.log(error.message )
            checkCancelBeforeDispatch({type:"ERROR",payload:error.message})
        }
    }

    useEffect(() =>{
        return () => setCancelled(true)
    },[])
    return {updateDocument,response}
}