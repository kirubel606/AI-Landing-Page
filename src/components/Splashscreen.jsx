import React from 'react'
import Logo from '/public/logo.png'
import { Player } from '@lottiefiles/react-lottie-player'
import splashAnimation from '../../public/Assets/BrainLottie.json' // adjust if in another path

const Splashscreen = () => {
  return (
<div className=" pt-32 h-screen flex flex-col justify-center items-center bg-[#080a24] px-4">
  <div className="absolute inset-0 w-full h-full blur-sm bg-gradient-to-br from-[#080a24] via-[#000] to-[#080a24]" />

  <img
    src={Logo}
    alt="Logo"
    className="rounded-full w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/12 mb-4 animate-pulse z-10"
  />

  <div className="text-center z-10">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
      <span className="block">Ethiopian Artificial</span>
      <span className="block text-orange-400">Intelligence Institute</span>
    </h1>
  </div>

  <div className="z-10 mb-10 sm:mb-16">
    <Player
      autoplay
      loop
      src={splashAnimation}
      style={{
        width: "min(80vw, 300px)",
        height: "auto",
      }}
    />
  </div>
</div>

  )
}

export default Splashscreen