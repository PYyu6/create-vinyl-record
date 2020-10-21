
import React, { useRef, useEffect, useState } from 'react'

const inc = 5



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


//sound  
const convertHexToRGBA = (hexCode, opacity) => {

  const hex = hexCode.replace('#', ''); 
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};




//start of function
const Canvas = props=> {
  const { keycode, setKey, allData, setAllData, scale } = props
  const canvasRef = useRef(null)

  

  const draw = (ctx, frameCount) => {
    let new_data = {}
    Object.keys(allData).forEach(ind => {
      if (ind == scale){
        for (let i = 0; i < allData[ind].length; i++){
          let item = allData[ind][i]
          if (item.key.localeCompare(keycode) == 0){
            item.opa += inc
            item.col_display = convertHexToRGBA(item.col_origin, item.opa)
            
          }
          else{
            continue;
          }

        }

        new_data[ind] = allData[ind]

     }else{
       
       new_data[ind] = allData[ind]
       
     }
    })

    setAllData(new_data)

  
    
    Object.entries(allData).forEach(entry => {
      const [key, value] = entry;
      value.forEach((item, index) => {
        ctx.beginPath(); 
        ctx.lineWidth = 20;

        ctx.strokeStyle = item.col_display
        let count = 12

        let part = 2*Math.PI / count
        let start = index* part
        let radius = key* 60
        ctx.arc(350, 350, radius, start, part+start)
        ctx.stroke()
      
      })
    });

  


    setKey('')
    
  }





  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0




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
    


    draw(context, frameCount)
 
  }, [keycode])
  
  return <canvas ref={canvasRef} style={{ width: window.innerWidth, height: window.innerHeigh}}/>
}

export default Canvas