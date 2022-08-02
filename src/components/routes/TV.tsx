import { useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import Media from "@components/Media";
import Section from "@components/Section";
import Loader from "@components/Loader";
import useApiCall from "@libs/useApiCall";
import { IMediaDataResult } from "@src/types";

const Container = styled("div")`
    padding: 20px;
    
    display: flex;
    flex-direction: column;
`;

const TV = () => {
    const [getTopRatedShows, { data: topRatedShows, loading: loading_topRatedShows }] = useApiCall<IMediaDataResult>('/tv/top_rated');
    const [getPopularShows, { data: popularShows, loading: loading_popularShows }] = useApiCall<IMediaDataResult>('/tv/popular');
    const [getAiringTodayShows, { data: airingTodayShows, loading: loading_airingTodayShows }] = useApiCall<IMediaDataResult>('/tv/airing_today');

    useEffect(() => {
        if (!loading_topRatedShows) getTopRatedShows();
        if (!loading_popularShows) getPopularShows();
        if (!loading_airingTodayShows) getAiringTodayShows();
    }, []);

    return (
        <>
            <Helmet>
                <title>TV Shows | Nomflix</title>
            </Helmet>
            <Container>
                <Section title="Top Rated Shows">
                    {loading_topRatedShows ?
                        <Loader /> : (
                            topRatedShows?.results && topRatedShows.results.map(
                                topRatedShow => <Media
                                    key={topRatedShow.id}
                                    id={topRatedShow.id}
                                    imgUrl={topRatedShow.poster_path}
                                    title={topRatedShow.original_name}
                                    year={topRatedShow.first_air_date}
                                    rating={topRatedShow.vote_average}
                                />
                            )
                        )
                    }
                </Section>
                <Section title="Popular Shows">
                    {loading_popularShows ?
                        <Loader /> : (
                            popularShows?.results && popularShows.results.map(
                                popularShow => <Media
                                    key={popularShow.id}
                                    id={popularShow.id}
                                    imgUrl={popularShow.poster_path}
                                    title={popularShow.original_name}
                                    year={popularShow.first_air_date}
                                    rating={popularShow.vote_average}
                                />
                            )
                        )
                    }
                </Section>
                <Section title="Airing Today">
                    {loading_airingTodayShows ?
                        <Loader /> : (
                            airingTodayShows?.results && airingTodayShows.results.map(
                                airingTodayShow => <Media
                                    key={airingTodayShow.id}
                                    id={airingTodayShow.id}
                                    imgUrl={airingTodayShow.poster_path}
                                    title={airingTodayShow.original_name}
                                    year={airingTodayShow.first_air_date}
                                    rating={airingTodayShow.vote_average}
                                />
                            )
                        )
                    }
                </Section>
            </Container>
        </>
    )
}
export default TV;