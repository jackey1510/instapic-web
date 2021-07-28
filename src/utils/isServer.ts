/**
 * check if SSR
 */
export const isServer = () => typeof window === "undefined";
