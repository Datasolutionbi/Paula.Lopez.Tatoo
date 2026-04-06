import React, { useState, useRef, useCallback, useEffect } from 'react';

interface InkStoriesProps {
    beforeImage?: string;
    afterImage?: string;
    title?: string;
    label?: string;
}

export const InkStories: React.FC<InkStoriesProps> = ({
    beforeImage = "https://images.unsplash.com/photo-1590204753862-392842497b68?q=80&w=800",
    afterImage = "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800",
    title = "COVER-UP TRANSFORMATION",
    label = "DRAG TO REVEAL"
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const comparatorRef = useRef<HTMLDivElement>(null);

    // Use a ref for current position to avoid re-renders during drag but update state for final render
    const positionRef = useRef(50);

    const updatePosition = useCallback((clientX: number) => {
        if (!containerRef.current || !handleRef.current || !comparatorRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let x = clientX - rect.left;

        // Clamp
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        const percentage = (x / rect.width) * 100;
        positionRef.current = percentage;

        // Direct DOM manipulation for performance
        comparatorRef.current.style.width = `${percentage}%`;
        handleRef.current.style.left = `${percentage}%`;
        handleRef.current.setAttribute('aria-valuenow', Math.round(percentage).toString());
    }, []);

    const handleMouseDown = useCallback(() => setIsDragging(true), []);
    const handleTouchStart = useCallback(() => setIsDragging(true), []);

    const handleMouseUp = useCallback(() => setIsDragging(false), []);
    const handleTouchEnd = useCallback(() => setIsDragging(false), []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        updatePosition(e.clientX);
    }, [isDragging, updatePosition]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging) return;
        updatePosition(e.touches[0].clientX);
    }, [isDragging, updatePosition]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let newPercentage = positionRef.current;

        if (e.key === 'ArrowLeft') {
            newPercentage = Math.max(0, newPercentage - 5);
        } else if (e.key === 'ArrowRight') {
            newPercentage = Math.min(100, newPercentage + 5);
        }

        const x = (newPercentage / 100) * rect.width + rect.left;
        updatePosition(x);
    }, [updatePosition]);

    // Global event listeners for drag outside component
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleTouchEnd);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
        } else {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        }

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isDragging, handleMouseUp, handleTouchEnd, handleMouseMove, handleTouchMove]);

    return (
        <div className="w-full max-w-4xl mx-auto py-12 relative">
            <div className="text-center mb-6 reveal-effect">
                <h3 className="font-display text-4xl mb-3">{title}</h3>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-studio-purple animate-pulse">{label}</span>
            </div>

            <div
                ref={containerRef}
                className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-none overflow-hidden shadow-2xl stencil-border group reveal-effect touch-none"
                style={{ containerType: 'inline-size' }}
            >

                {/* After Image (Background) */}
                <img src={afterImage} className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" alt="After" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-none text-[8px] uppercase tracking-widest font-bold text-white z-10">Healed / Final</div>

                {/* Before Image (Clipped) */}
                <div
                    ref={comparatorRef}
                    className="absolute inset-0 w-1/2 overflow-hidden border-r-2 border-studio-purple"
                    style={{ width: '50%' }}
                >
                    <img
                        src={beforeImage}
                        className="absolute inset-0 w-full h-full max-w-none object-cover select-none pointer-events-none"
                        alt="Before"
                        style={{ width: '100cqw', height: '100cqh' }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-none text-[8px] uppercase tracking-widest font-bold text-white">Stencil / Old</div>
                </div>

                {/* Handle */}
                <div
                    ref={handleRef}
                    className="absolute inset-y-0 left-1/2 w-8 -ml-4 flex items-center justify-center cursor-ew-resize z-20 group-hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-purple rounded-none outline-none"
                    role="slider"
                    tabIndex={0}
                    aria-label="Comparison Slider"
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onKeyDown={handleKeyDown}
                    style={{ left: '50%' }}
                >
                    <div className="w-8 h-8 rounded-none bg-studio-purple border-2 border-white flex items-center justify-center shadow-[0_0_20px_rgba(157,78,221,0.6)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m9 18 6-6-6-6" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white rotate-180 absolute"><path d="m9 18 6-6-6-6" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
