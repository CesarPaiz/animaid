import AniList from "anilist-node";

const settings = '';
const animaid = new AniList(settings.token);
import { AniListNombre } from "../src/app/NavBar"
import { NextRequest } from 'next/server'
export async function AniListSearch({ nombreAnime }) {
    var query = `
    query ($Search: String, $Page: Int ) { # Define which variables will be used in the query (id)
        Page (page: $Page,perPage: 18) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
        pageInfo {
          total
        }
        media(search: $Search,sort: TRENDING_DESC,isAdult: false) {
          id
          type
          status
          title {
            romaji
            english
          } 
          coverImage {
            medium
            large
          } 
          }
        }
      }
`;


    var resultado = {
        Search: nombreAnime,
        Page: 1
    }

    var anilisUrl = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: resultado
            })
        }


    return (
        fetch(anilisUrl, options).then(response => response.json()).then(data => {
            return data
        })
    )
}
export async function AniListTendencia({ pagina }) {
    var query = `
    query ($Page: Int ) { # Define which variables will be used in the query (id)
        Page (page: $Page,perPage: 18) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
        pageInfo {
          total
        }
        media(sort: TRENDING_DESC, isAdult: false) {
          id
          type
          status
          title {
            romaji
            english
          } 
          description
          coverImage {
            large
            medium
          } 
          }
        }
      }
    `;

    var resultado = {
        Page: pagina

    }

    var anilisUrl = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: resultado
            })
        }


    return (
        fetch(anilisUrl, options).then(response => response.json()).then(data => {
            return data
        })
    )
}
export async function AniLisInfoID({ id }) {
    var query = `
query ($Id: Int) { # Define which variables will be used in the query (id)
  Media (id: $Id) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    type
    status
    description
    title {
        english
        romaji
        native
        userPreferred
    }
    coverImage {
        large
    }
    tags{
        name
    }
    trailer {
      id
      site
    }
  }
}
`;


    var resultado = {
        Id: id
    }

    var anilisUrl = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: resultado
            })
        }


    return (
        fetch(anilisUrl, options).then(response => response.json()).then(data => {
            return data
        })
    )
}

export async function AniListPopular({ pagina }) {
    var query = `
    query ($Page: Int ) { # Define which variables will be used in the query (id)
        Page (page: $Page,perPage: 18) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
        pageInfo {
          total
        }
        media(sort: POPULARITY_DESC, isAdult: false) {
          id
          type
          status
          title {
            romaji
            english
          } 
          description
          coverImage {
            large
            medium
          } 
          }
        }
      }
    `;

    var resultado = {
        Page: pagina

    }

    var anilisUrl = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: resultado
            })
        }


    return (
        fetch(anilisUrl, options).then(response => response.json()).then(data => {
            return data
        })
    )
}
export async function AniListAvatar({ code }) {
    var query = `
    query {
        Viewer {
          id
          name
          avatar {
            medium
          }
        }
      }
      
    `;


    var anilisUrl = 'https://graphql.anilist.co',

        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + code,
            },
            body: JSON.stringify({
                query: query,
            })
        }
    console.log(code)
    return (
        fetch(anilisUrl, options).then(response => response.json()).then(data => {
            return data
        })
    )
}
