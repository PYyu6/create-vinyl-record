import React, { useRef, useEffect, useState } from 'react'

const getPixelRatio = context => {
  var backingStore =
  context.backingStorePixelRatio ||
  context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio ||
  1;
  
  return (window.devicePixelRatio || 1) / backingStore;
};

const ChordsAnimation = props => {
  //only if need to playchord then setchord
  const { curr_chord,  playChord, setPlayChord} = props
  const [audio, setAudio] = useState(null)
  const [chord, setChord] = useState()  
  // const [playChord, setPlayChord] =useState(false)

  const canvasRef = useRef(null)
  
  const draw = (ctx, frameCount) => {
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'white'

    const r = 330
    const c = {x: 350, y: 350}

    if (chord){
      Object.keys(chord).forEach(item=> {
        ctx.beginPath()
        let i = chord[item]
        let deg = 15 + i* 30
        ctx.arc(c.x + r* Math.cos(deg * Math.PI /180), c.y + r* Math.sin(deg *Math.PI /180), 8*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
  
      })
    }

  }

  const play_sound = (() => {
    if (audio){
      setChord(curr_chord)

      Object.keys(curr_chord).forEach(item => audio.play(item +"4"))
      
    }
  })

 

  useEffect(()=>{
    var Soundfont = require('soundfont-player')
    var  audioContext = new AudioContext()
    Soundfont.instrument(audioContext, 'marimba')
      .then(soundFontPlayer => {
        setAudio(soundFontPlayer)
      })
    //document.addEventListener('mousemove', onmousemove, false);
  }, [])

  useEffect(()=>{

    if (audio && playChord) {
        
        play_sound()
        setPlayChord(false) 
            
    }
  }, [audio, playChord]);
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    let ratio = getPixelRatio(context);
    let width = window.getComputedStyle(canvas)
        .getPropertyValue('width')
        .slice(0, -2);
    let height = getComputedStyle(canvas)
        .getPropertyValue('height')
       .slice(0, -2);
  
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    
    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} style={{ width: window.innerWidth, height: window.innerHeigh}}/>
}

export default ChordsAnimation