"use client";

import "reactflow/dist/style.css";
import "./globals.css";
import { Provider } from "react-redux";
import { departmentStore } from "../../helpers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={departmentStore}>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
