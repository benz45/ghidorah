import HorizontalCard from '@/components/product/horizontalCard'
import VerticalCard from '@/components/product/verticalCard'

export default function ProductIGroup() {
  return (
    <>
      <div className="col-span-2">
        <div className="grid row-span-2 gap-5">
          <HorizontalCard
            title="Get up to 50% off"
            image="https://i.ibb.co/wL3nWkm/Pngtree-memphis-style-line-point-line-3797599.png"
            backgroundColor="#BCE7F0"
          />
          <HorizontalCard
            title="New Jordan Series"
            description="Best of daily wear"
            backgroundColor="#dec8f3"
            image="https://i.ibb.co/qdY3T5g/kindpng-53319.png"
          />
        </div>
      </div>
      <VerticalCard
        title="Hugo Boss Leather Jacket"
        backgroundColor="#f6f6f6"
        image="https://i.ibb.co/ZK2L8cg/kisspng-fashion-model-hugo-boss-pinpoint-resource-of-oklah-mens-fashion-5a78e637c1bde9-3434957015178.png"
      />
      <VerticalCard
        title="Hugo Boss Leather Jacket"
        backgroundColor="#f6f6f6"
        image="https://i.ibb.co/xmJdGXD/kisspng-slip-dress-clothing-casual-fashion-model-5abb4a319d2986-8864671115222236656438.png"
      />
      <VerticalCard
        title="Hugo Boss Leather Jacket"
        backgroundColor="#f6f6f6"
        image="https://i.ibb.co/xmJdGXD/kisspng-slip-dress-clothing-casual-fashion-model-5abb4a319d2986-8864671115222236656438.png"
      />
      <VerticalCard
        title="Hugo Boss Leather Jacket"
        backgroundColor="#f6f6f6"
        image="https://i.ibb.co/xmJdGXD/kisspng-slip-dress-clothing-casual-fashion-model-5abb4a319d2986-8864671115222236656438.png"
      />
    </>
  )
}
