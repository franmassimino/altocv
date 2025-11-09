import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 p-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Welcome to AltoCV
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          AI-Powered CV Builder with ATS optimization
        </p>
        <div className="flex gap-4">
          <Button variant="default">Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </main>
    </div>
  );
}
