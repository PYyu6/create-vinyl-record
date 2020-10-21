import React from 'react'
import Canvas from './Draw/Canvas'
import './App.css'
// import CanvasDraw from './CanvasDraw'
// import useKey from './useKey'
import { useState, useEffect } from 'react'
import useEventListener from "./use-event-listener";
import ChordsAnimation from "./Draw/ChordsAnmation"


import initialData from "./Data/initialData";
import chordsData from "./Data/chordsData"


function App() {

  const [key, setKey] = useState('');

  const [octave, setOctave] = useState(3)

  const [allData,  setAllData] = useState(initialData)

  const [audio, setAudio] = useState(null)

  const [pitch, setPitch] = useState()

  const [chord, setChord] = useState({})  
  const [playChord, setPlayChord] =useState(false)



  const process_chord = ((new_pitch) => {
    if (!(new_pitch in chord)  && !playChord){


      let ind = chordsData[new_pitch]

      setChord({...chord, [new_pitch]:ind})
      
      if (Object.keys(chord).length >2){
        setPlayChord(true)
        let all_notes= Object.keys(chord)
        all_notes.forEach((item, index, arr) => {
          arr[index] = item+"5"
        })

        setChord({})
        
      }
    }
  })

  useEventListener(
    "keydown", 
    (event) => 
    {setKey(event.key) 
    let temp = allData[1].filter(item => {
 
      return ((item.key).localeCompare(event.key) == 0)
     
    })[0]
    if (typeof temp === 'undefined'){
        return
     }
     setPitch(temp.pitch)
     process_chord(temp.pitch)

 
  }
  );

  useEffect(()=> {
    let note = pitch +octave
    if (audio){
      
      audio.play(note)
      setPitch('')
    }else {
        console.log("not set yet")
        
    }

  }
  ,[pitch])


  const handleClick = () => {

    let note = pitch +octave
    if (audio){
      audio.play(note)
      
    }
    else {
      console.log("not set yet")
    }

  };
  useEffect(()=>{

    var Soundfont = require('soundfont-player')
    var  audioContext = new AudioContext()
    Soundfont.instrument(audioContext, 'acoustic_grand_piano')
      .then(soundFontPlayer => {
        setAudio(soundFontPlayer)
      })
  }, [])

  useEffect(()=>{
    if (audio) {
        handleClick()
    }
  }, [audio]);


  
  return (

  <div id="canvasBorder">
       <div id="frame1">
      <button className="btn" onClick={() => setOctave(1)}>
      <i>1</i>
      </button>
        <button className="btn" onClick={() => setOctave(2)}>
      <i>2</i>
      </button>
      <button className="btn" onClick={() => setOctave(3)}>
      <i>3</i>
      </button>
      <button className="btn" onClick={() => setOctave(4)}>
      <i>4</i>
      </button>
      <button className="btn" onClick={() => setOctave(5)}>
      <i>5</i>
      </button>
 
    </div>


    <div id='cava_draw'>
   
    {/* <span id='chord_name' style={{
            fontSize: font
          }}>{chordName}</span> */}
    <Canvas keycode={key} setKey={setKey} allData={allData} setAllData={setAllData} scale={octave}/>
    <ChordsAnimation curr_chord={chord} playChord={playChord} setPlayChord={setPlayChord}/>
    <div id="circle_center"></div>
    </div>
   
    <div id="frame2">
      <div className="instru">
      <p >
        You could write your melody on this vinyl record in these steps:
        <br /><br /><br />
        Set browser window full screen
        <br /><br />

        Choose an octave by clicking one of top-left buttons
        <br /><br />

        Play notes by pressing keyboard keys:
        "        a   w  s   e   d   f   t   g   y   h   u   j" 
        <br /> <br /> <br />
 
        Then, you will hear and see the best fitting chords for your melody! 


      </p>
      </div>
      <a href="https://www.peiyuhyu.com/2020/10/19/i-design-a-music-visualization/">Learn More</a>
 
    </div>
 


    </div>
  )
}

export default App