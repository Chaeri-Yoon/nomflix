import styled from "styled-components";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Loader from "../../Loader";
import Media from "../../Media";
import Section from "../../Section";
import useSearch from "./useSearch";
import TypeChecker from "../../TypeChecker";

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
const Results = styled.div``;
const NotFound = styled.span``;
const Search = () => {
    const {form, movieResults, tvResults, keyword, loading, error} = useSearch();
    TypeChecker({form, movieResults, tvResults, keyword, loading, error}, propTypes);
    return(
        <>
            <Helmet>
                <title>Search | Nomflix</title>
            </Helmet>
            <Container>
                <Form ref={form}>
                    <Input placeholder="Search Movies or TV Shows..."></Input>
                </Form>
                {loading
                    ? <Loader/>
                    : (
                        error
                        ? "Can't get data"
                        : (
                            <Results>
                                {movieResults && movieResults.length > 0 && (
                                    <Section title="Movie Results">
                                        {movieResults.map(
                                            movie => <Media
                                                        key={movie.id}
                                                        id={movie.id}
                                                        imgUrl={movie.poster_path}
                                                        title={movie.original_title}
                                                        year={movie.release_date}
                                                        rating={movie.vote_average}
                                                        isMovie={true}
                                                    />
                                        )}
                                    </Section>
                                )}
                                {tvResults && tvResults.length > 0 && (
                                    <Section title="TV Show Results">
                                        {tvResults.map(
                                            show => <Media
                                                        key={show.id}
                                                        id={show.id}
                                                        imgUrl={show.poster_path}
                                                        title={show.original_name}
                                                        year={show.first_air_date}
                                                        rating={show.vote_average}
                                                    />
                                        )}
                                    </Section>
                                )}
                                {keyword !== "" &&
                                !(movieResults && movieResults.length > 0) && 
                                !(tvResults && tvResults.length > 0) &&
                                    <NotFound>{`Not found ${keyword}`}</NotFound>
                                }
                            </Results>
                        )
                    )
                }
            </Container>
        </>
    )
}
const propTypes = {
    form: PropTypes.object.isRequired,
    movieResults: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            poster_path: PropTypes.string,
            original_title: PropTypes.string.isRequired,
            release_date: PropTypes.string,
            vote_average: PropTypes.number
        })
    ),
    tvResults: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            poster_path: PropTypes.string,
            original_name: PropTypes.string.isRequired,
            first_air_date: PropTypes.string,
            vote_average: PropTypes.number
        })
    ),
    keyword: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};
export default Search;
