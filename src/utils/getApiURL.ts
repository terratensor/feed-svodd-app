// utils/getApiURL.ts
const IS_SERVER = typeof window === "undefined";
export default function getApiURL(path: string) {
    const baseURL = IS_SERVER
        ? process.env.NEXT_API_URL!
        : window.location.origin;
    return new URL(path, baseURL).toString();
}