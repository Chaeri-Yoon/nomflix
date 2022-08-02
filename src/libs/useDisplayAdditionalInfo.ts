import React, { useEffect, useRef, useState } from "react";

const useDisplayAdditionalInfo = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [showProduction, setShowProduction] = useState(false);
    const [showSeason, setShowSeason] = useState(false);

    const videoButton = useRef<HTMLButtonElement>(null);
    const productionButton = useRef<HTMLButtonElement>(null);
    const seasonButton = useRef<HTMLButtonElement>(null);

    const changeShowVideo = () => {
        setShowVideo(true);
        setShowProduction(false);
        setShowSeason(false);
    };
    const changeShowProduction = () => {
        setShowVideo(false);
        setShowProduction(true);
        setShowSeason(false);
    }
    const changeShowSeason = () => {
        setShowVideo(false);
        setShowProduction(false);
        setShowSeason(true);
    }

    useEffect(() => {
        if (videoButton.current) videoButton.current.addEventListener('click', changeShowVideo);
        if (productionButton.current) productionButton.current.addEventListener('click', changeShowProduction);
        if (seasonButton.current) seasonButton.current.addEventListener('click', changeShowSeason);
        return () => {
            if (videoButton.current) videoButton.current.removeEventListener('click', changeShowVideo);
            if (productionButton.current) productionButton.current.removeEventListener('click', changeShowProduction);
            if (seasonButton.current) seasonButton.current.removeEventListener('click', changeShowSeason);
        }
    }, []);
    return { videoButton, productionButton, seasonButton, showVideo, showProduction, showSeason };
}
export default useDisplayAdditionalInfo;