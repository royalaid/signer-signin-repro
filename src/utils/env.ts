export const METADATA_SERVER_HOSTNAME = import.meta.env
  .VITE_METADATA_SERVER_HOSTNAME;
if (!METADATA_SERVER_HOSTNAME) {
  throw new Error("VITE_METADATA_SERVER_HOSTNAME not set");
}

export const APP_FID: number = parseInt(import.meta.env.VITE_APP_FID);
if (!APP_FID) {
  throw new Error("VITE_APP_FID not set");
}

export const APP_MNEMONIC: string = import.meta.env.VITE_APP_MNEMONIC;
if (!APP_MNEMONIC) {
  throw new Error("VITE_APP_MNEMONIC not set");
}
