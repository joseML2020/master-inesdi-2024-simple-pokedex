export function randomMode(time: number =Math.random()): string {
  const n = Math.floor(time * 3) + 1;
  return {
    1: "quick",
    2: "regular",
    3: "slow",
  }[n] || "quick";
}