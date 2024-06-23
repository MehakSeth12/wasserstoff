import Image from "next/image";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href='/dashboard' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Dashboard
      </a>
    </main>
  );
}
