import React, {useEffect} from "react";
import OverlayScrollbars from "overlayscrollbars";

const config ={}

const useScrollBar = (root:any) => {
    useEffect(()=>{
        let scrollbars:OverlayScrollbars
        if (root.current){
            scrollbars = OverlayScrollbars(root.current,config)
        }
        return ()=>{
            if (scrollbars){
                scrollbars.destroy()
            }
        }
    },[root])
}

export {useScrollBar}