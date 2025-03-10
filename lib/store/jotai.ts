import { atom } from 'jotai'

const countAtom = atom(0)

const countryAtom = atom('Japan')

const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka'])

export const animeAtom = atom([
  {
    title: 'Ghost in the Shell',
    year: 1995,
    watched: true
  },
  {
    title: 'Serial Experiments Lain',
    year: 1998,
    watched: false
  }
])




/*
const progressAtom = atom((get) => {
  const anime = get(animeAtom)
  return anime.filter((item) => item.watched).length / anime.length
})

const [anime, setAnime] = useAtom(animeAtom)

const anime = useAtomValue(animeAtom)
*/