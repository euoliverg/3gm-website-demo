export function mediaPath(path: string) {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "") + path;
}
