import { useEffect, useRef, useState } from "react";

const useAdditionalInfoShow = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [showProduction, setShowProduction] = useState(false);

    const videoButton = useRef();
    const productionButton = useRef();

    const changeShowVideo = () => {
        setShowVideo(true);
        setShowProduction(false);
    };
    const changeShowProduction = () => {
        setShowVideo(false);
        setShowProduction(true);
    }

    useEffect(() => {
        if(videoButton.current) videoButton.current.addEventListener('click', changeShowVideo);
        if(productionButton.current) productionButton.current.addEventListener('click', changeShowProduction);
        return () => {
            if(videoButton.current) videoButton.current.removeEventListener('click', changeShowVideo);
            if(productionButton.current) productionButton.current.removeEventListener('click', changeShowProduction);
        }
    }, []);
    return {videoButton, productionButton, showVideo, showProduction};
}
export default useAdditionalInfoShow;