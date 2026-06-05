import { CatalogDownloadButton } from "@/components/layout/CatalogDownloadButton";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MarketStoreProvider } from "@/providers/MarketStoreProvider";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <MarketStoreProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CatalogDownloadButton />
    </MarketStoreProvider>
  );
}
