import type { CSSProperties, HTMLAttributes } from "react";

type ModelViewerElementProps = HTMLAttributes<HTMLElement> & {
  src?: string;
  alt?: string;
  poster?: string;
  style?: CSSProperties;
  "camera-controls"?: boolean;
  "disable-zoom"?: boolean;
  "disable-pan"?: boolean;
  "auto-rotate"?: boolean;
  "rotation-per-second"?: string;
  "interaction-prompt"?: string;
  "camera-orbit"?: string;
  "min-camera-orbit"?: string;
  "max-camera-orbit"?: string;
  "field-of-view"?: string;
  "shadow-intensity"?: string;
  exposure?: string;
  "environment-image"?: string;
};

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "model-viewer": ModelViewerElementProps;
      }
    }
  }

  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElementProps;
    }
  }
}

export {};
