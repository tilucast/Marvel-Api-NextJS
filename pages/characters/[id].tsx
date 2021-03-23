import React from 'react'
import {useRouter} from 'next/router'
import { MarvelCharacters } from '../../common/MarvelInterface'
import Link from 'next/link'
import useSWR, { SWRResponse } from 'swr'
import axios from 'axios'
import styled from 'styled-components'

const CharacterPage = () => {
    
    const {query: {id}} = useRouter()

    const extractIdFromUrl = (url: string) => url.slice(43)

    const fetcher = (route: string) => axios.get(route, {params: {apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY }})
        .then(data => {
            return data.data.data.results[0]
        }).catch(error => error)

    const {data, error}: SWRResponse<MarvelCharacters, any> = useSWR(`https://gateway.marvel.com/v1/public/characters/${id}`, fetcher)

    if(!error && !data) return <p>Loading ...</p>

    if(error) return <p>An error: {error} has occurred.</p>

    return (
        <Main>
            <article>
                <Link href="/">
                    <span>&#8592;</span>
                </Link>
                <h1>{data.name}</h1>
            </article>

            <section>
                <div className="image-container">
                    <img src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={data.name}/>
                </div>
                

                <div className="dull-container">
                    <p>{data.description || "No description available for this character /:"}</p>

                    <p>Appearances in comics ({data.comics.items.length + 1}) :</p>
                    {data.comics.items.length ? data.comics.items.map((comic,index) => (
                        <article key={index}>
                            <Link href="/comics/[id]" as={`/comics/${extractIdFromUrl(comic.resourceURI)}`}>{comic.name}</Link>
                        </article>
                    )) : <p>No comics found.</p>}
                </div>
            </section>
        </Main>
    )
}

export default CharacterPage

const Main = styled.main`
    background-color: var(--dark);
    padding: 0 4rem 4rem 4rem;
    color: var(--white);
    height: 100%;
    min-height: 100vh;
    

    > article {
        display: flex;
        align-items: center;
        padding-top: 2rem;
        margin-bottom: 2rem;

        span{
            cursor: pointer;
            padding: 1rem;
            font-size: 3rem;
            margin-right: 2rem;
            transition: all .2s;

            &:hover{
                color: var(--red);
            }
        }
    }

    section {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 2rem;

        .image-container{
            align-self: flex-start;
            flex: 1 0 50%;

            img{
                width: 100%;
                max-height: 80rem;
            }
            
        }

        .dull-container{
            align-self: flex-start;
            flex: 1 0 30%;
            min-width: 35rem;
            

            > p{
                margin-bottom: 2rem;
                font-family: var(--ranchers);
                font-size: 2rem;
            }

            article{
                a{
                    text-decoration: none;
                    color: var(--light-gray);
                    font-size: 1.8rem;
                    transition: all .2s;
                    font-weight: 600;

                    &:hover{
                        color: var(--red);
                    }
                }
            }
        }
    }
`