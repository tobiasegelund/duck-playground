import React from 'react'


export const LoadingScreen: React.FC = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <span className="loading loading-ring loading-lg"></span>
    </div>
  )
}