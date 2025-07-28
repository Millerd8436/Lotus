"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Eye, Move3D, Layers, Maximize, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpatialElement {
  id: string;
  type: 'card' | 'chart' | 'button' | 'text' | 'hologram';
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
  content: any;
  interactive: boolean;
  gaze: boolean;
  gestureResponse: string[];
}

interface GazeData {
  x: number;
  y: number;
  fixationTime: number;
  isGazing: boolean;
}

interface HandGesture {
  type: 'pinch' | 'point' | 'grab' | 'swipe' | 'air_tap';
  position: { x: number; y: number; z: number };
  confidence: number;
}

interface SpatialComputingInterfaceProps {
  mode: 'ar' | 'vr' | 'mixed';
  loanData: {
    amount: number;
    apr: number;
    term: number;
    payments: number;
  };
  onInteraction: (elementId: string, interaction: string) => void;
  isActive: boolean;
}

export const SpatialComputingInterface: React.FC<SpatialComputingInterfaceProps> = ({
  mode,
  loanData,
  onInteraction,
  isActive
}) => {
  const [spatialElements, setSpatialElements] = useState<SpatialElement[]>([]);
  const [gazeData, setGazeData] = useState<GazeData>({
    x: 0,
    y: 0,
    fixationTime: 0,
    isGazing: false
  });
  const [currentGesture, setCurrentGesture] = useState<HandGesture | null>(null);
  const [immersionLevel, setImmersionLevel] = useState(0.7);
  const [spatialAnchor, setSpatialAnchor] = useState({ x: 0, y: 0, z: -1.5 });

  const spatialRef = useRef<HTMLDivElement>(null);
  const gestureTimeout = useRef<NodeJS.Timeout>();

  // Initialize spatial elements based on 2025 XR banking patterns
  useEffect(() => {
    const elements: SpatialElement[] = [
      {
        id: 'loan-card',
        type: 'card',
        position: { x: 0, y: 0.2, z: -1.2 },
        rotation: { x: -10, y: 0, z: 0 },
        scale: 1.0,
        content: {
          title: 'Loan Overview',
          amount: loanData.amount,
          apr: loanData.apr,
          term: loanData.term
        },
        interactive: true,
        gaze: false,
        gestureResponse: ['pinch', 'air_tap']
      },
      {
        id: 'payment-chart',
        type: 'chart',
        position: { x: 0.8, y: 0, z: -1.5 },
        rotation: { x: 0, y: -20, z: 0 },
        scale: 0.8,
        content: {
          type: 'payment-schedule',
          data: Array.from({ length: loanData.term }, (_, i) => ({
            month: i + 1,
            payment: loanData.payments,
            principal: loanData.payments * 0.7,
            interest: loanData.payments * 0.3
          }))
        },
        interactive: true,
        gaze: false,
        gestureResponse: ['point', 'grab']
      },
      {
        id: 'controls',
        type: 'button',
        position: { x: -0.8, y: -0.3, z: -1.0 },
        rotation: { x: 0, y: 15, z: 0 },
        scale: 1.2,
        content: {
          actions: ['approve', 'decline', 'modify']
        },
        interactive: true,
        gaze: false,
        gestureResponse: ['air_tap', 'pinch']
      },
      {
        id: 'ai-advisor',
        type: 'hologram',
        position: { x: -1.2, y: 0.5, z: -2.0 },
        rotation: { x: 0, y: 25, z: 0 },
        scale: 0.6,
        content: {
          avatar: 'financial-advisor',
          state: 'listening',
          message: 'I can help explain any terms or answer questions.'
        },
        interactive: true,
        gaze: false,
        gestureResponse: ['point', 'air_tap']
      }
    ];

    setSpatialElements(elements);
  }, [loanData]);

  // Simulate eye tracking and gaze interaction
  const simulateGazeTracking = (event: React.MouseEvent) => {
    if (!spatialRef.current) return;

    const rect = spatialRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setGazeData(prev => ({
      x,
      y,
      fixationTime: prev.isGazing ? prev.fixationTime + 100 : 0,
      isGazing: true
    }));

    // Check for gaze interaction with spatial elements
    spatialElements.forEach(element => {
      const elementBounds = getElementBounds(element);
      if (isGazeIntersecting(x, y, elementBounds)) {
        setSpatialElements(prev => 
          prev.map(el => 
            el.id === element.id 
              ? { ...el, gaze: true }
              : { ...el, gaze: false }
          )
        );
      }
    });
  };

  // Simulate hand gesture recognition
  const simulateHandGesture = (gestureType: HandGesture['type']) => {
    const gesture: HandGesture = {
      type: gestureType,
      position: { x: gazeData.x, y: gazeData.y, z: 0 },
      confidence: 0.85 + Math.random() * 0.15
    };

    setCurrentGesture(gesture);

    // Process gesture interaction
    const gazedElement = spatialElements.find(el => el.gaze);
    if (gazedElement && gazedElement.gestureResponse.includes(gestureType)) {
      handleSpatialInteraction(gazedElement.id, gestureType);
    }

    // Clear gesture after timeout
    if (gestureTimeout.current) clearTimeout(gestureTimeout.current);
    gestureTimeout.current = setTimeout(() => {
      setCurrentGesture(null);
    }, 1000);
  };

  const handleSpatialInteraction = (elementId: string, interaction: string) => {
    setSpatialElements(prev => 
      prev.map(el => {
        if (el.id === elementId) {
          // Add interaction feedback
          return {
            ...el,
            scale: el.scale * 1.1, // Momentary scale increase
            position: {
              ...el.position,
              z: el.position.z + 0.1 // Bring forward
            }
          };
        }
        return el;
      })
    );

    onInteraction(elementId, interaction);

    // Reset after feedback
    setTimeout(() => {
      setSpatialElements(prev => 
        prev.map(el => {
          if (el.id === elementId) {
            return {
              ...el,
              scale: el.scale / 1.1,
              position: {
                ...el.position,
                z: el.position.z - 0.1
              }
            };
          }
          return el;
        })
      );
    }, 200);
  };

  const getElementBounds = (element: SpatialElement) => {
    // Convert 3D position to 2D screen bounds (simplified)
    const screenX = (element.position.x + 2) / 4; // Normalize to 0-1
    const screenY = (1 - element.position.y + 1) / 2; // Normalize to 0-1
    const size = element.scale * 0.2; // Base size factor

    return {
      left: screenX - size / 2,
      right: screenX + size / 2,
      top: screenY - size / 2,
      bottom: screenY + size / 2
    };
  };

  const isGazeIntersecting = (gazeX: number, gazeY: number, bounds: any) => {
    return gazeX >= bounds.left && gazeX <= bounds.right &&
           gazeY >= bounds.top && gazeY <= bounds.bottom;
  };

  // Adjust immersion level
  const adjustImmersion = (delta: number) => {
    setImmersionLevel(prev => Math.max(0.1, Math.min(1.0, prev + delta)));
  };

  if (!isActive) return null;

  return (
    <div 
      ref={spatialRef}
      className="relative w-full h-96 bg-gradient-to-b from-blue-900/20 to-purple-900/20 rounded-lg overflow-hidden border border-blue-500/30"
      onMouseMove={simulateGazeTracking}
      onMouseLeave={() => setGazeData(prev => ({ ...prev, isGazing: false }))}
    >
      {/* XR Mode Indicator */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded px-3 py-1">
          <Eye className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-white uppercase tracking-wide">
            {mode === 'ar' ? 'Augmented Reality' : mode === 'vr' ? 'Virtual Reality' : 'Mixed Reality'}
          </span>
        </div>
      </div>

      {/* Immersion Controls */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex flex-col gap-1 bg-black/50 backdrop-blur-sm rounded p-2">
          <button
            onClick={() => adjustImmersion(0.1)}
            className="p-1 text-white/60 hover:text-white transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
          <div className="text-xs text-center text-white/80 px-1">
            {Math.round(immersionLevel * 100)}%
          </div>
          <button
            onClick={() => adjustImmersion(-0.1)}
            className="p-1 text-white/60 hover:text-white transition-colors"
          >
            <ArrowDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Spatial Elements */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <AnimatePresence>
          {spatialElements.map((element) => (
            <motion.div
              key={element.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                element.gaze ? 'ring-2 ring-blue-400 ring-opacity-60' : ''
              }`}
              style={{
                left: `${((element.position.x + 2) / 4) * 100}%`,
                top: `${((1 - element.position.y + 1) / 2) * 100}%`,
                transform: `
                  translateX(-50%) translateY(-50%)
                  translateZ(${element.position.z * 100}px)
                  rotateX(${element.rotation.x}deg)
                  rotateY(${element.rotation.y}deg)
                  rotateZ(${element.rotation.z}deg)
                  scale(${element.scale})
                `,
                opacity: immersionLevel,
                zIndex: Math.round((2 - element.position.z) * 10)
              }}
              animate={{
                scale: element.gaze ? element.scale * 1.05 : element.scale,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Render different element types */}
              {element.type === 'card' && (
                <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-4 min-w-48">
                  <h3 className="text-white font-medium mb-2">{element.content.title}</h3>
                  <div className="space-y-1 text-sm text-white/80">
                    <div>Amount: ${element.content.amount.toLocaleString()}</div>
                    <div>APR: {element.content.apr}%</div>
                    <div>Term: {element.content.term} months</div>
                  </div>
                </div>
              )}

              {element.type === 'chart' && (
                <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 min-w-32">
                  <div className="text-white/80 text-xs mb-2">Payment Schedule</div>
                  <div className="h-16 flex items-end gap-1">
                    {element.content.data.slice(0, 12).map((payment: any, i: number) => (
                      <div
                        key={i}
                        className="bg-blue-400/60 flex-1 min-w-1"
                        style={{ height: `${(payment.payment / loanData.payments) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {element.type === 'button' && (
                <div className="space-y-2">
                  {element.content.actions.map((action: string) => (
                    <button
                      key={action}
                      className="block w-full bg-blue-600/80 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors capitalize"
                      onClick={() => handleSpatialInteraction(element.id, action)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              {element.type === 'hologram' && (
                <div className="bg-gradient-to-t from-purple-900/40 to-blue-900/40 border border-purple-400/30 rounded-lg p-3 min-w-40">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/90 text-xs">AI Advisor</span>
                  </div>
                  <div className="text-white/70 text-xs">
                    {element.content.message}
                  </div>
                </div>
              )}

              {/* Gaze indicator */}
              {element.gaze && (
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Gesture Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="flex justify-center gap-2">
          {(['pinch', 'point', 'grab', 'air_tap'] as const).map((gesture) => (
            <button
              key={gesture}
              onClick={() => simulateHandGesture(gesture)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                currentGesture?.type === gesture
                  ? 'bg-blue-600 text-white'
                  : 'bg-black/50 text-white/70 hover:text-white'
              }`}
            >
              {gesture.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Gaze Tracking Indicator */}
      {gazeData.isGazing && (
        <div
          className="absolute pointer-events-none z-30"
          style={{
            left: `${gazeData.x * 100}%`,
            top: `${gazeData.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-4 h-4 border-2 border-white/60 rounded-full">
            <div 
              className="w-full h-full bg-white/40 rounded-full"
              style={{
                transform: `scale(${Math.min(1, gazeData.fixationTime / 1000)})`
              }}
            />
          </div>
        </div>
      )}

      {/* Current Gesture Indicator */}
      {currentGesture && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-yellow-600/80 text-white px-3 py-1 rounded text-xs">
            Gesture: {currentGesture.type} ({Math.round(currentGesture.confidence * 100)}%)
          </div>
        </div>
      )}
    </div>
  );
}; 
