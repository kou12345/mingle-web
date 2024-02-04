import { HeaderSection } from '@/components/HeaderSection';
import '../globals.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderSection />
      <div className="pt-12">{children}</div>
    </div>
  );
}
