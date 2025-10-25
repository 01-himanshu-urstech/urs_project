// app/filters/page.tsx
import React, { Suspense } from "react";
import FilterClient from "./FilterClient";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <FilterClient />
    </Suspense>
  );
};

export default Page;
