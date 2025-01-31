import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import { Product } from '../types/product';
import { api } from '../services/api';
import { ProductSkeleton } from '../components/ProductSkeleton';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

// Função auxiliar para determinar o emoji e texto da condição
const getConditionInfo = (condition: string) => {
  switch (condition) {
    case 'novo':
      return { emoji: '🆕', label: 'Novo' };
    case 'semi-novo':
      return { emoji: '✨', label: 'Semi-novo' };
    case 'usado':
      return { emoji: '👌', label: 'Usado' };
    default:
      return { emoji: '❓', label: condition };
  }
};

// Função auxiliar para determinar o status do produto
const getAvailabilityInfo = (available: boolean) => {
  return available 
    ? { emoji: '✅', label: 'Disponível', classes: 'bg-green-100 text-green-700' }
    : { emoji: '❌', label: 'Vendido', classes: 'bg-red-100 text-red-700' };
};

const categories = [
  { value: '', label: 'Todas as categorias', icon: '📦' },
  { value: 'tecnologia', label: 'Tecnologia', icon: '🖥️' },
  { value: 'sapatos', label: 'Sapatos', icon: '👟' },
  { value: 'gamer', label: 'Gamer', icon: '🎮' },
  { value: 'esportes', label: 'Esportes', icon: '🏃' },
  { value: 'livros', label: 'Livros', icon: '📚' },
  { value: 'roupas', label: 'Roupas', icon: '👕' },
  { value: 'outros', label: 'Outros', icon: '🤷' }
] as const;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (!initialLoading) {
      filterProducts();
    }
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      setInitialLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setInitialLoading(false);
      setLoading(false);
    }
  };

  const filterProducts = async () => {
    try {
      setLoading(true);
      if (selectedCategory) {
        const data = await api.getProducts(selectedCategory);
        setProducts(data);
      } else {
        const data = await api.getProducts();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContact = async (product: Product, method: 'whatsapp' | 'email') => {
    try {
      if (method === 'whatsapp') {
        const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name}`);
        window.open(`https://wa.me/5524988597398?text=${message}`, '_blank');
      } else {
        window.location.href = `mailto:steixeira1337@gmail.com?subject=Interesse em ${product.name}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-300 ${
            isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 md:h-20 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500 ring-offset-2">
                  <Image
                    src="https://pm1.aminoapps.com/6290/0b231f09cc2e108e4b7eee308e60747a03d1c643_hq.jpg"
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    bazar do samuca
                  </h1>
                  {/* <p className="text-sm text-gray-500">
                    to desapegando pessoal
                  </p> */}
                </div>
              </div>
              
              {/* Controles de busca */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="w-full sm:w-64">
                  <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left 
                                               border-2 border-purple-200 hover:border-purple-300 focus:outline-none 
                                               focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500 
                                               focus-visible:ring-opacity-75 focus-visible:ring-offset-2 transition-all">
                        <span className="flex items-center">
                          <span className="mr-2">
                            {categories.find(cat => cat.value === selectedCategory)?.icon}
                          </span>
                          <span className="block truncate">
                            {categories.find(cat => cat.value === selectedCategory)?.label || 'Todas as categorias'}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 
                                                  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none 
                                                  sm:text-sm z-50">
                          {categories.map((category) => (
                            <Listbox.Option
                              key={category.value}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                                }`
                              }
                              value={category.value}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`flex items-center truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}>
                                    <span className="mr-2">{category.icon}</span>
                                    {category.label}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                {/* Barra de Pesquisa */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-purple-200 
                             focus:border-purple-500 focus:outline-none focus:ring-2 
                             focus:ring-purple-500 focus:ring-opacity-50
                             placeholder-gray-400 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 pt-64 md:pt-32 pb-32">
        {/* Título da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            to desapegando, pessoal.. vou compartilhar as bugigangas com vcs
          </h2>
          <p className="text-gray-600">
            se precisarem de fotos reais, me chama no whatsapp
          </p>
        </div>

        {/* Grid de Produtos */}
        {initialLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado 😢
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="mt-4 text-purple-500 hover:text-purple-600"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200 ${
            loading ? 'opacity-50' : 'opacity-100'
          }`}>
            {filteredProducts.map((product) => (
              <div key={product.id} 
                   className="group bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transform transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                    <span className="text-2xl font-bold text-purple-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-2">{product.description}</p>
                  <div className="flex gap-2 mb-6">
                    {/* Status do produto */}
                    {(() => {
                      const { emoji, label, classes } = getAvailabilityInfo(product.available);
                      return (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${classes}`}>
                          {emoji} {label}
                        </span>
                      );
                    })()}
                    
                    {/* Condição do produto */}
                    {(() => {
                      const { emoji, label } = getConditionInfo(product.condition);
                      return (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {emoji} {label}
                        </span>
                      );
                    })()}
                  </div>
                  {product.available && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleContact(product, 'whatsapp')}
                        className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium 
                                 transition-all duration-300 hover:bg-green-600 hover:shadow-lg 
                                 active:transform active:scale-95"
                      >
                        📱 me chama no zap
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t shadow-lg">
        <div className="container mx-auto px-4 py-2">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              bazar do samuca
            </h3>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://instagram.com/samuelteixeira" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-500 hover:text-purple-600"
              >
                insta
              </a>
              <a 
                href="https://wa.me/5524988597398" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-500 hover:text-purple-600"
              >
                zapzap
              </a>
              <a 
                href="mailto:steixeira1337@gmail.com" 
                className="text-purple-500 hover:text-purple-600"
              >
                email
              </a>
            </div>
            <div className="mt-1 text-gray-500 text-xs">
              © 2024 Bazar do Samuca - Todos os direitos reservados
            </div>
          </div>
        </div>
      </footer>

      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-8 bg-purple-500 text-white p-3 rounded-full shadow-lg 
                     hover:bg-purple-600 transition-all z-50 hover:scale-110 active:scale-95"
        >
          ⬆️
        </button>
      )}
    </div>
  );
}