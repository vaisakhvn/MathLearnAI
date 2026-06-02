'use client';

import * as React from 'react';
import { Eraser, Pen, Undo, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// this component provides a drawing canvas for users to scribble calculations
// it supports drawing erasing undoing and clearing the canvas
export function Whiteboard() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = React.useState(false);
    const [eraseMode, setEraseMode] = React.useState(false);

    // Simple history for Undo (stores image data)
    const historyRef = React.useRef<ImageData[]>([]);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match container
        const resizeObserver = new ResizeObserver(() => {
            // Save current content
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempCanvas.getContext('2d')?.drawImage(canvas, 0, 0);

            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;

            // Restore content broadly (optional, usually clear on resize or stretch)
            ctx.drawImage(tempCanvas, 0, 0);

            // Re-apply context settings
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#a5b4fc';
        });

        resizeObserver.observe(container);

        // Initial settings
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#a5b4fc';

        return () => resizeObserver.disconnect();
    }, []);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Save state for undo
        historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        if (historyRef.current.length > 20) historyRef.current.shift(); // Limit history

        setIsDrawing(true);
        const { x, y } = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.strokeStyle = eraseMode ? '#0f172a' : '#a5b4fc'; // Erase with bg color (hacky but works for solid bg)
        ctx.lineWidth = eraseMode ? 20 : 3;
        // Note: For real eraser, use destination-out composite op, but globalCompositeOperation is tricky with simple setup.
        if (eraseMode) ctx.globalCompositeOperation = 'destination-out';
        else ctx.globalCompositeOperation = 'source-over';
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { x, y } = getCoordinates(e);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleUndo = () => {
        const canvas = canvasRef.current;
        if (!canvas || historyRef.current.length === 0) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const previousState = historyRef.current.pop();
        if (previousState) ctx.putImageData(previousState, 0, 0);
    };

    return (
        <div className="flex flex-col h-full bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800">
            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-slate-800/50 border-b border-slate-700">
                <Button
                    variant={!eraseMode ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setEraseMode(false)}
                    title="Pen"
                >
                    <Pen className="w-4 h-4" />
                </Button>
                <Button
                    variant={eraseMode ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setEraseMode(true)}
                    title="Eraser"
                >
                    <Eraser className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-slate-700 mx-1" />
                <Button variant="ghost" size="sm" onClick={handleUndo} title="Undo">
                    <Undo className="w-4 h-4" />
                </Button>
                <div className="flex-1" />
                <Button variant="ghost" size="sm" onClick={handleClear} title="Clear All" className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            {/* Canvas Area */}
            <div ref={containerRef} className="flex-1 relative cursor-crosshair bg-[#0f172a]" style={{ touchAction: 'none' }}>
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="block"
                />
                {/* Grid background */}
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
            </div>
        </div>
    );
}
