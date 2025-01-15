export const metadata = {
  title: "RustDevGetJob - Find Rust Developer Jobs",
  description: "A site for Rust Dev Jobs",
  icons: {
    icon: "/vercel.svg",      // 16x16 or 32x32
    shortcut: "/vercel.svg",  // older browsers
    apple: "/vercel.svg", // for iOS
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
