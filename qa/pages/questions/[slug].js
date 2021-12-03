import Head from 'next/head'
import Image from 'next/image'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useRouter } from 'next/router' 

export async function getStaticProps(context) {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  const slug = context.params.slug;
  console.log(slug);

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

export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default function Question({ questionCollection }) {
  const router = useRouter()
  const { slug } = router.query;
  const q = questionCollection.items.find(element => element.slug == slug);
 
  return (
    <>
    <h1>{q.question} </h1>
    <p>{q.shortAnswer}</p>
    </>
  )
}
