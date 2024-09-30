'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RiMenuLine, RiCloseLargeLine, RiMoonClearFill, RiSunLine } from "@remixicon/react";

import { useTheme } from '~/util/context/ThemeContext'
import { childrenVariants, MotionButton, nestedVariants, overlayVariants } from './animations';

type SlideInButtonProps = {
  isMenuOpen: boolean;
} & React.ComponentProps<'li'>

const MotionLink = motion(Link)

// TODO: figure out how to properly stagger the menu items
const SlideInButton = function ({ children, isMenuOpen }: SlideInButtonProps) {
  return (
    <motion.div
      // @ts-ignore fml this is a bug in framer motion
      className={"relative w-full bg-primary uppercase overflow-hidden col-span-full border-2 border-secondary"}
      variants={childrenVariants}
      whileHover="hover"
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
    >
      {/* Sliding Background */}
      <motion.div
        // @ts-ignore fml this is a bug in framer motion
        className="absolute inset-0 bg-secondary z-0"
        initial={{ translateY: "100%" }}
        variants={{
          hover: { translateY: "0%", transition: { duration: 0.3, ease: "easeOut" } },
          initial: { translateY: "100%" },
        }}
      />

      {/* Text */}
      <MotionLink
        href="/"
        className="relative z-10 flex items-center justify-center py-1 h-9 md:h-12 lg:h-16 px-4 md:px-6 lg:px-8
                text-2xl hover:underline text-secondary"
        variants={{
          hover: { color: "var(--color-primary)", transition: { duration: 0.3, ease: "circInOut" } },
          initial: { color: "var(--color-secondary)" },
        }}
      >
        {children}
      </MotionLink>
    </motion.div>
  );
};

// TODO: animations here can be wildly improved
export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <aside
        className={`hidden
          lg:fixed lg:left-0 lg:bottom-0 lg:top-0 lg:h-full lg:w-[3.125rem]
          lg:flex lg:flex-col lg:justify-between lg:items-center
          lg:transition-colors lg:duration-300 lg:ease-in-out
          lg:bg-primary lg:text-secondary lg:border-r-2 lg:border-secondary
          lg:group z-50
        `}
      >
        {/* TODO: replace with logo */}
        <Link href="/" className="p-3 text-2xl font-bold">
          G
        </Link>

        {/* TODO: animate such that the arrow moves upwards */}
        <Link
          href="/contact"
          className="lg:-rotate-90 w-max text-xl font-medium"
        >
          let&apos;s chat →
        </Link>

        <MotionButton
          onClick={toggleMenu}
          wrapperClassName='!w-[3.125rem] lg:!w-[3.125rem] !h-[3.125rem] md:h-[3.125rem] lg:h-[3.125rem]'
          className='border-l-0 border-r-0 hover:border-l-2 hover:border-r-2 !p-3 z-[60]'
          aria-label="Toggle menu"
          isInverted
        >
          {isMenuOpen ? <RiCloseLargeLine size={24} /> : <RiMenuLine size={24} />}
        </MotionButton>
      </aside>

      {/* Mobile bottom bar */}
      <nav className='lg:hidden fixed bottom-0 left-0 right-0
        group z-50 bg-primary text-secondary border-t-2 border-secondary
        h-16 flex'
      >
        <ul className='flex-grow flex justify-between items-center h-16'>
          <li>
            <Link href="/" className="py-3 px-5 text-2xl font-bold">
              G
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-md">
              {`let's chat →`}
            </Link>
          </li>
          <li className='relative h-16 w-16'>
            <div className='absolute -top-[2px] right-0 h-full w-full'>
              <MotionButton
                onClick={toggleMenu}
                wrapperClassName='h-full'
                aria-label="Toggle menu"
                isInverted
              >
                <RiMenuLine size={24} />
              </MotionButton>
            </div>
          </li>
        </ul>
      </nav>

      {/* Overlay Menu */}
      <motion.div
        // @ts-ignore fml this is a bug in framer motion
        className={`fixed inset-0 z-40
          lg:w-[calc(100% - 3.125rem)] lg:left-[3.125rem] lg:top-0
          flex items-center justify-center
          bg-primary opacity-0 `}
        animate={isMenuOpen ? "open" : "closed"}
        variants={overlayVariants}
      >
        {/* @ts-ignore fml this is a bug in framer motion */}
        <motion.nav variants={nestedVariants} className="text-center max-w-1200 w-full lg:mx-auto mx-8">
          {/* @ts-ignore fml this is a bug in framer motion */}
          <motion.ul variants={nestedVariants} className="p-4 grid grid-cols-4 gap-[1px]">
            <SlideInButton isMenuOpen={isMenuOpen}>
              Home
            </SlideInButton>
            {/* <SlideInButton isMenuOpen={isMenuOpen}>
              Works
            </SlideInButton>
            <SlideInButton isMenuOpen={isMenuOpen}>
              Work
            </SlideInButton>
            <SlideInButton isMenuOpen={isMenuOpen}>
              Journal
            </SlideInButton>
            <SlideInButton isMenuOpen={isMenuOpen}>
              About
            </SlideInButton>
            <SlideInButton isMenuOpen={isMenuOpen}>
              Contact
            </SlideInButton> */}
            <li className='flex justify-center col-start-4'>
              <MotionButton
                onClick={() => {
                  toggleTheme()
                }}
                isInverted
              >
                {theme === 'dark' ? (
                  <>
                    <RiSunLine size={24} />
                    <span className="sr-only">Light Mode</span>
                  </>
                ) : (
                  <>
                    <RiMoonClearFill size={24} />
                    <span className="sr-only">Dark Mode</span>
                  </>
                )}
              </MotionButton>
            </li>
          </motion.ul>
        </motion.nav>
      </motion.div >
    </>
  )
}

