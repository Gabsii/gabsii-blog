'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react'
import { motion as mo } from 'motion/react';
import * as motion from 'motion/react-client';
import { RiMenuLine, RiCloseLargeLine, RiMoonClearFill, RiSunLine } from "@remixicon/react";
import { useLocale, useTranslations } from 'next-intl';

import { Link } from "@/i18n/navigation"
import { useTheme } from '~/util/context/ThemeContext'
import { childrenVariants, MotionButton, nestedVariants, overlayVariants } from './animations';
import { LanguageSwitcher } from './LanguageSwitcher';

import { cn } from '~/util/cn';
import { useKeyPress } from '~/src/lib/hooks/useKeypress';

type SlideInButtonProps = {
  isMenuOpen: boolean;
  href?: string;
  toggleMenu: () => void;
  disabled?: boolean;
} & React.ComponentProps<'li'>

const MotionLink = mo.create(Link)

// TODO: figure out how to properly stagger the menu items
const SlideInButton = function ({ children, href = "/", isMenuOpen, toggleMenu, disabled = false }: SlideInButtonProps) {
  const { theme } = useTheme()

  return (
    <motion.li
      className={cn("relative w-full bg-primary uppercase overflow-hidden col-span-full border-2 border-secondary", {"cursor-not-allowed": disabled})}
      variants={childrenVariants}
      whileHover="hover"
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
      key={`nav-${theme}`}
    >
      {/* Sliding Background */}
      <motion.div
        className={cn("absolute inset-0 bg-secondary z-0 opacity-0", { "bg-[#8b8b8b]": disabled })}
        initial={{ translateY: "100%" }}
        variants={{
          hover: { translateY: "0%", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
          initial: { translateY: "100%", opacity: 0 },
        }}
      />

      {/* Text */}
      <MotionLink
        href={href}
        onClick={toggleMenu}
        className={cn(
          "relative z-10 flex items-center justify-center py-1 h-9 md:h-12 lg:h-16 px-4 md:px-6 lg:px-8 text-2xl hover:underline text-secondary",
          { "pointer-events-none line-through": disabled }
        )}
        variants={{
          hover: { color: "var(--color-primary)", transition: { duration: 0.3, ease: "circInOut" } },
          initial: { color: "var(--color-secondary)" },
        }}
      >
        {children}
      </MotionLink>
    </motion.li>
  );
};

// TODO: animations here can be wildly improved
export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const t = useTranslations('General');
  const currentLocale = useLocale();
  const key = useKeyPress('Escape');

  // Close menu on escape key press - moved to useEffect for proper side effect handling
  useEffect(() => {
    if (isMenuOpen && key) {
      setIsMenuOpen(false);
    }
  }, [key, isMenuOpen]);

  // Use functional update pattern to avoid stale state issues
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <>
      <aside
        className={`hidden
          lg:fixed lg:left-0 lg:bottom-0 lg:top-0 lg:h-full lg:w-12.5
          lg:flex lg:flex-col lg:justify-between lg:items-center
          lg:transition-colors lg:duration-300 lg:ease-in-out
          lg:bg-primary lg:text-secondary lg:border-r-2 lg:border-secondary
          lg:group z-50
        `}
      >
        <Link href="/" className="p-3 text-2xl font-bold">
          <Image src={theme === 'light' ? '/logo-blank-dark.svg' : "/logo-blank-light.svg"} alt="logo" width={24} height={40} loading='eager' />
        </Link>

        {/* TODO: animate such that the arrow moves upwards */}
        <Link
          href="/contact"
          className="lg:-rotate-90 w-max text-xl font-medium"
        >
          {t('letsChat')} →
        </Link>

        <MotionButton
          onClick={toggleMenu}
          wrapperClassName='w-12.5! lg:w-12.5! h-12.5! md:h-12.5 lg:h-12.5'
          className='border-l-0 border-r-0 hover:border-l-2 hover:border-r-2 p-3! z-60'
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
        <ul className='grow flex justify-between items-center h-16'>
          <li>
            <Link href="/" className="py-3 px-5 text-2xl font-bold">
              <Image src={theme === 'light' ? '/logo-blank-dark.svg' : "/logo-blank-light.svg"} alt="logo" width={14} height={24} className='ml-4' loading="eager" />
              {/* G */}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-md">
              {`${t('letsChat')} →`}
            </Link>
          </li>
          <li className='relative h-16 w-16'>
            <div className='absolute -top-[2px] right-0 h-full w-full'>
              <MotionButton
                onClick={toggleMenu}
                wrapperClassName='h-full'
                className='border-b-0 border-r-0 md:h-16'
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
        className={`fixed inset-0 z-40
          lg:left-12.5 lg:right-0 lg:top-0
          flex items-center justify-center
          bg-primary opacity-0 `}
        animate={isMenuOpen ? "open" : "closed"}
        variants={overlayVariants}
      >
        <motion.nav variants={nestedVariants} className="text-center max-w-1200 w-full lg:mx-auto mx-8">
          <motion.ul variants={nestedVariants} className="p-4 grid grid-cols-4 gap-px">
            <SlideInButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}>
              {t('home')}
            </SlideInButton>
            {/* <SlideInButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}>
              {t('works')}
            </SlideInButton>
            <SlideInButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}>
              Work
            </SlideInButton>
            <SlideInButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}>
              {t('journal')}
            </SlideInButton>*/}
            <div className="flex flex-row col-span-4 gap-px">
              <SlideInButton href="/about" toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} disabled={true}>
                {t('about')}
              </SlideInButton>
              <SlideInButton href="/now" toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}>
                {t('now')}
              </SlideInButton>
            </div>
            <SlideInButton href="/contact" toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}>
              {t('contact')}
            </SlideInButton>
            <motion.li className="flex justify-content col-start-1"
              initial="closed"
              animate={isMenuOpen ? "open" : "closed"}
              variants={childrenVariants}>
              <LanguageSwitcher currentLocale={currentLocale} />
            </motion.li>
            <motion.li className='flex justify-center col-start-4'
              initial="closed"
              animate={isMenuOpen ? "open" : "closed"}
              variants={childrenVariants}>
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
            </motion.li>
          </motion.ul>
        </motion.nav>
      </motion.div >
    </>
  )
}

