import styled from "styled-components"
import useDisplayAdditionalInfo from "./useDisplayAdditionalInfo";

const Container = styled.div``;
const Tabs = styled.ul`
    list-style-type: none;
    display: flex;

    margin-bottom: 20px;
`;
const Tab = styled.li`
    margin-right: 10px;
`;
const Button = styled.button`
    font-size: 12px;
    font-weight: 600;
    color: rgba(20, 20, 20, 0.5);
    background-color: yellow;
    border: none;
    border-radius: 10px;
`;
const Information = styled.div``;
const VideoContainer = styled.div`
    margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);

    grid-gap: 25px;
`;
const Video = styled.iframe`
    width: 100%;
    height: 135px;
`;

const ProductionContainer = styled.div`
    width: 100%;
    display: flex;

    margin-bottom: 20px;
`;
const Production = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const Country = styled.span`
    margin-bottom: 20px;
`;
const CompanyContainer = styled.div`
    margin-left: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 30px);
    grid-auto-flow: column;
    grid-gap: 50px;
`;
const Company = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Logo = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${props => props.logoUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    background-color: ${props => !props.logoUrl && "black"};
    border-radius: ${props => !props.logoUrl && "50%"};
`;
const CompanyName = styled.span`
    transform: scale(0.7);
    opacity: 0.7;
    margin-bottom: 5px;
    text-align: center;
`;
const SeasonContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-bottom: 20px;
`;
const TotalSeason = styled.span`
    margin-bottom: 10px;
`;
const SeasonDetail = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);

    grid-gap: 30px;
`;
const Season = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Poster = styled.image`
    width: 100%;
    height: 180px;
    background-image: url(${props => props.imgUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    margin-bottom: 5px;
`;
const SeasonNumber = styled.span`
    transform: scale(0.7);
    opacity: 0.7;
`;

const AdditionalInfoContainer = ({videos, companies, countries, seasons}) => {
    const {videoButton, productionButton, seasonButton, showVideo, showProduction, showSeason} = useDisplayAdditionalInfo();
    
    videos = videos && videos.filter((video, index) => index < 2);
    // The first element of seasons array is 'Special'
    seasons = seasons && seasons.length > 0 && seasons.filter((season, index) => index > 0);
    let countriesText = "";
    if(countries.length > 0){
        for(let i = 0; i < countries.length; i++){
            if(i < countries.length - 1)    countriesText += `${countries[i].name} | `;
            else countriesText += `${countries[i].name}`;
        }
    }
    return (
        <>
            <Container>
                <Tabs>
                    {
                        videos.length > 0 &&
                        <Tab><Button ref={videoButton}>Videos</Button></Tab>
                    }
                    {
                        companies.length > 0 &&
                        <Tab><Button ref={productionButton}>Production</Button></Tab>
                    }
                    {
                        seasons && seasons.length > 0 &&
                        <Tab><Button ref={seasonButton}>Seasons</Button></Tab>
                    }
                </Tabs>
                <Information>
                {showVideo && <VideoContainer>
                                    {
                                        videos.length > 0 && videos.map(
                                            (video, index) => <Video key={index} src={`//www.youtube.com/embed/${video.key}`}/>
                                        )
                                    }
                                </VideoContainer>
                }
                {showProduction &&  <ProductionContainer>
                                        {
                                            <Production>
                                                {
                                                    countriesText !== "" 
                                                    && <Country>{`Producted in ${countriesText}`}</Country>
                                                }
                                                <CompanyContainer>
                                                    {
                                                        companies.length > 0 && companies.map(
                                                            (company, index) => (
                                                                <Company>
                                                                    <Logo logoUrl={company.logo_path
                                                                                        ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                                                                                        : null
                                                                                    }
                                                                    />
                                                                    <CompanyName>{company.name}</CompanyName>
                                                                </Company>
                                                            )
                                                        )
                                                    }
                                                </CompanyContainer>
                                            </Production>
                                        }
                                    </ProductionContainer>
                }
                {showSeason && <SeasonContainer>
                                    <TotalSeason>{`${seasons.length} ${seasons.length > 1 ? "Seasons" : "Season"} in Total`}</TotalSeason>
                                    <SeasonDetail>
                                        {seasons.length > 0 && seasons.map(
                                            (season, index) => <Season>
                                                                    <Poster imgUrl={
                                                                        season.poster_path
                                                                        ? `https://image.tmdb.org/t/p/w300/${season.poster_path}`
                                                                        : "https://img.icons8.com/ios/50/000000/popcorn-time.png"
                                                                    }/>
                                                                    <SeasonNumber>{`Season ${season.season_number}`}</SeasonNumber>
                                                                </Season>
                                        )}
                                    </SeasonDetail>
                                </SeasonContainer>
                }
                </Information>
            </Container>
        </>
    )
}
export default AdditionalInfoContainer;