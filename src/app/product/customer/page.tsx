'use client'
import CategoryItem from '@/components/categoryItem'
import CartIcon from '@/components/icons/cart'
import SearchIcon from '@/components/icons/search'
import SortIcon from '@/components/icons/sortIcon'
import MenuHomePage from '@/components/product/menuHomePage'
import ProductIGroup from '@/components/product/productIGroup'
import Image from 'next/image'

export default function ProductCustomerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="max-w-6xl w-full">
        <Header />
        <Content />
      </div>
    </main>
  )
}

const Header = () => {
  return (
    <div className="z-10 flex w-full items-center justify-between text-sm lg:flex h-24">
      <div className="text-3xl font-sansitaSwashed font-semibold pb-3">Shopping</div>
      <div className="pl-20 w-full">
        <form action="" className="flex items-center justify-start h-full">
          <SearchIcon width={20} height={20} fill="grey" />
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search for products, brands and more... "
            aria-label="Search for products, brands and more... "
          />
        </form>
      </div>
      <div className="flex whitespace-nowrap items-center w-96">
        <CartIcon width={20} height={20} fill="black" />
        <span className="px-2 font-bold">Cart: 0</span>
        <div className="flex whitespace-nowrap px-10 items-center">
          <Image
            alt=""
            src={'https://picsum.photos/200/200'}
            width={200}
            height={200}
            className="w-10 h-1w-10 rounded-full"
            loading="lazy"
          />
          <span className="font-bold pl-3">Veerapan</span>
          <MenuHomePage />
        </div>
      </div>
    </div>
  )
}

const Content = () => {
  return (
    <div className="w-full h-96 pt-8">
      <div className="grid grid-cols-6">
        <div className="block h-96">
          <div className="flex h-14 items-center">
            <div className="font-bold text-3xl">Explore</div>
          </div>
          <ul className="flex flex-col pt-4">
            <CategoryItem emoji={'⚡'} title={'New In'} />
            <CategoryItem emoji={'👚'} title={'Clothing'} />
            <CategoryItem emoji={'👠'} title={'Shoes'} />
            <CategoryItem emoji={'👜'} title={'Accessories'} />
            <CategoryItem emoji={'🤸'} title={'Activewear'} />
            <CategoryItem emoji={'🎁'} title={'Gifts & Living'} />
            <CategoryItem emoji={'💎'} title={'Inspiration'} />
          </ul>
        </div>
        <div className="col-span-5 h-96">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl">
              <span>⚡</span> New In
            </h1>
            <div className="flex">
              <div className="flex items-center justify-center border-2 rounded-lg px-5 h-14 border-gray-100 mr-5">
                <SortIcon width={22} className="mr-4" />
                <span className="font-bold">Sort</span>
              </div>
              <div className="flex items-center justify-center border-2 rounded-lg px-5 h-14 border-gray-100">
                <div className="bg-black rounded-full w-8 h-8 mr-5 text-white flex items-center justify-center">
                  <span>0</span>
                </div>
                <span className="font-bold">Filter</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5 pt-10">
            <ProductIGroup />
          </div>
        </div>
      </div>
    </div>
  )
}
