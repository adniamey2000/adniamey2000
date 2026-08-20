export type Verse = {
  text: string;
  reference: string;
};

export function dayOfYear(now = new Date()) {
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

export function youVersionApiKey() {
  return process.env.YVP_APP_KEY ?? process.env.YOUVERSION_API_KEY ?? "";
}
