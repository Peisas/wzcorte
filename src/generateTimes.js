export function generateTimes() {
  const times = [];
  let h = 9;
  let m = 30;

  while (h < 20) {
    times.push(
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    );
    m += 30;
    if (m === 60) {
      m = 0;
      h++;
    }
  }
  return times;
}
