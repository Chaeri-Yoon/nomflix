import styled from "styled-components";
import PropTypes from "prop-types";

import useSearch from "./useSearch";
import Loader from "../../Loader";
import Media from "../../Media";
import Section from "../../Section";

import TypeChecker from "../../TypeChecker";

const Container = styled.div`
    padding: 0 20px;
`;
const NotFound = styled.span`
    padding: 0 20px;
`;

const Results = ({match: {params: {id}}}) => {
    const {movieResults, tvResults, loading, error} = useSearch(id);
    TypeChecker({movieResults, tvResults, loading, error}, propTypes);
    return(
        loading
            ? <Loader/>
            : (
                error
                ? "Can't get data"
                : (
                    <Container>
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
                        {id !== "" &&
                        !(movieResults && movieResults.length > 0) && 
                        !(tvResults && tvResults.length > 0) &&
                            <NotFound>{`Not found ${id}`}</NotFound>
                        }
                    </Container>
                )
            )
    )
};
const propTypes = {
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
    )
}
export default Results;