import { useEffect } from "react";
import styled from "styled-components";

import Loader from "@components/Loader";
import Media from "@components/Media";
import Section from "@components/Section";
import useApiCall from "@libs/useApiCall";
import { IMediaDataResult } from "@src/types";


const Container = styled.div`
    padding: 0 20px;
`;
const NotFound = styled.span`
    padding: 0 20px;
`;

const Results = ({ keyword }: { keyword: string }) => {
    const [getMovieResults, { data: movieResults, loading: loading_movie }] = useApiCall<IMediaDataResult>('/search/movie');
    const [getTvResults, { data: tvResults, loading: loading_tv }] = useApiCall<IMediaDataResult>('/search/tv');

    useEffect(() => {
        if (keyword === "") return;
        if (!loading_movie) getMovieResults({
            params: {
                query: encodeURIComponent(keyword)
            }
        })
        if (!loading_tv) getTvResults({
            params: {
                query: encodeURIComponent(keyword)
            }
        })
    }, [keyword]);
    return (
        <Container>
            {!loading_movie && (
                movieResults?.results && movieResults.results.length > 0 && (
                    <Section title="Movie Results">
                        {movieResults.results.map(
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
                )
            )
            }
            {!loading_tv && (
                tvResults?.results && tvResults.results.length > 0 && (
                    <Section title="Movie Results">
                        {tvResults.results.map(
                            tv => <Media
                                key={tv.id}
                                id={tv.id}
                                imgUrl={tv.poster_path}
                                title={tv.original_title}
                                year={tv.release_date}
                                rating={tv.vote_average}
                            />
                        )}
                    </Section>
                )
            )
            }
            {keyword !== "" &&
                !(movieResults?.results && movieResults.results.length > 0) &&
                !(tvResults?.results && tvResults.results.length > 0) &&
                <NotFound>{`Not found ${keyword}`}</NotFound>
            }
        </Container>
    )
};
export default Results;