export function useUnitsInPx() {
  return 4 * parseFloat(getComputedStyle(document.documentElement).fontSize)
}
