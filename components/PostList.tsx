import Link from 'next/link';
import styled from "styled-components";

import { EntriesOverview, EntryOverview } from "../types/entries";
import TriangleBox from './TriangleBox';

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 65vh;
  width: 50%;
  margin-right: 75px;
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
`;

const PostElement = styled.a<{isActive: boolean, onMouseOver: () => void}>`
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

  ${({isActive}) => isActive && `
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

const PostList = ({posts, activePost, setActivePost}: {posts: EntriesOverview, activePost: EntryOverview, setActivePost: (id: EntryOverview) => void}) => {
  return (
    <PostListWrapper>
      {posts.map((post) => {
        return (
          <Link
            key={post?.title}
            href={`/blog/${post?.slug}`}
            passHref
          >
            <PostElement
              isActive={activePost === post}
              onMouseOver={() => setActivePost(post)}
              >
                { activePost === post && (<TriangleBox/>) }
                <img src={post?.coverImage} height="50" width="50" loading="lazy" />
                <h3>{post?.title}</h3>
            </PostElement>
          </Link>
        )
      })}
    </PostListWrapper>
  )
}

export default PostList;
