import {getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'


import {useState,useEffect} from 'react'
import { app } from '../firebase/config'

export const useAuthentication = () =>{
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)

    //cleanup (lidar com vazamento de memória)
    const [cancelled,setCancelled] = useState(false)

    const auth = getAuth(app)

    function checkIfIsCancelled(){
        if(cancelled){return}
    }

    //register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)
        
        try {
            const {user} = await createUserWithEmailAndPassword(auth,data.email,data.password)

            await updateProfile(user,{
                displayName:data.displayName   
            })

            setLoading(false)
            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemError;

            if(error.message.includes("Password")){
                systemError = "A senha precisa conter pelo menos 6 caracteres"
            }else if(error.message.includes('invalid-email')){
                systemError = "Email invalido"
            }
            setLoading(false)
            setError(systemError)
        }

        
    };
    
    //logout
    const logout = () =>{
        checkIfIsCancelled()
        signOut(auth)
    }

    //login
    const login = async (data)=>{
        checkIfIsCancelled();

        setLoading(true)
        setError(false)

        try {
            
            await signInWithEmailAndPassword(auth,data.email,data.password)
            setLoading(false)

        } catch (error) {
            let systemError;

            if(error.message.includes("invalid-credential")){
                systemError = "Email ou senha invalidos!"
            }else if(error.message.includes('wrong-password')){
                systemError = "Senha invalida!"
            }else{
                systemError = 'Ocorreu um erro, por favor tente mais tarde!'
            }

            setError(systemError)
            setLoading(false)
        }

    }

    useEffect(()=>{
        return () => setCancelled(true)
    },[])

    return{
        auth,createUser,error,loading,logout,login
    }
}