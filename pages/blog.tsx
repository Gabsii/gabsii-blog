import { useEffect, useState } from 'react'
import Link from 'next/link'

import Head from '../components/Head'
import Main from '../components/Main'
import NewHeader from '../components/Header'
import styled from 'styled-components'

import { getAllEntriesByType } from '../utils/entries'
import { POSTS_LOCATION } from '../utils/constants'
import { PostsOverview, PostOverview } from '../types/entries'
import PostList from '../components/PostList'
import { GetStaticProps} from 'next'
import useKeyPress from '../utils/hooks/useKeyPress'
import { useRouter } from 'next/router'

const PostsWrapper = styled.div`
  display: flex;
  padding: 20px;
  font-family: 'Calamity Sans';
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0 !important;
  height: 100%;
  width: 100%;
  background-size: cover;
  object-fit: cover;
  filter: brightness(0.1);
`;

const ActivePost = styled.div`
  width: calc(50% - 75px);
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  
  *  { 
    z-index: 10;
  }

  h2 {
    line-height: 1.5;
    font-size: 28px;
    font-weight: bold;
  }

  hr {
    width: 100%;
  }

  a {
    color: #B99F65;
    font-weight: bold;
    margin-top: 10px;

    &:visited {
      color: #B99F65;
    }
  }

  li {
    display: inline-block;
    margin-bottom: 20px;
    margin-top: 0;
    color: #B99F65; 
    text-decoration: none;
    text-transform: uppercase;
    line-height: normal;
    font-weight: normal;

    &::after {
      content:'';
      margin-right: 1ch;
    }
  }
  
  p {
    margin-top: 5px;
  }
`;

type BlogProps = {
  posts: PostsOverview
}

const Blog = ({
  posts
}: BlogProps) => {
  const [activePost, setActivePost] = useState(posts[0]);
  const router = useRouter();
  const enterPressed = useKeyPress('Enter');

  useEffect(() => {
    enterPressed && activePost && router.push(`/blog/${activePost.slug}`)
  }, [enterPressed])

  return (
    <>
      <Head>
        <title>Blog | Gabsii</title>
      </Head>
      <NewHeader />
      <Main>
        <PostsWrapper>
          <PostList posts={posts} activePost={activePost} setActivePost={setActivePost} />
          <ActivePost>
            <BackgroundImage src={activePost?.coverImage} />
            <h2 dangerouslySetInnerHTML={{ __html: activePost?.title }} />
            <hr />
            <ul>
              {
                activePost?.categories?.map((category) => {
                  return (
                    <li key={`${activePost?.title}-${category}`}>{category}</li>
                  )
                })
              }
            </ul>
            <p dangerouslySetInnerHTML={{ __html: 'EXCERPT' }} />
            <Link href={`/blog/${activePost?.slug}`}>Read More</Link>
          </ActivePost>
        </PostsWrapper>
      </Main>
    </>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = async () => {
  const posts: PostsOverview = getAllEntriesByType(POSTS_LOCATION, (post: PostOverview) => {
    return {
      categories: post.categories || null,
    }
  });

  return {
    props: {
      posts
    }
  };
}
