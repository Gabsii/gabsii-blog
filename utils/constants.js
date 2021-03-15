export const breakpoints = {
  min: '(min-width: 320px)',
  xs: '(min-width: 480px)',
  sm: '(min-width: 768px)',
  md: '(min-width: 1024px)',
  lg: '(min-width: 1280px)',
  xl: '(min-width: 1440px)',
}

export const POSTS_LOCATION = 'public/posts'
export const PROJECTS_LOCATION = 'public/projects'

export const triangleConfig = [
  {
    rotationParams: '-45deg',
    animateParams: { x: [0, -6, 0], y: [0, -6, 0]},
    className: 'zelda-botw-triangle-up zelda-botw-triangle-top-left',
  },
  {
    rotationParams: '45deg', 
    animateParams: { x: [0, 6, 0], y: [0, -6, 0]},
    className: 'zelda-botw-triangle-up zelda-botw-triangle-top-right',
  },
  {
    rotationParams: '45deg', 
    animateParams: { x: [0, -6, 0], y: [0, 6, 0]},
    className: 'zelda-botw-triangle-down zelda-botw-triangle-bottom-left',
  },
  {
    rotationParams: '-45deg',
    animateParams: { x: [0, 6, 0], y: [0, 6, 0]},
    className: 'zelda-botw-triangle-down zelda-botw-triangle-bottom-right',
  },
]
