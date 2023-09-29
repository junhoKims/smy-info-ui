import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Suspense fallback={<>loading...</>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default Layout;
