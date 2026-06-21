import type { CSSProperties, ReactNode } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

import "./OrbitImages.css";

type OrbitShape =
  | "ellipse"
  | "circle"
  | "square"
  | "rectangle"
  | "triangle"
  | "star"
  | "heart"
  | "infinity"
  | "wave"
  | "custom";

type OrbitImagesProps = {
  images?: string[];
  altPrefix?: string;
  shape?: OrbitShape;
  customPath?: string;
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  starPoints?: number;
  starInnerRatio?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: "normal" | "reverse";
  fill?: boolean;
  width?: number | "100%";
  height?: number | "auto";
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut";
  paused?: boolean;
  centerContent?: ReactNode;
  responsive?: boolean;
};

type OrbitItemProps = {
  item: ReactNode;
  index: number;
  totalItems: number;
  path: string;
  itemSize: number;
  rotation: number;
  progress: MotionValue<number>;
  fill: boolean;
};

type OffsetPathStyle = CSSProperties & {
  offsetAnchor: string;
  offsetDistance: MotionValue<string>;
  offsetPath: string;
  offsetRotate: string;
};

type FallbackPathStyle = CSSProperties & {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

function generateEllipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx: number, cy: number, radius: number) {
  return generateEllipsePath(cx, cy, radius, radius);
}

function generateSquarePath(cx: number, cy: number, size: number) {
  const halfSize = size / 2;

  return `M ${cx - halfSize} ${cy - halfSize} L ${cx + halfSize} ${cy - halfSize} L ${cx + halfSize} ${cy + halfSize} L ${cx - halfSize} ${cy + halfSize} Z`;
}

function generateRectanglePath(cx: number, cy: number, width: number, height: number) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return `M ${cx - halfWidth} ${cy - halfHeight} L ${cx + halfWidth} ${cy - halfHeight} L ${cx + halfWidth} ${cy + halfHeight} L ${cx - halfWidth} ${cy + halfHeight} Z`;
}

function generateTrianglePath(cx: number, cy: number, size: number) {
  const height = (size * Math.sqrt(3)) / 2;
  const halfSize = size / 2;

  return `M ${cx} ${cy - height / 1.5} L ${cx + halfSize} ${cy + height / 3} L ${cx - halfSize} ${cy + height / 3} Z`;
}

function generateStarPath(cx: number, cy: number, outerRadius: number, innerRadius: number, points: number) {
  const step = Math.PI / points;
  let path = "";

  for (let index = 0; index < 2 * points; index += 1) {
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    const angle = index * step - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    path += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }

  return `${path} Z`;
}

function generateHeartPath(cx: number, cy: number, size: number) {
  const scale = size / 30;

  return `M ${cx} ${cy + 12 * scale} C ${cx - 20 * scale} ${cy - 5 * scale}, ${cx - 12 * scale} ${cy - 18 * scale}, ${cx} ${cy - 8 * scale} C ${cx + 12 * scale} ${cy - 18 * scale}, ${cx + 20 * scale} ${cy - 5 * scale}, ${cx} ${cy + 12 * scale}`;
}

function generateInfinityPath(cx: number, cy: number, width: number, height: number) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return `M ${cx} ${cy} C ${cx + halfWidth * 0.5} ${cy - halfHeight}, ${cx + halfWidth} ${cy - halfHeight}, ${cx + halfWidth} ${cy} C ${cx + halfWidth} ${cy + halfHeight}, ${cx + halfWidth * 0.5} ${cy + halfHeight}, ${cx} ${cy} C ${cx - halfWidth * 0.5} ${cy + halfHeight}, ${cx - halfWidth} ${cy + halfHeight}, ${cx - halfWidth} ${cy} C ${cx - halfWidth} ${cy - halfHeight}, ${cx - halfWidth * 0.5} ${cy - halfHeight}, ${cx} ${cy}`;
}

