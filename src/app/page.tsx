import { ApkAnalyzer } from '@/components/apk-analyzer';
import { DatasetTable } from '@/components/dataset-table';
import { Shield } from 'lucide-react';

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="mx-auto max-w-4xl space-y-12">
          <header className="space-y-4 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary p-3 text-primary-foreground shadow-lg">
              <Shield className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-foreground md:text-5xl">
              UPI Sentinel
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Detect fake Indian Bank & UPI payment APKs using digital signature
              analysis. Protect yourself from phishing and malware.
            </p>
          </header>

          <ApkAnalyzer />

          <DatasetTable />
        </div>
      </main>
      <footer className="mt-16 border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            &copy; 2024 UPI Sentinel. A tool for educational and security
            purposes.
          </p>
        </div>
      </footer>
    </>
  );
}
