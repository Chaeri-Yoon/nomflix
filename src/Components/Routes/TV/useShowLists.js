import { useState, useEffect } from "react";
import { tvApi } from "../../../api";

const useShowLists = () => {
    const [topRatedShows, setTopRatedShows] = useState(null);
    const [popularShows, setPopularShows] = useState(null);
    const [airingTodayShows, setAiringTodayShows] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getShowsData = async() => {
        try{
            const {
                data: {results : _topRated}
            } = await tvApi.topRated();
            setTopRatedShows(_topRated);

            const {
                data: {results : _popular}
            } = await tvApi.popular();
            setPopularShows(_popular);

            const {
                data: {results : _airingToday}
            } = await tvApi.airingToday();
            setAiringTodayShows(_airingToday);
        }catch(e){
            console.log(e);
            setError(true);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getShowsData();
    }, []);
    return {topRatedShows, popularShows, airingTodayShows, loading, error}; 
}
export default useShowLists;