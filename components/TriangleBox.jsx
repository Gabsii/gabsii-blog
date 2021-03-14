import React from 'react'
import { motion } from 'framer-motion'

export const Triangle = ({ animateParams, className }) => (
  <motion.div
    initial={false}
    animate={animateParams}
    transition={{
      loop: Infinity,
      ease: 'easeIn',
      duration: 1,
    }}
    className={className}
  />
)

const TriangleBox = () => (
  <>
    <Triangle
      animateParams={{ rotate: '-45deg', x: [0, -6, 0], y: [0, -6, 0] }}
      className="zelda-botw-triangle-up zelda-botw-triangle-top-left"
    />
    <Triangle
      animateParams={{ rotate: '45deg', x: [0, 6, 0], y: [0, -6, 0] }}
      className="zelda-botw-triangle-up zelda-botw-triangle-top-right"
    />
    <Triangle
      animateParams={{ rotate: '45deg', x: [0, -6, 0], y: [0, 6, 0] }}
      className="zelda-botw-triangle-down zelda-botw-triangle-bottom-left"
    />
    <Triangle
      animateParams={{ rotate: '-45deg', x: [0, 6, 0], y: [0, 6, 0] }}
      className="zelda-botw-triangle-down zelda-botw-triangle-bottom-right"
    />
  </>
)

export default TriangleBox
