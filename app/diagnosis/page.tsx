"use client";

import { useState, useRef } from "react";

/* ================= TYPES ================= */

interface Vitals {
  age: string;
  weight: string;
  temperature: string;
  heartRate: string;
  gender: string;
}

interface Treatment {
  medication?: string[];
  supportive_care?: string[];
  notes?: string;
}

interface ResultType {
  final_diagnosis?: string;
  prediction?: string;
  confidence?: number;
  decision_source?: string;
  treatment?: Treatment;
  recommendation?: string;
}

/* ================= MAIN ================= */

export default function Diagnosis() {
  const [step, setStep] = useState(0);

  const [animal, setAnimal] = useState("");
  const [vitals, setVitals] = useState<Vitals>({
    age: "",
    weight: "",
    temperature: "",
    heartRate: "",
    gender: "Male",
  });

  const [result, setResult] = useState<ResultType | null>(null);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Diagnosis
      </h1>

      {step === 0 && (
        <AnimalStep
          next={(a: string) => {
            setAnimal(a);
            setStep(1);
          }}
        />
      )}

      {step === 1 && (
        <VitalsStep
          next={(v: Vitals) => {
            setVitals(v);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <SymptomsStep
          animal={animal}
          vitals={vitals}
          next={(data: ResultType) => {
            setResult(data);
            setStep(3);
          }}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && <ResultStep result={result} />}
    </main>
  );
}

/* ================= VITALS ================= */

function VitalsStep({ next }: { next: (v: Vitals) => void }) {
  const [vitals, setVitals] = useState<Vitals>({
    age: "",
    weight: "",
    temperature: "",
    heartRate: "",
    gender: "Male",
  });

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Enter Animal Vitals
      </h2>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* AGE */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">Age</label>
          <input
            placeholder="e.g. 2 years"
            className="input"
            onChange={(e) => setVitals({ ...vitals, age: e.target.value })}
          />
        </div>

        {/* WEIGHT */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">Weight</label>
          <input
            placeholder="e.g. 12 kg"
            className="input"
            onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
          />
        </div>

        {/* TEMPERATURE */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">Temperature</label>
          <input
            placeholder="e.g. 38.5°C"
            className="input"
            onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
          />
        </div>

        {/* HEART RATE */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">Heart Rate</label>
          <input
            placeholder="e.g. 90 bpm"
            className="input"
            onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
          />
        </div>

        {/* GENDER (FULL WIDTH) */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1 text-gray-400">Gender</label>
          <select
            className="input"
            onChange={(e) => setVitals({ ...vitals, gender: e.target.value })}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={() => next(vitals)}
        className="mt-8 w-full bg-red-500 p-3 rounded-lg font-medium hover:bg-red-600 transition"
      >
        Next
      </button>
    </div>
  );
}

/* ================= SYMPTOMS ================= */

function SymptomsStep({
  next,
  back,
  animal,
  vitals,
}: {
  next: (data: ResultType) => void;
  back: () => void;
  animal: string;
  vitals: Vitals;
}) {
  const symptomsList = [
    "Vomiting", "Diarrhea", "Coughing", "Labored Breathing",
    "Lameness", "Skin Lesions", "Nasal Discharge",
    "Eye Discharge", "Fever", "High Heart Rate",
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const toggle = (s: string) => {
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("animal", animal);
    formData.append("age", vitals.age || "0");
    formData.append("weight", vitals.weight || "0");
    formData.append("temperature", vitals.temperature || "0");
    formData.append("heart_rate", vitals.heartRate || "0");
    formData.append("gender", vitals.gender);

    selected.forEach((s) => formData.append("symptoms", s));

    if (fileRef.current?.files?.[0]) {
      formData.append("file", fileRef.current.files[0]);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("API failed");

      const data: ResultType = await res.json();

      console.log("API RESULT:", data);

      next(data);

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl mb-4">Select Symptoms</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {symptomsList.map((s) => (
          <div
            key={s}
            onClick={() => toggle(s)}
            className={`p-3 rounded-xl cursor-pointer
              ${selected.includes(s)
                ? "bg-red-500"
                : "bg-gray-800 hover:bg-gray-700"}`}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <input ref={fileRef} type="file" className="input" />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={back} className="btn-secondary">
          Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn"
        >
          {loading ? "Diagnosing..." : "Diagnose"}
        </button>
      </div>
    </div>
  );
}

/* ================= RESULT ================= */

function ResultStep({ result }: { result: ResultType | null }) {
  if (!result) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-2xl">
      <h2 className="text-2xl mb-4">Diagnosis Result</h2>

      <p><b>Disease:</b> {result.final_diagnosis || result.prediction}</p>
      <p><b>Confidence:</b> {result.confidence ?? "N/A"}%</p>

      <p className="text-sm text-gray-400">
        Source: {result.decision_source}
      </p>

      {result.treatment && (
        <>
          <h3 className="mt-4 font-semibold">Treatment</h3>

          <ul className="list-disc ml-6">
            {result.treatment.medication?.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          <ul className="list-disc ml-6 text-gray-400">
            {result.treatment.supportive_care?.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </>
      )}

      {result.recommendation && (
        <p className="mt-4 text-yellow-400">
          {result.recommendation}
        </p>
      )}
    </div>
  );
}

/* ================= ANIMAL ================= */

function AnimalStep({ next }: { next: (a: string) => void }) {
  const animals = ["Cat", "Cow", "Dog", "Goat", "Pig", "Horse", "Sheep", "Rabbit"];
  const [selected, setSelected] = useState("");

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl mb-4 text-center">Select Animal</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {animals.map((a) => (
          <div
            key={a}
            onClick={() => setSelected(a)}
            className={`p-4 rounded-xl cursor-pointer
              ${selected === a
                ? "bg-red-500"
                : "bg-gray-800 hover:bg-gray-700"}`}
          >
            {a}
          </div>
        ))}
      </div>

      <button
        onClick={() => next(selected)}
        disabled={!selected}
        className="mt-6 w-full btn"
      >
        Next
      </button>
    </div>
  );
}