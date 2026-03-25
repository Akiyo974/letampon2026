export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Le panel admin a son propre layout sans le Header/Footer du site public
  return <>{children}</>;
}