function generateWavePath(cx: number, cy: number, width: number, amplitude: number, waves: number) {
  const points: string[] = [];
  const segments = waves * 20;
  const halfWidth = width / 2;

  for (let index = 0; index <= segments; index += 1) {
    const x = cx - halfWidth + (width * index) / segments;
    const y = cy + Math.sin((index / segments) * waves * 2 * Math.PI) * amplitude;

    points.push(index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }

  for (let index = segments; index >= 0; index -= 1) {
    const x = cx - halfWidth + (width * index) / segments;
    const y = cy - Math.sin((index / segments) * waves * 2 * Math.PI) * amplitude;

    points.push(`L ${x} ${y}`);
  }

  return `${points.join(" ")} Z`;
}

function OrbitItem({
  item,
  index,
  totalItems,
  path,
  itemSize,
  rotation,
  progress,
  fill,
  supportsMotionPath,
  centerX,
  centerY,
  fallbackRadiusX,
  fallbackRadiusY,
}: OrbitItemProps & {
  supportsMotionPath: boolean;
  centerX: number;
  centerY: number;
  fallbackRadiusX: number;
  fallbackRadiusY: number;
}) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;
  const offsetDistance = useTransform(progress, (progressValue) => {
    const offset = (((progressValue + itemOffset) % 100) + 100) % 100;

    return `${offset}%`;
  });
  const fallbackX = useTransform(progress, (progressValue) => {
    const offset = (((progressValue + itemOffset) % 100) + 100) % 100;
    const angle = Math.PI + (offset / 100) * Math.PI * 2;

    return centerX + fallbackRadiusX * Math.cos(angle);
  });
  const fallbackY = useTransform(progress, (progressValue) => {
    const offset = (((progressValue + itemOffset) % 100) + 100) % 100;
    const angle = Math.PI + (offset / 100) * Math.PI * 2;

    return centerY + fallbackRadiusY * Math.sin(angle);
  });
  const style = supportsMotionPath
    ? ({
        width: itemSize,
        height: itemSize,
        offsetPath: `path("${path}")`,
        offsetRotate: "0deg",
        offsetAnchor: "center center",
        offsetDistance,
      } as OffsetPathStyle)
    : ({
        width: itemSize,
        height: itemSize,
        left: -itemSize / 2,
        top: -itemSize / 2,
        x: fallbackX,
        y: fallbackY,
      } as FallbackPathStyle);

  return (
    <motion.div className="orbit-item" style={style}>
      <div style={{ transform: `rotate(${-rotation}deg)` }}>{item}</div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  altPrefix = "Foto orbitando",
  shape = "ellipse",
  customPath,
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  radius = 300,
  starPoints = 5,
  starInnerRatio = 0.5,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = "normal",
  fill = true,
  width = 100,
  height = 100,
  className = "",
  showPath = false,
  pathColor = "rgba(255, 240, 202, 0.16)",
  pathWidth = 2,
  easing = "linear",
  paused = false,
  centerContent,
  responsive = false,
}: OrbitImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [supportsMotionPath, setSupportsMotionPath] = useState(false);
  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;
  const progress = useMotionValue(0);

  const path = useMemo(() => {
    switch (shape) {
      case "circle":
        return generateCirclePath(designCenterX, designCenterY, radius);
      case "square":
        return generateSquarePath(designCenterX, designCenterY, radius * 2);
      case "rectangle":
        return generateRectanglePath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case "triangle":
        return generateTrianglePath(designCenterX, designCenterY, radius * 2);
      case "star":
        return generateStarPath(designCenterX, designCenterY, radius, radius * starInnerRatio, starPoints);
      case "heart":
        return generateHeartPath(designCenterX, designCenterY, radius * 2);
      case "infinity":
        return generateInfinityPath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case "wave":
        return generateWavePath(designCenterX, designCenterY, radiusX * 2, radiusY, 3);
      case "custom":
        return customPath || generateCirclePath(designCenterX, designCenterY, radius);
      case "ellipse":
      default:
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
    }
  }, [baseWidth, customPath, designCenterX, designCenterY, radius, radiusX, radiusY, shape, starInnerRatio, starPoints]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) {
      return;
    }

    const updateScale = () => {
      if (!containerRef.current) {
        return;
      }

      setScale(containerRef.current.clientWidth / baseWidth);
    };
    const observer = new ResizeObserver(updateScale);

    updateScale();
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [baseWidth, responsive]);

  useEffect(() => {
    setSupportsMotionPath(
      typeof CSS !== "undefined" &&
        CSS.supports("offset-path", 'path("M 0 0 L 1 1")') &&
        CSS.supports("offset-distance", "0%"),
    );
  }, []);

  useEffect(() => {
    if (paused) {
      return;
    }

    const controls = animate(progress, direction === "reverse" ? -100 : 100, {
      duration,
      ease: easing,
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [direction, duration, easing, paused, progress]);

  const containerWidth = responsive ? "100%" : typeof width === "number" ? width : "100%";
  const containerHeight = responsive ? "auto" : typeof height === "number" ? height : typeof width === "number" ? width : "auto";
  const shouldUseMotionPath = supportsMotionPath && shape !== "ellipse" && shape !== "circle";
  const items = images.map((src, index) => (
    <img key={src} src={src} alt={`${altPrefix} ${index + 1}`} draggable={false} className="orbit-image" />
  ));

  return (
    <div
      ref={containerRef}
      className={["orbit-container", className].filter(Boolean).join(" ")}
      style={{
        width: containerWidth,
        height: containerHeight,
        aspectRatio: responsive ? "1 / 1" : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className={responsive ? "orbit-scaling-container orbit-scaling-container--responsive" : "orbit-scaling-container"}
        style={{
          width: responsive ? baseWidth : "100%",
          height: responsive ? baseWidth : "100%",
          transform: responsive && scale !== null ? `translate(-50%, -50%) scale(${scale})` : undefined,
          visibility: responsive && scale === null ? "hidden" : undefined,
        }}
      >
        <div className="orbit-rotation-wrapper" style={{ transform: `rotate(${rotation}deg)` }}>
          {showPath ? (
            <svg width="100%" height="100%" viewBox={`0 0 ${baseWidth} ${baseWidth}`} className="orbit-path-svg">
              <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / (scale ?? 1)} />
            </svg>
          ) : null}

          {items.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
              supportsMotionPath={shouldUseMotionPath}
              centerX={designCenterX}
              centerY={designCenterY}
              fallbackRadiusX={shape === "circle" ? radius : radiusX}
              fallbackRadiusY={shape === "circle" ? radius : radiusY}
            />
          ))}
        </div>
      </div>

      {centerContent ? <div className="orbit-center-content">{centerContent}</div> : null}
    </div>
  );
}
