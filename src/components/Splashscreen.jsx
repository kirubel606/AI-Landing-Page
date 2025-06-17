import React from 'react'
import Logo from '/public/logo.png'
import { Player } from '@lottiefiles/react-lottie-player'
import splashAnimation from '../../public/Assets/BrainLottie.json' // adjust if in another path

const Splashscreen = () => {
  return (
    <div className="h-dvh flex flex-col justify-center items-center bg-[#080a24]">
        <div className='h-dvh blur-sm w-full z-0'></div>
      <img src={Logo} alt='Logo' className='rounded-full w-[10%] mb-3 animate-pulse'/>
        <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl md:text-center lg:text-5xl font-bold mb-8 mt-3 leading-tight">
                <span className="text-white mr-2">Ethiopian Artificial</span>
                <br />
                <span className="text-orange-400">Intelligence Institute</span>
            </h1>
        </div>
        <div className='mb-72 md:mb-10'>
      <Player
        autoplay
        loop
        src={splashAnimation}
        style={{ height: '300px', width: '300px' }}
      /></div>
    </div>
  )
}

export default Splashscreen