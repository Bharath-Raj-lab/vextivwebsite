import { caseStudies } from '@/lib/case-studies';
import WorkClient from './WorkClient';

export const revalidate = 3600; // SSG + ISR

export const metadata = {
  title: 'Our Work | Vextiv Studio',
  description: 'Explore our portfolio of digital experiences, branding, and QR systems designed for modern businesses.',
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-[calc(var(--navbar-height)+4rem)] pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-16">
          <h1 className="text-[length:var(--text-section)] font-display font-bold tracking-tight mb-4">
            Our <span className="text-[var(--accent)]">Work</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
            A selection of our recent projects. We help ambitious brands craft digital experiences that look stunning and drive real results.
          </p>
        </header>

        <WorkClient initialCaseStudies={caseStudies} />
      </div>
    </div>
  );
}
