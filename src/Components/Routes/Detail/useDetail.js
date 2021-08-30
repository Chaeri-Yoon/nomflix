import { useState, useEffect } from "react";
import { moviesApi, tvApi } from "../../../api";

const useDetail = (id, isMovie) => {
    const [mediaData, setMediaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getMediaData = async() => {
        try{
            let result;
            if(isMovie) {
                ({data: result} = await moviesApi.detail(id));
              }
            else{
                ({data: result} = await tvApi.detail(id));
            }
            setMediaData(result);
        }catch(e){
            console.log(e);
            setError(true);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => getMediaData(), []);
    return {mediaData, loading, error}
}
export default useDetail;