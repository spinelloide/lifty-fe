import { useState } from "react";
import { sendToast } from "../utils/toastUtils";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { GenerateWorkoutFormData } from "../types/GenerateWorkoutFormData";
import aiServices from "../services/AiServices";
import { GeneratedWorkoutPlan } from "../types/GeneratedWorkoutPlan";
import Modal from "../ui/Modal";
import WorkoutPlanViewer from "./WorkoutPlanViewer";
const ChatToTrainer = () => {
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [workoutPlan, setWorkoutPlan] = useState<GeneratedWorkoutPlan | null>(
    null
  );
  const [showWorkoutViewer, setShowWorkoutViewer] = useState(false);

  const [formData, setFormData] = useState<GenerateWorkoutFormData>({
    daysPerWeek: "",
    durationWeeks: "",
    level: "",
    type: "",
  });

  const questions = [
    "Quanti giorni a settimana vuoi allenarti?",
    "Quante settimane deve durare il tuo allenamento?",
    "A che livello deve essere il tuo allenamento?",
    "Che tipo di allenamento vuoi fare?",
  ];

  const levels = ["Beginner", "Intermedio", "Avanzato"];
  const workoutTypes = [
    "Muscle Split",
    "HIIT",
    "Full Body",
    "Cardio",
    "CrossFit",
  ];

  const handleNext = () => {
    if (
      (step === 0 && formData.daysPerWeek) ||
      (step === 1 && formData.durationWeeks) ||
      (step === 2 && formData.level) ||
      (step === 3 && formData.type)
    ) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      const newFormData = { ...formData };
      if (step === 1) newFormData.daysPerWeek = "";
      if (step === 2) newFormData.durationWeeks = "";
      if (step === 3) newFormData.level = "";
      if (step === 4) newFormData.type = "";
      setFormData(newFormData);
      setStep((prev) => prev - 1);
    }
  };

  const handleSelect = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setStep((prev) => prev + 1);
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const parsedFormData = {
        ...formData,
        daysPerWeek: parseInt(formData.daysPerWeek as string, 10),
        durationWeeks: parseInt(formData.durationWeeks as string, 10),
      };

      const response = await aiServices.generateWorkout(parsedFormData);
      console.log("response", response);
      setWorkoutPlan(response);

      setIsCompleted(true);
      sendToast("success", "Allenamento generato con successo!");
      // puoi fare qualcosa con la risposta, tipo chiudere o reimpostare lo stato
    } catch (error) {
      console.error("Errore nella generazione dell'allenamento:", error);
      sendToast("error", "Errore nella generazione dell'allenamento");
    } finally {
      setLoading(false);
    }
  };

  const renderAnswerInput = () => {
    if (step === 0) {
      return (
        <>
          <input
            type="number"
            className="w-full mt-2 p-2 rounded bg-gray-700 text-white"
            value={formData.daysPerWeek}
            onChange={(e) => {
              if (e.target.value < "1" || e.target.value > "7") {
                sendToast("error", "Inserisci un numero tra 1 e 7");
                return;
              }
              setFormData({ ...formData, daysPerWeek: e.target.value });
            }}
          />
          <button
            onClick={handleNext}
            disabled={!formData.daysPerWeek}
            className="mt-2 w-full bg-orange-500 hover:bg-orange-300 text-white px-4 py-2 rounded"
          >
            Avanti
          </button>
        </>
      );
    }

    if (step === 1) {
      return (
        <>
          <input
            type="number"
            className="w-full mt-2 p-2 rounded bg-gray-700 text-white"
            value={formData.durationWeeks}
            onChange={(e) =>
              setFormData({ ...formData, durationWeeks: e.target.value })
            }
          />
          <button
            onClick={handleNext}
            disabled={!formData.durationWeeks}
            className="mt-2 w-full bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded"
          >
            Avanti
          </button>
        </>
      );
    }

    if (step === 2) {
      return (
        <div className="mt-2 space-y-2">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => handleSelect("level", level)}
              className={`w-full p-2 rounded ${
                formData.level === level
                  ? "bg-orange-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="mt-2 space-y-2">
          {workoutTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleSelect("type", type)}
              className={`w-full p-2 rounded ${
                formData.type === type
                  ? "bg-orange-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderChatHistory = () => {
    const responses = [
      formData.daysPerWeek,
      formData.durationWeeks,
      formData.level,
      formData.type,
    ];

    return questions.map((question, index) => {
      if (index > step) return null;
      return (
        <div key={index} className="mb-4">
          <div className="text-gray-300">{question}</div>
          {responses[index] && (
            <div className="text-right mt-1">
              <span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-xl">
                {responses[index]}
              </span>
            </div>
          )}
          {isCompleted && index === 3 && (
            <div className=" mt-2 cursor-pointer bg-green-600 text-white px-3 py-1 flex justify-center items-center">
              <button className="cursor-pointer hover:opacity-80" onClick={() => setShowWorkoutViewer(true)}>
                Visualizza allenamento generato
              </button>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-300 hover:scale-95 transition"
          >
            <FiMessageCircle className="w-6 h-6" />
          </button>
        )}

        {isOpen && (
          <div className="w-80 max-h-[60vh] bg-gray-800 text-white rounded-lg shadow-lg p-4 overflow-y-auto relative">
            {loading && (
              <div className="absolute bg-transparent inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 rounded-lg">
                <svg
                  className="animate-spin h-8 w-8 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
            )}

            <div
              className={`${loading ? "opacity-30 pointer-events-none" : ""}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">AI Trainer</h3>
                <button onClick={() => setIsOpen(false)}>
                  {" "}
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm mb-4">{renderChatHistory()}</div>

              <div>{step < 4 && renderAnswerInput()}</div>
              <div className="flex justify-between mt-4">
                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
                  >
                    Indietro
                  </button>
                )}

                {step === 4 && !isCompleted && (
                  <button
                    onClick={handleGenerate}
                    className="ml-auto px-3 py-1 bg-green-600 rounded hover:bg-green-700"
                  >
                    Genera allenamento
                  </button>
                )}

                {step === 4 && isCompleted && (
                  <button
                    onClick={() => {
                      setIsCompleted(false);
                      setStep(0);
                      setFormData({
                        daysPerWeek: "",
                        durationWeeks: "",
                        level: "",
                        type: "",
                      });
                    }}
                    className="ml-auto px-3 py-1 bg-green-600 rounded hover:bg-green-700"
                  >
                    Nuova richiesta
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {showWorkoutViewer && workoutPlan?.workout_plan && (
        <Modal
          isOpen={showWorkoutViewer}
          onClose={() => setShowWorkoutViewer(false)}
        >
          <WorkoutPlanViewer
            workout_plan={workoutPlan.workout_plan}
            exercises={workoutPlan.exercises}
          />
        </Modal>
      )}
    </>
  );
};

export default ChatToTrainer;
