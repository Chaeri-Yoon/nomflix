import { useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import Media from "@components/Media";
import Section from "@components/Section";
import Loader from "@components/Loader";
import useApiCall from "@libs/useApiCall";
import { IMediaData, IMediaDataResult } from "@src/types";

const Container = styled("div")`
    padding: 20px;
    display: flex;
    flex-direction: column;
`;
const Home = () => {
    const [getNowPlayingMovies, { data: nowPlayingMovies, loading: loading_nowPlaying }] = useApiCall<IMediaDataResult>('/movie/now_playing');
    const [getUpcomingMovies, { data: upcomingMovies, loading: loading_upcoming }] = useApiCall<IMediaDataResult>('/movie/upcoming');
    const [getPopularMovies, { data: popularMovies, loading: loading_popular }] = useApiCall<IMediaDataResult>('/movie/popular');

    useEffect(() => {
        if (!loading_nowPlaying) getNowPlayingMovies();
        if (!loading_upcoming) getUpcomingMovies();
        if (!loading_popular) getPopularMovies();
    }, []);

    return (
        <>
            <Helmet>
                <title>Movies | Nomflix</title>
            </Helmet>
            <Container>
                <Section title="Now Playing">
                    {loading_nowPlaying ?
                        <Loader /> : (
                            nowPlayingMovies?.results && nowPlayingMovies.results.map(
                                nowPlayingMovie => <Media
                                    key={nowPlayingMovie.id}
                                    id={nowPlayingMovie.id}
                                    imgUrl={nowPlayingMovie.poster_path}
                                    title={nowPlayingMovie.original_title}
                                    year={nowPlayingMovie.release_date}
                                    rating={nowPlayingMovie.vote_average}
                                    isMovie={true}
                                />
                            )
                        )
                    }
                </Section>
                <Section title="Upcoming Movies">
                    {loading_upcoming ?
                        <Loader /> : (
                            upcomingMovies?.results && upcomingMovies.results.map(
                                upcomingMovie => <Media
                                    key={upcomingMovie.id}
                                    id={upcomingMovie.id}
                                    imgUrl={upcomingMovie.poster_path}
                                    title={upcomingMovie.original_title}
                                    year={upcomingMovie.release_date}
                                    rating={upcomingMovie.vote_average}
                                    isMovie={true}
                                />
                            )
                        )
                    }
                </Section>
                <Section title="Popular Movies">
                    {loading_popular ?
                        <Loader /> : (
                            popularMovies?.results && popularMovies.results.map(
                                popularMovie => <Media
                                    key={popularMovie.id}
                                    id={popularMovie.id}
                                    imgUrl={popularMovie.poster_path}
                                    title={popularMovie.original_title}
                                    year={popularMovie.release_date}
                                    rating={popularMovie.vote_average}
                                    isMovie={true}
                                />
                            )
                        )
                    }
                </Section>
            </Container>
        </>
    )
}
export default Home;