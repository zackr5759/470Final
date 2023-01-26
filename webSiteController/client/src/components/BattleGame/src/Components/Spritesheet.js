import React, { useRef, useEffect } from 'react'

const Spritesheet = props => {
    const {image, width, height, steps, fps, loop, enemy} = props;
  
    const canvasRef = useRef(null)
  
    const draw = (ctx, loopIndex) => {
        let img = new Image()
        img.src = image
        ctx.drawImage(img, width*loopIndex, 0, width, 100, 0, 0, width*1.2, height*1.2)
    }
  
    useEffect(() => {
    
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let loopIndex = 0
        let animationFrameId
        const render = () => {
            frameCount++
            if(frameCount < fps / 1.5){
                animationFrameId = window.requestAnimationFrame(render)
                return
            }
            frameCount = 0
            context.clearRect(0, 0, canvas.width, canvas.height)
            draw(context, loopIndex)
            loopIndex++
            if(loopIndex >= steps){
                if(loop === true)
                    loopIndex = 0
            }

            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        return () => {
        window.cancelAnimationFrame(animationFrameId)
        }
  }, [draw])
  
  return <canvas className="sprite" ref={canvasRef} {...props}/>
}

export{
 Spritesheet
}