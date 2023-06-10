import "@/styles/globals.css";
import { Josefin_Sans } from "next/font/google";

const js = Josefin_Sans({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  return (
    <main className={js.className}>
        <Component {...pageProps} />
    </main>
  );
}
