'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Basic mobile check including touch capability
      setIsMobile(
        window.innerWidth < 768 || 
        window.matchMedia("(pointer: coarse)").matches ||
        'ontouchstart' in window
      );
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addParticle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    const size = Math.random() * 8 + 2; // 2px to 10px
    const rotation = Math.random() * 360;
    const colors = ['#ffffff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#f0f9ff']; 
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const newParticle: Particle = { id, x, y, size, color, rotation };
    
    setParticles((prev) => [...prev.slice(-30), newParticle]); 
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let lastX = 0;
    let lastY = 0;
    const threshold = 8; 

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
      
      if (dist > threshold) {
        addParticle(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, addParticle]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0, x: particle.x, y: particle.y, rotate: particle.rotation }}
            animate={{ 
              opacity: [0, 1, 0.8, 0], 
              scale: [0, 1.2, 0.5, 0], 
              y: particle.y + (Math.random() - 0.5) * 40, 
              x: particle.x + (Math.random() - 0.5) * 40, 
              rotate: particle.rotation + 180 
            }}
            transition={{ duration: 1, ease: "linear" }}
            className="absolute"
            style={{ 
              left: 0, 
              top: 0,
              marginLeft: -particle.size / 2,
              marginTop: -particle.size / 2,
              color: particle.color,
              filter: 'blur(0.5px) drop-shadow(0 0 2px rgba(255,255,255,0.8))'
            }}
          >
            <Star 
              size={particle.size} 
              fill="currentColor" 
              strokeWidth={0}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;
