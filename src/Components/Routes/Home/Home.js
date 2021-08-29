import useMovieLists from "./useMovieLists";
import styled from "styled-components";
import Media from "../../Media";
import Section from "../../Section";
import Loader from "../../Loader";

const Container = styled("div")`
    display: flex;
    flex-direction: column;
`;

const Home = () => {
    const {nowPlayingMovies, upcomingMovies, popularMovies, loading, error} = useMovieLists();
    return(
        loading
        ? <Loader/>
        : (
            error
            ? "Can't get data"
            :(
                <Container>
                    <Section title="Now Playing">
                        {nowPlayingMovies && nowPlayingMovies.map(
                            nowPlayingMovie => <Media
                                                    key={nowPlayingMovie.id}
                                                    id={nowPlayingMovie.id}
                                                    imgUrl={nowPlayingMovie.poster_path}
                                                    title={nowPlayingMovie.original_title}
                                                    year={nowPlayingMovie.release_date}
                                                    rating={nowPlayingMovie.vote_average}
                                                    isMovie={true}
                                                />
                        )}
                    </Section>
                    <Section title="Upcoming Movies">
                        {upcomingMovies && upcomingMovies.map(
                            upcomingMovie   =>  <Media
                                                    key={upcomingMovie.id}
                                                    id={upcomingMovie.id}
                                                    imgUrl={upcomingMovie.poster_path}
                                                    title={upcomingMovie.original_title}
                                                    year={upcomingMovie.release_date}
                                                    rating={upcomingMovie.vote_average}
                                                    isMovie={true}
                                                />
                        )}
                    </Section>
                    <Section title="Popular Movies">
                        {popularMovies && popularMovies.map(
                            popularMovie    =>  <Media
                                                    key={popularMovie.id}
                                                    id={popularMovie.id}
                                                    imgUrl={popularMovie.poster_path}
                                                    title={popularMovie.original_title}
                                                    year={popularMovie.release_date}
                                                    rating={popularMovie.vote_average}
                                                    isMovie={true}
                                                />
                        )}
                    </Section>
                </Container>
            )
        )
    )
}
export default Home;