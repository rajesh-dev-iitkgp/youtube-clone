
export const API_key = "AIzaSyBHLYSCStgO1OEZFaMFNysF_FXkYDc4-Js"

export function value_convertor(value){
  value = Number(value);

  if (!value || isNaN(value)) return 0;

  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } 
  else if (value >= 1000) {
    return (value / 1000).toFixed(2).replace(/\.0$/, "") + "K";
  } 
  else {
    return value.toString();
  }
}

export function formatDuration(duration) {
  if (!duration) return "0:00";

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const hours = (match[1] || 0);
  const minutes = (match[2] || 0);
  const seconds = (match[3] || 0);

  const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  } 
  else {
    return `${m}:${s.toString().padStart(2,"0")}`;
  }
}

