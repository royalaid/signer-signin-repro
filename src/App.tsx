import './App.css'
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAtom } from "jotai";
import {
  atomWithQuery,
  queryClientAtom,
} from "jotai-tanstack-query";
import QRCode from "react-qr-code";
import {
  APP_FID,
  APP_MNEMONIC,
  METADATA_SERVER_HOSTNAME,
} from "./utils/env.ts";
import { ThemeProvider } from './components/theme-provider';

interface TokenResponse {
  deeplinkUrl: string;
  key: string;
  requestFid: number;
  state: string;
  token: string;
}

const CLIENT_NAME = "EXAMPLE_APP";

const queryAtom = atomWithQuery<TokenResponse>(() => ({
  queryKey: ["token"],
  queryFn: async () => {
    return await fetch(`${METADATA_SERVER_HOSTNAME}/signer/`).then((res) =>
      res.json(),
    );
  },
}))

export const SignIn = () => {
  const [{data: token, isLoading}] = useAtom(queryAtom);

  const parameters = {
    appFid: APP_FID,
    appMnemonic: APP_MNEMONIC,
    name: CLIENT_NAME,
    deadline: 1702027377,
  };

  console.log({ parameters });

  if(isLoading) return <div>Loading...</div>
  else if(!token) return <div>Token not found</div>
  else
    return (
      <div className="p-2 bg-white rounded w-fit flex flex-col">
        <QRCode
          value={`https://client.warpcast.com/deeplinks/signed-key-request?token=${token.token}`}
        />
        {/*<QRCode value={token.deepLink} />*/}
        <p
          className="text-blue-500 underline cursor-pointer mx-auto"
          onClick={() => {
            console.log(
              `https://client.warpcast.com/deeplinks/signed-key-request?token=${token.token}`,
            );
          }}
        >
          Click for Link
        </p>
      </div>
  );
};

export default function App() {

  const [queryClient] = useAtom(queryClientAtom);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {/* If the user is not connected we show the sign-in link, if they are, we show a CAPS-LOCK message */}
          <SignIn  />
    </ThemeProvider>
  );
}
