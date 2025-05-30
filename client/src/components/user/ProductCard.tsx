import shirt from '../../assets/shirt.png'
const ProductCard = () => {
  return (
    <>
      <section className=' h-[300px] w-[200px] '>

        <img src={shirt} alt="img" className=' w-full bg-gray-100 rounded-xl' />

        <div className='w-full font-text  text-center'>
          <p className='text-xl '>Name allensholly</p>
          <p className='text-sm'>* 4.5</p>
          <p className=''><span className='mr-3'> $ 450</span><span className='mr-3 line-through'>$500</span><span className='text-[12px] text-red-600 border p-1  rounded-xl bg-red-200'>10% off</span> </p>
        </div>
      </section>
    </>
  )
}

export default ProductCard