import { useState,useEffect } from "react";
import {db} from '../firebase/config'
import { collection,query,orderBy,onSnapshot,where, QuerySnapshot } from "firebase/firestore";

export const useFetchDocument = (docCollection,search = null,uid = null) => {
    const [documents,setDocuments] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)

    //lidar com vazamento de memória
    const [cancelled,setCancelled] = useState(false)

    useEffect(()=>{
        async function loadData(){
            if(cancelled)return

            setLoading(true)

            const collectionRef = await collection(db,docCollection)

            try {
                let q;
                //busca
                ///dashboard

                if(search){
                    //array contains é um metodo do firebase que ve se em um array contem algo
                    q = await(query(collectionRef,where("tagsArray","array-contains",search),orderBy("createdAt",'desc')))
                }else if(uid){
                    q = await(query(collectionRef,where("uid","==",uid),orderBy("createdAt",'desc')))
                }else{
                    q = await query(collectionRef,orderBy("createdAt",'desc'))

                }
                //mapear dados, quando tiver um dado alterado ele busca 
                await onSnapshot(q,(querySnapshot) =>{
                    setDocuments(
                        querySnapshot.docs.map((doc)=>({
                            id:doc.id,
                            ...doc.data(),
                        }))
                    )
                })

                setLoading(false)

            } catch (error) {
                
                console.log(error)
                setError(error.message)
                setLoading(false)
            }
        }
        loadData();
    },
    [docCollection,search,uid,cancelled])

    useEffect(()=>{
        return () =>setCancelled(true)
    },[])

    return {documents,loading,error};
}