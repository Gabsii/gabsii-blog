import React from 'react'
import { motion } from 'framer-motion'

export const Triangle = ({ rotationParam, animateParams, className }) => 
{
  const initialParams = { x: [0, 0, 0], y: [0, 0, 0], rotate: rotationParam };
  return (
  <motion.div
    initial={initialParams}
    animate={animateParams}
    transition={{
      repeat: Infinity,
      ease: 'easeIn',
      duration: 1,
    }}
    className={className}
  />
)}

const TriangleBox = () => (
  <>
    <Triangle
      rotationParam={'-45deg'}
      animateParams={{ x: [0, -6, 0], y: [0, -6, 0] }}
      className="zelda-botw-triangle-up zelda-botw-triangle-top-left"
    />
    <Triangle
      rotationParam={'45deg'} 
      animateParams={{x: [0, 6, 0], y: [0, -6, 0] }}
      className="zelda-botw-triangle-up zelda-botw-triangle-top-right"
    />
    <Triangle
      rotationParam={'45deg'} 
      animateParams={{x: [0, -6, 0], y: [0, 6, 0] }}
      className="zelda-botw-triangle-down zelda-botw-triangle-bottom-left"
    />
    <Triangle
      rotationParam={'-45deg'}
      animateParams={{ x: [0, 6, 0], y: [0, 6, 0] }}
      className="zelda-botw-triangle-down zelda-botw-triangle-bottom-right"
    />
  </>
)

export default TriangleBox
