import { useRef, useEffect, useState } from "react";
import { moviesApi, tvApi } from "../../../api";

const useSearch = () => {
    const [movieResults, setMovieResults] = useState(null);
    const [tvResults, setTvResults] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const form = useRef();
    const searchWithKeyword = async event => {
        event.preventDefault();
        try{
            setLoading(true);
            setKeyword(event.target[0].value);
            const {
                data: {results: movieResults}
            } = await moviesApi.search(event.target[0].value);
            const {
                data: {results: tvResults}
            } = await tvApi.search(event.target[0].value);
            setMovieResults(movieResults);
            setTvResults(tvResults);
        }catch(e){
            console.log(e);
            setError(true);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        if(form.current){
            form.current.addEventListener("submit", searchWithKeyword);
        }
        return () => {
            if(form.current){
                form.current.removeEventListener("submit", searchWithKeyword);
            }
        }
    }, [])
    return {form, movieResults, tvResults, keyword, loading, error};
}
export default useSearch;