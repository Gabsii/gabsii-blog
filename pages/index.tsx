import Header from '../components/Header'
import Main from '../components/Main'

const initialPages = [
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Gabsii',
    url: '/',
  },
  {
    name: 'Blog',
    url: '/blog',
  },
]

const InventoryTest = () => {
  return (
    <>
      <Header pages={initialPages} />
      <Main />
    </>
  )
}

export default InventoryTest
