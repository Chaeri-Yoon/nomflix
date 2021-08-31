import { useRef, useEffect, useState } from "react";

const useSubmitForm = (history, pathname) => {
    const form = useRef();
    const [keyword, setKeyword] = useState("");

    const keyword_temp = pathname.substring('/search/'.length, pathname.length);
    (keyword !== keyword_temp) && setKeyword(keyword_temp);

    const directPage = (event) => {
        event.preventDefault();
        if(!(event.target[0].value === ""))    history.push(`/search/${event.target[0].value}`)
    }

    const keywordOnForm = () => form.current[0].value = keyword;

    useEffect(() => {
        if(form.current){
            form.current.addEventListener("submit", directPage);
            keywordOnForm();
        }
        return () => {
            if(form.current){
                form.current.removeEventListener("submit", directPage);
            }
        }
    }, [])
    useEffect(() => keywordOnForm(), [keyword]);

    return form;
}
export default useSubmitForm;