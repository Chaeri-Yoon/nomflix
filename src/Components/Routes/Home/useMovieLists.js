import { useState, useEffect } from "react";
import { moviesApi } from "../../../api";

const useMovieLists = () => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState(null);
    const [upcomingMovies, setUpcomingMovies] = useState(null);
    const [popularMovies, setPopularMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getMoviesData = async () => {
        try{
            const {
                data: {results : _nowPlaying}
            } = await moviesApi.nowPlaying();
            setNowPlayingMovies(_nowPlaying);

            const {
                data: {results : _upcoming}
            } = await moviesApi.upcoming();
            setUpcomingMovies(_upcoming);

            const {
                data: {results : _popular}
            } = await moviesApi.popular();
            setPopularMovies(_popular);
        }catch(e){
            console.log(e);
            setError(true);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getMoviesData();
    }, []);
    return {nowPlayingMovies, upcomingMovies, popularMovies, loading, error}; 
}
export default useMovieLists;