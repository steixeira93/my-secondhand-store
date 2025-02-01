import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'gpro x 60%',
    description: 'tecladinho mec com switch blue e rgb maneiro pra personalizar',
    price: 799.00,
    category: 'gamer',
    images: ['https://www.logitechstore.com.br/media/catalog/product/cache/105e6f420716e0751863c4b81f527d17/l/o/logitechgpro1.png'],
    condition: 'semi-novo',
    available: false
  },
  {
    id: '3',
    name: 'relogin da apple SE',
    description: 'reloginho da apple top demais, vem com carregador original, é prata e tem uma pulseira preta linda',
    price: 1999.00,
    category: 'tecnologia',
    images: ['https://cdn.awsli.com.br/600x1000/53/53761/produto/37846009/8ff5d61451.jpg'],
    condition: 'semi-novo',
    available: true
  },
  {
    id: '4',
    name: 'razer deathadder v3',
    description: 'mousezin gamer profissa com sensor mt preciso, um dos melhores mouses do mundo',
    price: 999.00,
    category: 'gamer',
    images: ['https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/138307060_01/w=800,h=800,fit=pad'],
    condition: 'novo',
    available: true
  },
  {
    id: '5',
    name: 'logitech g pro x',
    description: 'mouse levinho pra jogar competitivo, top 1 do mundo na minha opinião.. +1000 de skill com ele',
    price: 499.00,
    category: 'gamer',
    images: ['https://http2.mlstatic.com/D_NQ_NP_2X_627554-MLB81702571298_012025-F.webp'],
    condition: 'semi-novo',
    available: false
  },
  {
    id: '6',
    name: 'steelseries qck+',
    description: 'mousepad grandão de pano pra jogar aquele fps e agarrar pelo de gato',
    price: 200.00,
    category: 'gamer',
    images: ['https://http2.mlstatic.com/D_NQ_NP_2X_723466-MLA74781351247_022024-F.webp'],
    condition: 'semi-novo',
    available: false
  },
  {
    id: '7',
    name: 'alienware 360hz',
    description: 'monitor monstrão pra jogar cs, valorant e lolzin sem lag.. uma das melhores compras da minha vida',
    price: 3000.00,
    category: 'gamer',
    images: ['https://http2.mlstatic.com/D_NQ_NP_2X_918973-MLU75459766143_032024-F.webp'],
    condition: 'semi-novo',
    available: false
  },
  {
    id: '8',
    name: 'pczin god',
    description: 'pc monstro com ryzen 7700x, rtx 4070 e 32gb ram ddr5.. to triste de vender, mas é o que tem',
    price: 9000.00,
    category: 'gamer',
    images: ['https://cdn.awsli.com.br/64x50/2443/2443989/produto/191888985/15288147043-u1-04547d5f2d-500n6a7m4s.webp'],
    condition: 'semi-novo',
    available: false
  },
  {
    id: '9',
    name: 'bikezinha boa',
    description: 'cannondale pretinha aro 29, zero km praticamente.. se comprar, me chama pro pedal junto',
    price: 2000.00,
    category: 'esportes',
    images: ['https://http2.mlstatic.com/D_NQ_NP_2X_979762-MLU77098549784_062024-F.webp'],
    condition: 'semi-novo',
    available: true
  },
  {
    id: '10',
    name: 'echo dot 4',
    description: 'echo dot 4 com alexa, se vc souber usar o google, nao precisa disso.. sou sincero',
    price: 250.00,
    category: 'tecnologia',
    images: ['https://http2.mlstatic.com/D_NQ_NP_2X_927507-MLB71415422361_082023-F.webp'],
    condition: 'novo',
    available: false
  },
  {
    id: '11',
    name: 'skyrope da nova',
    description: 'eu poderia estar matando, estar roubando, mas to aqui vendendo minha skyrope zero',
    price: 300.00,
    category: 'esportes',
    images: ['https://acdn.mitiendanube.com/stores/002/464/750/products/d-preto-ef1db3944285a7b68a17169136679590-480-0.jpg'],
    condition: 'novo',
    available: true
  },
  {
    id: '12',
    name: 'monitorzin gamer + -',
    description: 'monitorzin gamer 144hz, 1080p, 1ms, hdmi, dp, curvo, 31.5.. é de entrada, mas é baum',
    price: 800.00,
    category: 'gamer',
    images: ['https://img.terabyteshop.com.br/produto/g/monitor-gamer-superframe-precision-ultra-curvo-315-pol-full-hd-165hz-va-1ms-hdmidp-sfp3212_132079.jpg'],
    condition: 'semi-novo',
    available: true
  },
  {
    id: '13',
    name: 'fonezin de cria',
    description: 'fui motivo de piada quando comprei, mas é bom demais pra jogar e tem uma qualidade de som top',
    price: 100.00,
    category: 'gamer',
    images: ['https://http2.mlstatic.com/D_NQ_NP_2X_757300-MLB82142656897_012025-F.webp'],
    condition: 'semi-novo',
    available: false
  }
];

export const categories = [
  { value: '', label: 'Todas as categorias' },
  { value: 'tecnologia', label: '🖥️ Tecnologia' },
  { value: 'gamer', label: '🎮 Gamer' },
  { value: 'esportes', label: '🏃 Esportes' },
  { value: 'livros', label: '📚 Livros' },
  { value: 'roupas', label: '👕 Roupas' },
  { value: 'outros', label: '🤷 Outros' }
] as const; 