import dynamic from "next/dynamic";

export const LazyWebsitePhase = dynamic(() => import("./WebsitePhase"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export const LazyDeceptiveCheckoutFlow = dynamic(
  () => import("./DeceptiveCheckoutFlow"),
  {
    loading: () => <div>Loading checkout...</div>,
    ssr: false,
  }
);
