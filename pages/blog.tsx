import { useState } from 'react'
import Link from 'next/link'

import Head from '../components/Head'
import Main from '../components/Main'
import NewHeader from '../components/Header'
import styled from 'styled-components'

import { Triangle } from '../components/TriangleBox';
import stripHtmlTags from '../utils/stripHtmlTags';

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


  a {
    color: white;
    font-weight: bold;
    margin-top: 10px;

    &:visited {
      color: white;
    }
  }

  li {
    display: inline-block;
    line-height: normal;
    margin-bottom: 20px;

    a {
      text-decoration: none;
      color: #B99F65; 
      margin-top: 0;
      font-weight: normal;
    }

    &::after {
      content:'';
      margin-right: 1ch;
    }
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  height: 65vh;
  width: 50%;
  margin-right: 75px;
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
`;

const Post = styled(Link)`
  width: 100%;
  height: 75px;
  margin: 5px 0;
  padding: 10px;
  color: white;
  text-decoration: none;
  border: 1px solid #ffffff;
  filter: brightness(0.4);
  transition: all 0.25s;
  position: relative;
  display: flex;

  ${({selected}) => selected && `
    background: grey;  
    filter: brightness(1);
    box-shadow: rgba(255, 255, 190, 0.4) 0px 0px 6px 2px;
  `}
  
  &:visited {
    color: white;
  }

  img {
    margin-right: 15px;
  }

  div {
    display: flex;
    flex-direction: column;
    
    overflow: hidden;
  }

  h3 {
    line-height: 1.5;
    font-size: 24px;
    font-weight: bold;
    width: 100%;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  li {
    display: inline-block;
    line-height: normal;

    &::after {
      content:'';
      margin-right: 1ch;
    }
  }
`

const initialPages = [
  {
    name: 'Gabsii',
    url: '/',
  },
  {
    name: 'Blog',
    url: '/blog',
  },
  null,
];

const triangleConfig = [
  {
    animateParams: { rotate: '-45deg', x: [0, -6, 0], y: [0, -6, 0]},
    className: 'zelda-botw-triangle-up zelda-botw-triangle-top-left',
  },
  {
    animateParams: { rotate: '45deg', x: [0, 6, 0], y: [0, -6, 0]},
    className: 'zelda-botw-triangle-up zelda-botw-triangle-top-right',
  },
  {
    animateParams: { rotate: '45deg', x: [0, -6, 0], y: [0, 6, 0]},
    className: 'zelda-botw-triangle-down zelda-botw-triangle-bottom-left',
  },
  {
    animateParams: { rotate: '-45deg', x: [0, 6, 0], y: [0, 6, 0]},
    className: 'zelda-botw-triangle-down zelda-botw-triangle-bottom-right',
  },
]

type BlogProps = {
  posts: string[]
}

const Blog = ({
  posts
}: BlogProps) => {
  // const [activePost, setActivePost] = useState(posts[0]);
  const activePost = null;

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <NewHeader pages={initialPages} />
      <Main>
        <PostsWrapper>
          <PostList>
            {posts.map((post) => {
              return (
                <Post
                  key={post?.title}
                  selected={activePost === post}
                  to={`/blog/${post?.slug}`}
                  onMouseOver={() => setActivePost(post)}
                >
                  {
                    activePost === post && (
                      triangleConfig.map((triangle, index) => (
                        <Triangle key={`Triangle-${index}`} animateParams={triangle?.animateParams} className={triangle?.className} />
                      ))
                    )
                  }
                  <img src={post?.better_featured_image?.media_details?.sizes?.thumbnail?.source_url} height="50" width="50" loading="lazy" />
                  <div>
                    <h3 dangerouslySetInnerHTML={{ __html: post?.title }} />
                    <ul>
                    {
                      post?.categories.map((category) => {
                        return (
                          <li key={`${post?.title}-${category?.name}`}>{category?.name}</li>
                        )
                      })
                    }
                    </ul>
                  </div>
                </Post>
              )
            })}
          </PostList>
          <ActivePost>
            <BackgroundImage src={activePost?.better_featured_image?.media_details?.sizes?.medium_large?.source_url} />
            <h2 dangerouslySetInnerHTML={{ __html: activePost?.title }} />
            <hr/>
            {
              activePost?.categories?.map((category) => {
                return (
                  <li key={`${activePost?.title}-${category?.name}`}><Link to={`?category=${category?.slug}`}>{category?.name}</Link></li>
                )
              })
            }
            <p dangerouslySetInnerHTML={{ __html: stripHtmlTags(activePost?.excerpt) }} />
            <Link to={`/blog/${activePost?.slug}`}>Read More</Link>
        </ActivePost>
        </PostsWrapper>
      </Main>
    </>
  )
}

export default Blog
