export interface ISeason {
    poster_path: string,
    name: string
}
export interface ICountry {
    logo_path?: string,
    name: string
}
export interface ICompany {
    id: number,
    name: string,
    logo_path: string,
    poster_path: string,
    original_title: string,
    release_date: string,
    vote_average: number
}
export interface IVideos {
    results: {
        key: string
    }[]
}
export interface IMediaDataResult {
    results: IMediaData[]
}
export interface IMediaData {
    id: number,
    backdrop_path: string,
    poster_path: string,
    original_title: string,
    original_name: string,
    release_date: string,
    first_air_date: string,
    runtime: number,
    episode_run_time: number[],
    vote_average: number,
    genres: { name: string }[],
    imdbID: string,
    overview: string
    videos: IVideos,
    production_companies: ICompany[],
    production_countries: { name: string }[],
    seasons: ISeason[]
}