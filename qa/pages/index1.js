import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link'

export async function getStaticProps() {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
	const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${space}`,
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        questionCollection {
          items {
            slug
            question 
            shortAnswer
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
      questionCollection: data.questionCollection
    }
  }
}

export default function Home({ questionCollection }) {
  console.log('questionCollection', questionCollection.items[0].slug);
  return (
    <ul > 
      {questionCollection.items.map(q=>
      <li>
      <Link href={`/questions/${q.slug}`}>
        <a>{q.question}</a>
      </Link>
      </li>
      )}
    </ul>
  )
}
