// Tiny className joiner — filters out falsy values so we can write
// conditional classes without pulling in an extra dependency.
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
