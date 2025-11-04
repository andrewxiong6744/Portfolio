import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
  transitionColor?: string;
  clickPosition?: { x: number; y: number } | null;
}

export function PageTransition({ 
  children, 
  pageKey, 
  transitionColor = '#6366f1',
  clickPosition 
}: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full h-full"
      >
        {/* Ripple effect overlay */}
        <AnimatePresence>
          {clickPosition && (
            <motion.div
              key={`ripple-${pageKey}`}
              className="fixed inset-0 pointer-events-none z-50"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Multiple ripple circles for liquid effect */}
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-full"
                  style={{
                    left: clickPosition.x,
                    top: clickPosition.y,
                    background: `radial-gradient(circle, ${transitionColor}${Math.floor(80 - index * 15).toString(16)} 0%, transparent 70%)`,
                    filter: 'blur(20px)',
                  }}
                  initial={{
                    width: 0,
                    height: 0,
                    x: '-50%',
                    y: '-50%',
                  }}
                  animate={{
                    width: ['0px', `${2400 + index * 400}px`],
                    height: ['0px', `${2400 + index * 400}px`],
                    x: '-50%',
                    y: '-50%',
                  }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.08,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                />
              ))}
              
              {/* Liquid blob effect */}
              <motion.div
                className="absolute"
                style={{
                  left: clickPosition.x,
                  top: clickPosition.y,
                  background: transitionColor,
                  filter: 'blur(40px)',
                  mixBlendMode: 'normal',
                }}
                initial={{
                  width: 0,
                  height: 0,
                  x: '-50%',
                  y: '-50%',
                  borderRadius: '50%',
                }}
                animate={{
                  width: ['0px', '3000px', '100vw'],
                  height: ['0px', '3000px', '100vh'],
                  x: ['-50%', '-50%', '0%'],
                  y: ['-50%', '-50%', '0%'],
                  borderRadius: ['50%', '30%', '0%'],
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.87, 0, 0.13, 1],
                  times: [0, 0.6, 1],
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content with slide animation */}
        <motion.div
          className="w-full h-full"
          initial={{ 
            scale: 0.95,
            filter: 'blur(10px)',
          }}
          animate={{ 
            scale: 1,
            filter: 'blur(0px)',
          }}
          exit={{ 
            scale: 1.05,
            filter: 'blur(10px)',
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          {children}
        </motion.div>

        {/* Particle effects during transition */}
        <AnimatePresence>
          {clickPosition && (
            <div className="fixed inset-0 pointer-events-none z-40">
              {Array.from({ length: 20 }).map((_, i) => {
                const angle = (Math.PI * 2 * i) / 20;
                const distance = 150 + Math.random() * 200;
                const size = 4 + Math.random() * 8;
                
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: clickPosition.x,
                      top: clickPosition.y,
                      width: size,
                      height: size,
                      background: transitionColor,
                      boxShadow: `0 0 ${size * 2}px ${transitionColor}`,
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                      scale: 0,
                    }}
                    animate={{
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      opacity: 0,
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.4,
                      ease: 'easeOut',
                      delay: Math.random() * 0.2,
                    }}
                  />
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Glowing edge effect */}
        <AnimatePresence>
          {clickPosition && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-45"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                boxShadow: `inset 0 0 100px 20px ${transitionColor}`,
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
