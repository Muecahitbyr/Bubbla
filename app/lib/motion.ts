/** Gemeinsame Animationskurven */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeApple = [0.25, 0.1, 0.25, 1] as const

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
