import "./globals.css";

export const metadata = {
  title: "BuildPilot AI | Construction Lead & Growth OS",
  description: "Lead capture, CRM, quotations and CEO reporting for construction companies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 antialiased">{children}</body>
    </html>
  );
}
