import { useEffect, useRef, useState } from "react";
import CentralizedDarkPatternEngine, {
  DarkPatternDetection as EngineDetection,
  EducationalAnnotation,
} from "@/core/core/CentralizedDarkPatternEngine";
import { AnnotationOverlay } from "./interfaces";

export const useDarkPatternDetection = (
  isActive: boolean,
  onPatternDetected?: (pattern: EngineDetection) => void
) => {
  const [annotations, setAnnotations] = useState<AnnotationOverlay[]>([]);
  const darkPatternEngine = useRef(new CentralizedDarkPatternEngine());

  useEffect(() => {
    if (!isActive) {
      darkPatternEngine.current.stopMonitoring();
      return;
    }

    const handleDetection = (detection: EngineDetection) => {
      if (onPatternDetected) {
        onPatternDetected(detection);
      }
      const newAnnotation =
        darkPatternEngine.current.createAnnotationForDetection(detection);
      setAnnotations((prev) => [
        ...prev.filter((a) => a.patternId !== newAnnotation.patternId),
        { ...newAnnotation, isVisible: true },
      ]);
    };

    darkPatternEngine.current.startMonitoring(onPatternDetected || (() => {}));

    return () => {
      darkPatternEngine.current.stopMonitoring();
    };
  }, [isActive, onPatternDetected]);

  return { annotations, setAnnotations };
};

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
};
