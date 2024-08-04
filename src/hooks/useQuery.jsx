import { useLocation } from "react-router-dom";
import { useMemo } from "react";

//pegar parametro da url
export function useQuery(){
    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search),[search])
}