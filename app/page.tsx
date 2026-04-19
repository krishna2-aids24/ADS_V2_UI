"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">

      {/* HERO SECTION */}
      <div className="text-center pt-20 px-6">

        <h1 className="text-5xl font-bold mb-6">
          🐾 AI Veterinary Diagnosis System
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Diagnose animal diseases using AI based on symptoms, vitals, and images.
          Fast, intelligent, and designed to assist veterinary care.
        </p>

        <button
          onClick={() => router.push("/diagnosis")}
          className="bg-red-500 px-8 py-3 rounded-xl text-lg hover:bg-red-600 transition"
        >
          Start Diagnosis
        </button>

      </div>

      {/* FEATURES SECTION */}
      <div className="grid md:grid-cols-3 gap-6 px-6 py-12">

        <div className="bg-gray-800 p-6 rounded-2xl text-center">
          <h3 className="text-xl mb-2">⚡ Fast Diagnosis</h3>
          <p className="text-gray-400 text-sm">
            Get quick predictions using advanced AI models.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl text-center">
          <h3 className="text-xl mb-2">🧠 AI Powered</h3>
          <p className="text-gray-400 text-sm">
            Uses machine learning for accurate disease detection.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl text-center">
          <h3 className="text-xl mb-2">📸 Image + Symptoms</h3>
          <p className="text-gray-400 text-sm">
            Combine visual and symptom data for better results.
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-800 text-sm">

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <p className="cursor-pointer" onClick={() => router.push("/")}>Home</p>
          <p className="cursor-pointer" onClick={() => router.push("/diagnosis")}>Diagnosis</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Helpful Links</h3>
          <p className="cursor-pointer" onClick={() => router.push("/about")}>About</p>
          <p className="cursor-pointer" onClick={() => router.push("/resources")}>
            Vet Resources
          </p>

          <p className="cursor-pointer" onClick={() => router.push("/warnings")}>
            Warnings
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>krishna2_aids24@delhitechnicalcampus.ac.in</p>
        </div>

      </div>

    </main>
  );
}