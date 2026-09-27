export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  tag: string;
}

// Реальные работы Ritual.kg (instagram: @ritual.kgz), файлы в public/img/
export const gallery: GalleryItem[] = [
  {
    id: 1,
    src: '/img/ig-17.jpg',
    alt: 'Мемориальный комплекс с кованой оградой',
    tag: 'Комплекс',
  },
  {
    id: 2,
    src: '/img/ig-07.jpg',
    alt: 'Благоустройство могилы — до и после',
    tag: 'До / После',
  },
  {
    id: 3,
    src: '/img/ig-06.jpg',
    alt: 'Комплекс из чёрного и красного гранита',
    tag: 'Комплекс',
  },
  {
    id: 4,
    src: '/img/ig-09.jpg',
    alt: 'Ограда и брусчатка — до и после',
    tag: 'До / После',
  },
  {
    id: 5,
    src: '/img/ig-16.jpg',
    alt: 'Памятник из красного гранита',
    tag: 'Памятник',
  },
  {
    id: 6,
    src: '/img/ig-10.jpg',
    alt: 'Реставрация участка — до и после',
    tag: 'До / После',
  },
  {
    id: 7,
    src: '/img/ig-15.jpg',
    alt: 'Кованая ограда с крестом',
    tag: 'Ограда',
  },
  {
    id: 8,
    src: '/img/ig-11.jpg',
    alt: 'Облагораживание могилы — до и после',
    tag: 'До / После',
  },
];
