import Helmet from "react-helmet";
import styled from "styled-components";

import React, { useEffect, useState } from "react";
import Results from "@components/routes/Search/Results";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
`;
const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
`;
const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`;

const SearchForm = () => {
    const [keyword, setKeyword] = useState("");
    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        setKeyword(value);
    }
    return (
        <>
            <Helmet>
                <title>Search | Nomflix</title>
            </Helmet>
            <Container>
                <Form>
                    <Input onChange={handleInputChange} placeholder="Search Movies or TV Shows..."></Input>
                </Form>
            </Container>
            <Results keyword={keyword} />
        </>
    )
}
export default SearchForm;
