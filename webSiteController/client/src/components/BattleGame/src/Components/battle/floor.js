import { useEffect, useRef } from "react";

export const Floor = (props) => {
    const {floor} = props
    const canvasRef = useRef(null)
    


    // Draw the ellipse
    useEffect(() => {
    
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        let gradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);

        // Add three color stops
        gradient.addColorStop(0, "rgba(241,221,190,0.5)");
        gradient.addColorStop(0.5, "rgba(255,255,255,0.35)");
        gradient.addColorStop(0.7, "rgba(255,255,255,0.07)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.ellipse(100, 100, 75, 50, 0, 0, Math.PI*2);
        ctx.strokeStyle = "rgba(255,255,255,0)"
        ctx.stroke();
        ctx.fill()
        
    }, [])

    return(
        <canvas className="floor" ref={canvasRef} {...props}/>
    )
}