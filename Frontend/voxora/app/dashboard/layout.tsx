import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/SideBar";
import { SidebarProvider } from "@/utils/sidebar.context";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <Header></Header>
        <SideBar></SideBar>
        {children}
      </SidebarProvider>
    </>
  );
}

export default layout;
