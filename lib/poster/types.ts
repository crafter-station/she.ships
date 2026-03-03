export interface SpeakerData {
  name: string
  role: string
}

export interface FilterSettings {
  bgBlur: number
  bgGrain: number
  faceGrain: number
  faceTintHex: string
  faceTintOpacity: number
  accentColor: string
  overlay: boolean
  autoPosition: boolean
  panX: number
  panY: number
  zoom: number
}

export interface FaceBox {
  x: number
  y: number
  width: number
  height: number
}

export interface EyesRegion {
  x: number
  y: number
  width: number
  height: number
}

export interface FaceDetectionResult {
  faceBox: FaceBox
  rightHalfBox: FaceBox
  eyesRegion: EyesRegion
  smileRegion: FaceBox
  landmarks: { x: number; y: number }[]
}

export type TemplateType = "half-face" | "eyes" | "smile"

export interface PosterOptions {
  speaker: SpeakerData
  image: HTMLImageElement
  bgImage?: HTMLImageElement | null
  detection: FaceDetectionResult
  template: TemplateType
  filter: FilterSettings
  width: number
  height: number
}

export const DEFAULT_FILTER: FilterSettings = {
  bgBlur: 6,
  bgGrain: 0.14,
  faceGrain: 0.10,
  faceTintHex: "#7e3a60",
  faceTintOpacity: 0.66,
  accentColor: "#e49bc2",
  overlay: true,
  autoPosition: false,
  panX: 0,
  panY: 0,
  zoom: 1.0,
}

export const DEFAULT_TEMPLATE: TemplateType = "half-face"
