/**
 * Audit funnel — segment layout.
 *
 * Deliberately does NOT render Navbar or Footer so the page has
 * minimal chrome (logo-only header rendered by AuditForm itself).
 * The root layout still provides fonts, globals.css, and the <html>/<body>
 * shell — only the shared UI components are omitted here.
 */
export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
