import React from 'react'

import '../css/reset.css';
import '../css/fonts.css'
import NewHeader from '../components/NewHeader';
import Main from '../components/Main'

const initialPages = [
  {
    name: 'Projects',
    url: '/projects'
  },
  {
    name: 'Gabsii',
    url: '/inventory-test' //TODO
  },
  {
    name: 'Blog',
    url: '/blog'
  },
];

const InventoryTest = () => {
  return (
    <>
      <NewHeader pages={initialPages}/>
      <Main />
    </>
  )
}

export default InventoryTest;
