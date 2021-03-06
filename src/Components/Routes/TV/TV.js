import useShowLists from "./useShowLists";
import styled from "styled-components";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Media from "../../Media";
import Section from "../../Section";
import Loader from "../../Loader";
import TypeChecker from "../../TypeChecker";

const Container = styled("div")`
    padding: 20px;
    
    display: flex;
    flex-direction: column;
`;

const TV = () => {
    const {topRatedShows, popularShows, airingTodayShows, loading, error} = useShowLists();
    TypeChecker({topRatedShows, popularShows, airingTodayShows, loading, error}, propTypes);
    return(
        <>
            <Helmet>
                <title>TV Shows | Nomflix</title>
            </Helmet> 
            {loading
            ? <Loader/>
            : (
                error
                ? "Can't get data"
                : (
                    <Container>
                        <Section title="Top Rated Shows">
                            {topRatedShows && topRatedShows.map(
                                topRatedShow   =>  <Media
                                                        key={topRatedShow.id}
                                                        id={topRatedShow.id}
                                                        imgUrl={topRatedShow.poster_path}
                                                        title={topRatedShow.original_name}
                                                        year={topRatedShow.first_air_date}
                                                        rating={topRatedShow.vote_average}
                                                    />
                            )}
                        </Section>
                        <Section title="Popular Shows">
                            {popularShows && popularShows.map(
                                popularShow   =>  <Media
                                                        key={popularShow.id}
                                                        id={popularShow.id}
                                                        imgUrl={popularShow.poster_path}
                                                        title={popularShow.original_name}
                                                        year={popularShow.first_air_date}
                                                        rating={popularShow.vote_average}
                                                    />
                            )}
                        </Section>
                        <Section title="Airing Today">
                            {airingTodayShows && airingTodayShows.map(
                                airingTodayShow   =>  <Media
                                                        key={airingTodayShow.id}
                                                        id={airingTodayShow.id}
                                                        imgUrl={airingTodayShow.poster_path}
                                                        title={airingTodayShow.original_name}
                                                        year={airingTodayShow.first_air_date}
                                                        rating={airingTodayShow.vote_average}
                                                    />
                            )}
                        </Section>
                    </Container>
                )
            )}
        </>
    )
}
const propTypes = {
    topRatedShows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            poster_path: PropTypes.string,
            original_name: PropTypes.string.isRequired,
            first_air_date: PropTypes.string,
            vote_average: PropTypes.number
        })
    ),
    popularShows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            poster_path: PropTypes.string,
            original_name: PropTypes.string.isRequired,
            first_air_date: PropTypes.string,
            vote_average: PropTypes.number
        })
    ),
    airingTodayShows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            poster_path: PropTypes.string,
            original_name: PropTypes.string.isRequired,
            first_air_date: PropTypes.string,
            vote_average: PropTypes.number
        })
    ),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};
export default TV;