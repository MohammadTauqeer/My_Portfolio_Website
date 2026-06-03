'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the element or its parents are interactive
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.interactive') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Hide cursor on mobile/touch devices
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
    return () => document.body.classList.remove('custom-cursor-active');
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white z-[9999] pointer-events-none flex items-center justify-center mix-blend-difference"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        left: 0,
        top: 0,
        x: '-50%',
        y: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovered ? 2 : 1,
        backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{ type: "spring", damping: 20, stiffness: 200, opacity: { duration: 0.2 } }}
    >
        <motion.div 
            className="w-1 h-1 bg-white rounded-full"
            animate={{ scale: isHovered ? 0 : 1 }}
        />
    </motion.div>
  );
};

export default CustomCursor;
