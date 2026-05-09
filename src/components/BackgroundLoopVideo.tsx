"use client";

import { useEffect, useRef, type ReactNode } from "react";

type BackgroundLoopVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "loop"
> & {
  /** If &gt; 0, playback begins here and each loop restarts from this time (native `loop` skips second 0 rewind). */
  startAtSec?: number;
  children?: ReactNode;
};

export function BackgroundLoopVideo({
  startAtSec = 0,
  children,
  ...rest
}: BackgroundLoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const trimStart = startAtSec > 0 ? startAtSec : 0;
  const useNativeLoop = trimStart <= 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const seek = () => {
      try {
        if (trimStart > 0) el.currentTime = trimStart;
      } catch {
        /* noop */
      }
    };

    el.addEventListener("loadedmetadata", seek);
    el.addEventListener("loadeddata", seek);
    if (el.readyState >= 1 && trimStart > 0) seek();

    if (trimStart <= 0) {
      return () => {
        el.removeEventListener("loadedmetadata", seek);
        el.removeEventListener("loadeddata", seek);
      };
    }

    el.loop = false;

    const onTimeUpdate = () => {
      if (!el.duration || !Number.isFinite(el.duration)) return;
      if (el.currentTime >= el.duration - 0.25) {
        el.currentTime = trimStart;
      }
    };

    el.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      el.removeEventListener("loadedmetadata", seek);
      el.removeEventListener("loadeddata", seek);
      el.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [trimStart]);

  return (
    <video ref={ref} loop={useNativeLoop} {...rest}>
      {children}
    </video>
  );
}
