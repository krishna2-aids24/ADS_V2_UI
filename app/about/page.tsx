export default function About() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">About This System</h1>

      <p className="text-gray-300 mb-4">
        This AI-powered veterinary diagnosis system helps identify potential diseases
        in animals using symptoms, vitals, and image inputs.
      </p>

      <p className="text-gray-300 mb-4">
        It combines machine learning models with user inputs to generate possible
        diagnoses and treatment suggestions.
      </p>

      <p className="text-gray-300 mb-4">
        The goal is to assist veterinarians and animal owners with faster preliminary insights.
      </p>

    </main>
  );
}