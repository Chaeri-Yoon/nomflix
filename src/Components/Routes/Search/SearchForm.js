import styled from "styled-components";
import Helmet from "react-helmet";

import useSubmitForm from "./useSubmitForm";

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

const SearchForm = ({history, location: {pathname}}) => {
    // WithRouter
    const form = useSubmitForm(history, pathname);

    return(
        <>
            <Helmet>
                <title>Search | Nomflix</title>
            </Helmet>
            <Container>
                <Form ref={form}>
                    <Input placeholder="Search Movies or TV Shows..."></Input>
                </Form>
            </Container>
        </>
    )
}
export default SearchForm;
