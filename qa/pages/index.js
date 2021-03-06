import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link'
import Nav from "./components/Nav"

export async function getStaticProps() {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
	const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${space}`,
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query Get {
        axiomsCollection  {
          items  {
            slug
            number
            title
            description
          }
        }
      }
    `,
    context: {
      // example of setting the headers with context per operation
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
  });
  
  return {
    props: {
      axiomsCollection: data.axiomsCollection
    }
  }
}

export default function Home({ axiomsCollection }) {
  return (
    <Nav/>
  )
}
