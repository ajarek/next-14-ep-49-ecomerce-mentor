import Image from "next/image";
import data from '@/data/data.json'
export default function Home() {
  return (
    <main className="flex bg-[var(--Rose-300)] min-h-screen flex-col items-center justify-between p-24">
      <div className='grid grid-cols-3 gap-4'>

      {data.map((item, index) => (
        <div key={index}>
          <Image src={item.image.thumbnail} alt={item.name} width={300} height={300} />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{(item.price).toFixed(2)}$</p>
        </div>
      ))}



      </div>
    </main>
  );
}
