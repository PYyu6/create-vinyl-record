import React, { useRef, useEffect } from 'react'

function UseKey(key, cb) {
    //canvas
    const canvasRef = useRef(null)
    useEffect(() => {

        //???do we need this?
        //??what is useRef.current?
        canvasRef.current = cb
    
        // const canvas = canvasRef.current
        // const context = canvas.getContext('2d')

        // let frameCount = 0
        // let animationFrameId
        
        // const render = () => {
        //   frameCount++
        //   draw(context, frameCount)
        //   animationFrameId = window.requestAnimationFrame(render)
        // }
        // render()
        
        // return () => {
        //   window.cancelAnimationFrame(animationFrameId)
        // }
    // }, [draw])
    })


    
    useEffect(() => {
        const handle = (e) => {
        if (e.code === key){
            canvasRef.current(e)
        
        }
        }
        window.addEventListener('keypress', handle);
    
        return () => {
        window.removeEventListener('keypress', handle);
        };
    }, []);
    // return (
    //     <div>
            
    //     </div>
    // )
}

export default UseKey
