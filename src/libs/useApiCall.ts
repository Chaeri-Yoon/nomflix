import { axiosInstance } from "@src/api";
import { useState } from "react";

interface IState<T> {
    data?: T,
    loading: boolean,
    error?: object
}
const axiosParams = {
    api_key: process.env.REACT_APP_API_KEY,
    language: "en-US"
}
function useApiCall<T = any>(url: string): ([(data?: any) => void, IState<T>]) {
    const [state, setState] = useState<IState<T>>({} as IState<T>);
    const fetch = async (data?: any) => {
        setState(prev => ({ ...prev, loading: true }));
        await axiosInstance.request({
            method: data?.method || 'GET',
            url,
            data,
            params: { ...axiosParams, ...data?.params }
        }).then(response => setState(prev => ({ ...prev, data: response.data })))
            .catch(e => setState(prev => ({ ...prev, error: { message: e } })))
            .finally(() => setState(prev => ({ ...prev, loading: false })))
    }
    return [fetch, { ...state }]
}
export default useApiCall;