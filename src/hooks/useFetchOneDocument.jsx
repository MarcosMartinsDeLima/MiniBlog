import { useState,useEffect } from "react";
import {db} from '../firebase/config'
import { doc,getDoc} from "firebase/firestore";

export const useFetchOneDocument = (docCollection,id) => {
    const [document,setDocument] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)

    //lidar com vazamento de memória
    const [cancelled,setCancelled] = useState(false)

    useEffect(()=>{
        async function loadDocument(){
            if(cancelled)return

            setLoading(true)

            try {
                const docRef = await doc(db,docCollection,id)
                const docSnap = await getDoc(docRef)

                setDocument(docSnap.data())
                setLoading(false)

            } catch (error) {
                setError(error.message)
                setLoading(false)
            }

        }
        loadDocument();
    },
    [docCollection,id])

    useEffect(()=>{
        return () =>setCancelled(true)
    },[])

    return {document,loading,error};
}