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

  pages.forEach((page, index) => index === currentPageIndex ? page.centered = true : page.centered = false);

  if (currentPageIndex === 0 ) {
    pages[2].visible = false;
    pages[0].visible = true;
  } else if (currentPageIndex === 1) {
    pages[0].visible = true;
    pages[2].visible = true;
  } else if (currentPageIndex === 2) {
    pages[0].visible = false;
    pages[2].visible = true;
  }

  useEffect(() => {
    if (QPressed && pages[currentPageIndex - 1]) {
      router.push(pages[currentPageIndex - 1].url)
    } else if (EPressed && pages[currentPageIndex + 1]) {
      router.push(pages[currentPageIndex + 1].url)
    }
  }, [EPressed, QPressed, pages])

  return {currentPageIndex, pages};
}

export default useNav;
