'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface CoursePlayerProps {
  videoUrl: string
  lessonId: string
  userId: string
  initialProgress?: number
  duration?: number
}

function detectVideoType(url: string): 'cloudinary' | 'vimeo' | 'youtube' | 'direct' | 'unknown' {
  if (url.includes('cloudinary.com') || url.includes('res.cloudinary.com')) return 'cloudinary'
  if (url.includes('vimeo.com') || url.includes('player.vimeo.com')) return 'vimeo'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) return 'direct'
  return 'unknown'
}

function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

function extractVimeoId(url: string): string | null {
  const regExp = /vimeo\.com\/(?:.*\/)?(\d+)/
  const match = url.match(regExp)
  return match ? match[1] : null
}

export default function CoursePlayer({
  videoUrl,
  lessonId,
  userId,
  initialProgress = 0,
  duration: expectedDuration,
}: CoursePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(initialProgress)
  const [duration, setDuration] = useState(expectedDuration || 0)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const lastSavedTime = useRef(0)
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)

  const videoType = detectVideoType(videoUrl)

  // Track progress to server
  const saveProgress = useCallback(async (watchTime: number, completed: boolean = false) => {
    // Debounce - don't save if we saved recently (within 5 seconds) and position hasn't changed much
    if (!completed && Math.abs(watchTime - lastSavedTime.current) < 5) return

    lastSavedTime.current = watchTime

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          lessonId,
          watchTime: Math.round(watchTime),
          completed,
        }),
      })
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }, [userId, lessonId])

  // Handle time update
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    const currentProgress = (video.currentTime / video.duration) * 100

    setCurrentTime(video.currentTime)
    setProgress(currentProgress)

    // Mark as completed if watched 90%+
    if (currentProgress >= 90 && !hasCompleted) {
      setHasCompleted(true)
      saveProgress(video.currentTime, true)
    }
  }, [hasCompleted, saveProgress])

  // Save progress periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying) {
        saveProgress(videoRef.current.currentTime, false)
      }
    }, 10000) // Every 10 seconds

    return () => clearInterval(interval)
  }, [isPlaying, saveProgress])

  // Save progress when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        saveProgress(videoRef.current.currentTime, false)
      }
    }
  }, [saveProgress])

  // Set initial position
  useEffect(() => {
    if (videoRef.current && initialProgress > 0) {
      videoRef.current.currentTime = initialProgress
    }
  }, [initialProgress])

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      if (initialProgress > 0) {
        videoRef.current.currentTime = initialProgress
      }
    }
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const newTime = (parseFloat(e.target.value) / 100) * duration
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration))
  }

  // Playback rate
  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2]
    const currentIndex = rates.indexOf(playbackRate)
    const nextRate = rates[(currentIndex + 1) % rates.length]
    setPlaybackRate(nextRate)
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate
    }
  }

  // Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      videoRef.current.muted = newVolume === 0
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return
    const newMuted = !isMuted
    setIsMuted(newMuted)
    videoRef.current.muted = newMuted
  }

  // Fullscreen
  const toggleFullscreen = async () => {
    if (!playerContainerRef.current) return

    if (!document.fullscreenElement) {
      await playerContainerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if video player is focused/visible
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          break
        case 'arrowleft':
        case 'j':
          e.preventDefault()
          skip(-10)
          break
        case 'arrowright':
        case 'l':
          e.preventDefault()
          skip(10)
          break
        case 'm':
          e.preventDefault()
          toggleMute()
          break
        case 'f':
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isMuted])

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current)
    }
    if (isPlaying) {
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle video type
  if (videoType === 'youtube') {
    const youtubeId = extractYouTubeId(videoUrl)
    if (!youtubeId) {
      return (
        <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center text-white">
          <p>לא ניתן לטעון את הסרטון</p>
        </div>
      )
    }
    return (
      <div className="aspect-video rounded-2xl overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (videoType === 'vimeo') {
    const vimeoId = extractVimeoId(videoUrl)
    if (!vimeoId) {
      return (
        <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center text-white">
          <p>לא ניתן לטעון את הסרטון</p>
        </div>
      )
    }
    return (
      <div className="aspect-video rounded-2xl overflow-hidden bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // Direct video (Cloudinary or other)
  return (
    <div
      ref={playerContainerRef}
      className={`relative aspect-video bg-black rounded-2xl overflow-hidden group ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false)
          saveProgress(duration, true)
        }}
        playsInline
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition"
        >
          <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-purple-600 mr-[-4px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-white text-xs font-mono min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          <div className="relative flex-1 h-1 bg-white/30 rounded-full overflow-hidden group/progress">
            <div
              className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-white text-xs font-mono min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Skip backward */}
            <button
              onClick={() => skip(-10)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition"
              title="10 שניות אחורה"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
            </button>

            {/* Skip forward */}
            <button
              onClick={() => skip(10)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition"
              title="10 שניות קדימה"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1 group/volume">
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition"
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-16 transition-all duration-200 opacity-0 group-hover/volume:opacity-100 h-1 accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Playback speed */}
            <button
              onClick={changePlaybackRate}
              className="px-2 h-8 rounded hover:bg-white/10 flex items-center justify-center transition text-white text-sm font-medium"
            >
              {playbackRate}x
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition"
            >
              {isFullscreen ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Completion indicator */}
      {hasCompleted && (
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-green-500 text-white text-sm font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          הושלם
        </div>
      )}
    </div>
  )
}
