import { useEffect, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

type DeviceNavigator = Navigator & {
  deviceMemory?: number;
};

export function useVisualMode() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isCompactViewport = useMediaQuery("(max-width: 760px), (pointer: coarse)");
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);

  useEffect(() => {
    const nav = navigator as DeviceNavigator;
    const coreCount = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;

    setIsLowPowerDevice(coreCount <= 2 || memory <= 3);
  }, []);

  return {
    prefersReducedMotion,
    isCompactViewport,
    isLowPowerDevice,
    shouldUseFallback: prefersReducedMotion || isLowPowerDevice,
  };
}
