import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR, { SWRResponse } from 'swr'
import { MarvelComics } from '../../common/MarvelInterface'
import Link from 'next/link'
import styled from 'styled-components'

const ComicsPage = () => {

    const {query: {id}} = useRouter()
    const router = useRouter()

    const extractIdFromUrl = (url: string) => url.slice(47)

    const fetcher = (route: string) => axios.get(route, {params: {apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY}})
        .then(data => {
            return data.data.data.results[0]
        }).catch(error => error)
    
    const {data, error}: SWRResponse<MarvelComics, any> = useSWR(`https://gateway.marvel.com/v1/public/comics/${id}`, fetcher)

    if(!error && !data) return <p>Loading ...</p>

    console.log(data)

    return (
        <Main>
            <article>
                
                <span onClick={() => router.back()}>&#8592;</span>
                
                <h1>{data.title}</h1>
            </article>

            <section>
                <div className="image-container">
                    <img src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={data.title}/>
                </div>
                
                <div className="dull-container">
                    <p>Characters on this comic ({data.characters.items.length}) :</p>

                    {data.characters.items.map((character, index) => (
                        <article key={index}>
                            <Link href="/characters/[id]" as={`/characters/${extractIdFromUrl(character.resourceURI)}`}>
                                {character.name}
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </Main>
    )
}

export default ComicsPage

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
        width: 100%;
        height: 100%;

        display: flex;
        flex-wrap: wrap;
        gap: 2rem;

        .image-container{
            align-self: flex-start;
            flex: 0 1 auto;

            img{
                width: 100%;
                height: 100%;
            }
            
        }

        .dull-container{
            align-self: flex-start;
            flex: 0 1 auto;
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