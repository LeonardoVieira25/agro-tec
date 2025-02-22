import { useEffect, useState } from "react";

export default function LoadingWarper ({
    loading,
    loaded,
    value
}:{
    loading: JSX.Element,
    loaded: JSX.Element,
    value: boolean
}) {

    const [currentComponent, setCurrentComponent] = useState<JSX.Element>(loading);

    useEffect(() => {
        setCurrentComponent(value ? loading : loaded)        
    }, [value])
    
    return currentComponent
}