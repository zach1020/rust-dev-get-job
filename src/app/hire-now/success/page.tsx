// app/hire-now/success/page.tsx (server component by default)
import React, { Suspense } from "react";
import ClientSuccess from "./ClientSuccess";

export default function HireNowSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientSuccess />
    </Suspense>
  );
}