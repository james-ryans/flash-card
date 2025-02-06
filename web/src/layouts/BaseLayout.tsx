import { Outlet } from "react-router";

function BaseLayout() {
  return (
    <main className="container mx-auto flex h-screen flex-col gap-8">
      <Outlet />
    </main>
  );
}

export default BaseLayout;
