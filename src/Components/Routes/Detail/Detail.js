import useDetail from "./useDetail";
import Loader from "../../Loader";
import styled from "styled-components";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;
const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgUrl});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.3;
    z-index: 0;
`;
const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;
const Poster = styled.div`
    width: 30%;
    background-image: url(${props => props.bgUrl});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;
const Information = styled.div`
    display: flex;
    flex-direction: column;

    width: 70%;
    margin-left: 10px;
`;
const Title = styled.h3`
    font-size: 32px;
`;
const ItemContainer = styled.div`
  margin: 20px 0;
`;
const Year = styled.span``;
const Runtime = styled.span``;
const Genres = styled.span``;
const Divider = styled.span`
    margin: 0 5px;
    font-weight: 800;
`;
const Description = styled.span`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const Detail = ({match: {params: {id}}, location: {pathname}}) => {
    const isMovie = pathname.includes("/movie/");
    const {
        mediaData, 
        loading, 
        error
    } = useDetail(id, isMovie);

    const title =  isMovie ? mediaData && mediaData.original_title : mediaData && mediaData.original_name;
    const year = isMovie 
                ? mediaData && mediaData.release_date && mediaData.release_date.substring(0, 4) 
                : mediaData && mediaData.first_air_date && mediaData.first_air_date.substring(0, 4);
    const runtime = isMovie 
                ? mediaData && mediaData.runtime  && mediaData.runtime 
                : mediaData && mediaData.episode_run_time && mediaData.episode_run_time;
    const genres = mediaData && mediaData.genres && mediaData.genres.length > 0;

    return(
        loading
        ? <Loader/>
        : (
            error
            ? "Can't get data"
            : (
                <Container>
                    <Backdrop bgUrl={mediaData.backdrop_path 
                                    ? `https://image.tmdb.org/t/p/original${mediaData.backdrop_path}`
                                    : null}/> 
                    <Content>
                        <Poster bgUrl={mediaData.poster_path 
                                    ? `https://image.tmdb.org/t/p/original${mediaData.poster_path}` 
                                    : "https://img.icons8.com/ios/50/000000/popcorn-time.png"}/>
                        <Information>
                            <Title>{title}</Title>
                            <ItemContainer>
                                {year && <>
                                            <Year>{year}</Year>
                                            <Divider>·</Divider>
                                        </>
                                }
                                {runtime && <Runtime>{`${runtime}mins`}</Runtime>}
                                {genres && <>
                                                <Divider>·</Divider>
                                                <Genres>
                                                    {mediaData.genres.map((genre, index) =>
                                                                                        index === mediaData.genres.length - 1
                                                                                        ? genre.name
                                                                                        : `${genre.name} / `
                                                    )}
                                                </Genres>
                                            </>
                                }         
                            </ItemContainer>
                            <Description>{mediaData.overview}</Description>
                        </Information>
                    </Content>
                </Container>            
            )
        )
    )
}
export default Detail;