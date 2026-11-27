// components/video-player.tsx
'use client'

import ReactPlayer from 'react-player'

interface Props {
  url: string
}

// YouTube Shorts havolasini oddiy formatga o'giradi
const normalizeUrl = (url: string) => {
  const shorts = url.match(/youtube\.com\/shorts\/([\w-]+)/)
  return shorts ? `https://www.youtube.com/watch?v=${shorts[1]}` : url
}

const VideoPlayerYoutube = ({ url }: Props) => {
  return (
    <div className='aspect-video w-full overflow-hidden rounded-lg bg-black '>
      <ReactPlayer
        src={normalizeUrl(url)}
        controls
        width='100%'
        height='100%'
      />
    </div>
  )
}

export default VideoPlayerYoutube
