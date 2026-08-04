export const metadata = {
  title: "Data Transpose Lab",
  description: "AI, big data, and cloud-computing research at Adelaide University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
