import type { FaceDetectionResult, FaceBox, EyesRegion } from "./types"

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    faceapi: any
  }
}

const FACE_API_CDN =
  "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.14/dist/face-api.js"
const MODEL_URL = "/models"

let modelsLoaded = false
let loadingPromise: Promise<void> | null = null

export async function loadFaceApiScript(): Promise<void> {
  if (typeof window === "undefined") return
  if (window.faceapi) return

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = FACE_API_CDN
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load face-api.js"))
    document.head.appendChild(script)
  })
}

export async function loadModels(): Promise<void> {
  if (modelsLoaded) return
  if (loadingPromise) return loadingPromise

  loadingPromise = (async () => {
    await loadFaceApiScript()
    const faceapi = window.faceapi
    if (!faceapi) throw new Error("face-api.js not loaded")

    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ])
    modelsLoaded = true
  })()

  return loadingPromise
}

export async function detectFace(
  imageElement: HTMLImageElement
): Promise<FaceDetectionResult | null> {
  await loadModels()
  const faceapi = window.faceapi
  if (!faceapi) return null

  const detection = await faceapi
    .detectSingleFace(imageElement)
    .withFaceLandmarks()

  if (!detection) return null

  const box = detection.detection.box
  const landmarks = detection.landmarks.positions.map((p: any) => ({
    x: p.x,
    y: p.y,
  }))

  const faceBox: FaceBox = {
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
  }

  const rightHalfBox: FaceBox = {
    x: box.x + box.width * 0.5,
    y: box.y - box.height * 0.15,
    width: box.width * 0.55,
    height: box.height * 1.3,
  }

  const rightEye = landmarks.slice(36, 42)
  const leftEye = landmarks.slice(42, 48)
  const allEyePoints = [...rightEye, ...leftEye]

  const minX = Math.min(...allEyePoints.map((p: { x: number }) => p.x))
  const maxX = Math.max(...allEyePoints.map((p: { x: number }) => p.x))
  const minY = Math.min(...allEyePoints.map((p: { y: number }) => p.y))
  const maxY = Math.max(...allEyePoints.map((p: { y: number }) => p.y))

  const eyeWidth = maxX - minX
  const eyeHeight = maxY - minY
  const padX = eyeWidth * 0.5
  const padY = eyeHeight * 1.5

  const eyesRegion: EyesRegion = {
    x: minX - padX,
    y: minY - padY,
    width: eyeWidth + padX * 2,
    height: eyeHeight + padY * 2,
  }

  const mouthPoints = landmarks.slice(48, 68)
  const mMinX = Math.min(...mouthPoints.map((p: { x: number }) => p.x))
  const mMaxX = Math.max(...mouthPoints.map((p: { x: number }) => p.x))
  const mMinY = Math.min(...mouthPoints.map((p: { y: number }) => p.y))
  const mMaxY = Math.max(...mouthPoints.map((p: { y: number }) => p.y))

  const mWidth = mMaxX - mMinX
  const mHeight = mMaxY - mMinY
  const mPadX = mWidth * 0.6
  const mPadY = mHeight * 1.0

  const smileRegion: FaceBox = {
    x: mMinX - mPadX,
    y: mMinY - mPadY,
    width: mWidth + mPadX * 2,
    height: mHeight + mPadY * 2,
  }

  return { faceBox, rightHalfBox, eyesRegion, smileRegion, landmarks }
}
