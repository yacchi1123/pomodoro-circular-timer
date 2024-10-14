"use client"
import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

export const CircularTimer: React.FC = () => {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(25 * 60)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const calculateProgress = () => {
    const totalSeconds = 25 * 60
    const progress = ((totalSeconds - time) / totalSeconds) * 100
    return progress
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="relative w-72 h-72 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
          />
          <circle
            className="text-gray-400 stroke-current"
            strokeWidth="4"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 - (calculateProgress() / 100) * 301.59}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
          <img
            src="/logo.png"
            alt="Timer icon"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="mt-1 text-center">
        <div className="text-4xl font-bold text-gray-600">{formatTime(time)}</div>
        <div className="text-xl text-gray-400">25m Timer</div>
      </div>
      <div className="flex space-x-4 mt-10">
        <button onClick={toggleTimer}>
          {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button onClick={resetTimer}>
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}