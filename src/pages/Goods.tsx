import * as React from 'react';
import vite from 'public/vite.svg';

const Sample = React.lazy(() => import(/* webpackChunkName: "Sample" */ '@/pages/Sample'));

function Goods() {
  return (
    <div>
      <span>This is Goods</span>
      <img src={vite} />
      <React.Suspense fallback={<>loading....</>}>
        <Sample />
      </React.Suspense>
    </div>
  );
}

export default Goods;
