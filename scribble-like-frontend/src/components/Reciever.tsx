import { useEffect, useState } from "react"
import { useRef } from 'react'
type Draw = {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
}

type Point = { x: number; y: number } | null

function Receiver({ currentPoint , prevPoint , color}:any) {
  
  // useEffect(()=>{
  //   // @ts-ignore
  //   ctx?.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
  // },[])
  
  // console.log(currentPoint);
  
  const canvasRef = useRef(null);
  // @ts-ignore
  const ctx = canvasRef.current?.getContext('2d');
  // @ts-ignore
  // ctx?.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height)
  
  drawLine({ ctx, currentPoint, prevPoint })
  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    if(!prevPoint || !currentPoint) return
    const { x: currX, y: currY } = currentPoint
    // setPrevPoint(prevPoint);
    // setCurrentPoint(currentPoint);
    // console.log(prevPoint);
    // console.log(currentPoint);
    // console.log(color);
    const lineColor = color
    const lineWidth = 5
  
    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
  
    ctx.lineTo(currX, currY)
    ctx.stroke()
  
    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

    
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={750}
        height={750}
        className='border border-black rounded-md'
      />
    </div>
  )
}

export default Receiver