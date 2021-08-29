import { useState, useEffect } from "react";

let loading;
const icons = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧", ];
const useLoaderIcon = () => {
    const [iconIndex, setIconIndex] = useState(0);
    const [icon, setIcon] = useState(icons[0]);

    const changeIndex = () => {
        if(iconIndex === icons.length - 1)  setIconIndex(0);
        else setIconIndex(iconIndex => iconIndex + 1);
    } 
    const changeIcon = () => {
        setIcon(icons[iconIndex]);
    }
    const StartLoader = () => {
        if(loading) return;
        loading = setInterval(changeIndex, 500);
    }
    const StopLoader = () => {
        clearInterval(loading);
        loading = null;
    }
    useEffect(() => {
        StartLoader();
        return () => StopLoader();
    }, []);
    useEffect(() => {
        changeIcon();
    }, [iconIndex])

    return icon;
}
export default useLoaderIcon;