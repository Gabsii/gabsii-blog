import { useRouter } from "next/router";
import { useEffect } from "react";
import useKeyPress from "./useKeyPress";

const pages: NavPage[] = [
  {
    name: 'Projects',
    url: '/projects',
    visible: true,
    centered: false,
  },
  {
    name: 'Gabsii',
    url: '/',
    visible: true,
    centered: true,
  },
  {
    name: 'Blog',
    url: '/blog',
    visible: true,
    centered: false,
  },
]

type NavPage = {
  name: string,
  url: string,
  visible: boolean,
  centered: boolean,
}

type NavHook = {
  currentPageIndex: number,
  pages: NavPage[]
}

function useNav(): NavHook
{
  const QPressed = useKeyPress('q')
  const EPressed = useKeyPress('e')
  const router = useRouter()

  const currentPageIndex: number = pages.findIndex((page) => page.url === router.asPath);

  pages.forEach((page, index) => {
    // page is centered if it is the current page
    page.centered = index === currentPageIndex;
    
    // Only display the neighbours of the centered page 
    Math.abs(index - currentPageIndex) > 1 ? pages[index].visible = false : pages[index].visible = true;
  });

  useEffect(() => {
    if (QPressed && pages[currentPageIndex - 1]) {
      // navigate to page on the left
      router.push(pages[currentPageIndex - 1].url)
    } else if (EPressed && pages[currentPageIndex + 1]) {
      // navigate to page on the right
      router.push(pages[currentPageIndex + 1].url)
    }
  }, [EPressed, QPressed, pages])

  return {currentPageIndex, pages};
}

export default useNav;
