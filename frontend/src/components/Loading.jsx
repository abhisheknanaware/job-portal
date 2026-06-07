import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50/10'>
      <div className='relative flex items-center justify-center'>
        <div className='w-14 h-14 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin'></div>
        <div className='absolute w-8 h-8 bg-violet-500/15 rounded-full blur-xs animate-ping'></div>
      </div>
      <p className='mt-5 text-xs font-bold text-violet-600/80 tracking-widest uppercase animate-pulse'>
        Loading Opportunities...
      </p>
    </div>
  )
}

export default Loading
