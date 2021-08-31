import { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../../../api";

const useSearch = (id) => {
    const [movieResults, setMovieResults] = useState(null);
    const [tvResults, setTvResults] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    (id !== keyword) && setKeyword(id);

    const searchWithKeyword = async () => {
        try{
            setLoading(true);

            const {
                data: {results: movieResults}
            } = await moviesApi.search(keyword);
            const {
                data: {results: tvResults}
            } = await tvApi.search(keyword);
            setMovieResults(movieResults);
            setTvResults(tvResults);
        }catch(e){
            console.log(e);
            setError(true);
        }finally{
            setLoading(false);
        }
    }
    
    useEffect(() => searchWithKeyword(), [keyword]);

    return {movieResults, tvResults, loading, error};
}
export default useSearch;