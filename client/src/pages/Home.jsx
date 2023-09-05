import React from 'react'
import { useState, useEffect } from 'react'
import {Card, Loader, FormField} from '../components'

    const RenderCards = ({data , title}) => {
            if (data?.length > 0  ) return data.map((post) => {<Card key={post.id } {...post} />})
            return <h2 className='mt-5 font-bold text-white  text-xl uppercase'>{title}</h2>
        }
const Home = () => {
    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState(null)
    const [searchText, setSearchText] = useState("")
    

  return (
    <section className="max-w-7xl mx-auto">
        <div className='text-white bg-gradient-to-r hover:shadow-xl from-slate-950 to-purple-700 p-10 border border-white rounded-2xl hover:bg-gradient-to-b from-purple-700 to-slate-950'>
            <h1 className="font-bold font-inter text-[32px] ">The Community Showcase</h1>
            <p className="mt-2  text-[18px] max-w-[500] bg-gradient-to-r from-purple-500 to-yellow-200 font-bold text-xl bg-clip-text text-transparent">
                    Get amazed by our Ai's visually stunning art pieces. Generated through the powers pf DallE2 and enhacnced by Picaly
            </p>
        </div>
        <div className='mt-16'>
            <FormField  />
        </div>
        <div className='mt-10'>
            {loading ? (
                <div className='flex justify-center items-center'> <Loader /></div>
            ) :(
            
            
            <>
                   {searchText && (
                    <h2 className="font-medium text-[#666e75] text-xl mb-3 mt-10">
                        Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
                    </h2>
                    )}
                    <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 '>
                            {searchText ? (
                                <RenderCards data= {[]} title ="No Search Result Found" />
                            ) : (
                                <><RenderCards data={[]} title="No Posts Found"/></>
                            )}
                    </div>
             </>
             
             
             )}
        </div>
    </section>
  )
}

export default Home