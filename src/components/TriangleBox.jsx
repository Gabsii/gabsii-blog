import React from 'react';
import { motion } from "framer-motion";

const Triangle = ({animateParams, className, styles}) => (
  <motion.div 
    initial={false}
    animate={animateParams}
    transition={{
      loop: Infinity,
      ease: "easeIn",
      duration: 1,
    }}
    className={className}
    style={styles}
  />
); 

const TriangleBox = () => (
  <>
    <Triangle
      animateParams={{ rotate: "-45deg", x: [0, -6, 0], y: [0, -6, 0] }}
      className="zelda-botw-triangle-up"
      styles={{ position: 'absolute', left: 0, top: 0, margin: '0 -0.25rem'}}
    />
    <Triangle
      animateParams={{ rotate: "45deg", x: [0, 6, 0], y: [0, -6, 0] }}
      className="zelda-botw-triangle-up"
      styles={{ position: 'absolute', right: 0, top: 0, margin: '0 -0.25rem'}}

    />
    <Triangle
      animateParams={{ rotate: "45deg", x: [0, -6, 0], y: [0, 6, 0] }}
      className="zelda-botw-triangle-down"
      styles={{ position: 'absolute', left: 0, bottom: 0, margin: '0 -0.25rem'}}
    />
    <Triangle
      animateParams={{ rotate: "-45deg", x: [0, 6, 0], y: [0, 6, 0] }}
      className="zelda-botw-triangle-down"
      styles={{ position: 'absolute', right: 0, bottom: 0, margin: '0 -0.25rem'}}
    />
  </>
);

export default TriangleBox;