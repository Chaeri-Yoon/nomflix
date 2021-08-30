import { useState, useEffect } from "react";

let loading;
const icons = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧", ];
const useLoaderIcon = () => {
    const [iconIndex, setIconIndex] = useState(0);
    const [icon, setIcon] = useState(icons[0]);

    const changeIndex = () => {
        setIconIndex(iconIndex => iconIndex + 1);
    } 
    const changeIcon = () => {
        if(iconIndex === (icons.length - 1))    setIconIndex(0);
        setIcon(icons[iconIndex]);
    }
    const StartLoader = () => {
        if(loading) return;
        loading = setInterval(changeIndex, 100);
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