import React, { useState } from "react";

/*
 * Brand colors:
 * Primary:   #4A90E2
 * Secondary: #50E3C2
 * Accent:    #F5A623
 */

/* ===== ProgressBar Component ===== */
// PUBLIC_INTERFACE
function ProgressBar({ step, total }) {
  /** This component renders the top progress indicator. */
  const percent = (step / total) * 100;
  return (
    <div className="w-full mb-7">
      <div className="flex justify-between items-center mb-1">
        {[...Array(total).keys()].map((i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 w-8 h-2 ${i < step
              ? "bg-[#4A90E2]"
              : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>
      <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden transition-colors">
        <div
          className="absolute rounded-full h-full bg-[#50E3C2] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function StepHeader({ currentStep, steps }) {
  /** Render step title/description. */
  return (
    <div className="mb-4 text-center">
      <h2 className="text-xl md:text-2xl font-bold text-[#4A90E2] mb-1">
        {steps[currentStep - 1].label}
      </h2>
      <p className="text-gray-500 text-sm">{steps[currentStep - 1].desc}</p>
    </div>
  );
}

/* ===== Step Option Picker (used for steps 1,2,4) ===== */
// PUBLIC_INTERFACE
function OptionPicker({ options, value, onChange, multiSelect = false }) {
  /** Lets the user pick one or more options, shows them in a neat card grid. */
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {options.map((option) => {
        const isSelected = multiSelect
          ? value?.includes(option.value)
          : value === option.value;
        return (
          <button
            type="button"
            key={option.value}
            className={`p-4 rounded-2xl border-2 shadow transition-all focus:outline-none flex flex-col items-center text-center
                ${
                  isSelected
                    ? "border-[#F5A623] bg-[#FFF8ED] text-[#F5A623]"
                    : "border-gray-200 bg-white hover:border-[#50E3C2] hover:bg-[#F6FFFC]"
                }`}
            onClick={() => {
              if (multiSelect) {
                if (!value?.includes(option.value)) {
                  onChange([...(value || []), option.value]);
                } else {
                  onChange(value.filter((v) => v !== option.value));
                }
              } else {
                onChange(option.value);
              }
            }}
            aria-pressed={isSelected}
          >
            {option.icon && (
              <span className="mb-2 text-2xl" aria-hidden="true">
                {option.icon}
              </span>
            )}
            <span className="font-medium">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ===== Step 1: Hair Type ===== */
const hairTypeOptions = [
  { value: "straight", label: "Straight", icon: "🟦" },
  { value: "wavy", label: "Wavy", icon: "🌊" },
  { value: "curly", label: "Curly", icon: "💫" },
  { value: "coily", label: "Coily", icon: "🌀" },
  { value: "fine", label: "Fine", icon: "🦋" },
  { value: "thick", label: "Thick", icon: "🦁" }
];

/* ===== Step 2: Scalp Type ===== */
const scalpTypeOptions = [
  { value: "normal", label: "Normal", icon: "😊" },
  { value: "oily", label: "Oily", icon: "💧" },
  { value: "dry", label: "Dry", icon: "🌵" },
  { value: "sensitive", label: "Sensitive", icon: "🌸" },
  { value: "combination", label: "Combination", icon: "🌈" }
];

/* ===== Step 3: Hair Concerns (Multi-select) ===== */
const hairConcernOptions = [
  { value: "dryness", label: "Dryness", icon: "🥥" },
  { value: "dandruff", label: "Dandruff", icon: "❄️" },
  { value: "damage", label: "Damage", icon: "🪞" },
  { value: "frizz", label: "Frizz", icon: "⚡" },
  { value: "oily", label: "Oily", icon: "🪩" },
  { value: "breakage", label: "Breakage", icon: "💔" }
];

/* ===== Step 4: Hair Goals (Multi-select) ===== */
const hairGoalOptions = [
  { value: "shine", label: "Shinier Hair", icon: "✨" },
  { value: "growth", label: "Hair Growth", icon: "🌱" },
  { value: "volume", label: "More Volume", icon: "🎈" },
  { value: "repair", label: "Repair Damage", icon: "🛠️" },
  { value: "strength", label: "Strengthen", icon: "💪" },
  { value: "smoothness", label: "Smoothness", icon: "🍃" }
];

/*  Steps Meta Data */
const steps = [
  {
    label: "What is your hair type?",
    desc: "Select the option that best describes your hair."
  },
  {
    label: "What is your scalp type?",
    desc: "Tell us about your scalp condition."
  },
  {
    label: "What are your main hair concerns?",
    desc: "Pick all that apply.",
    multi: true
  },
  {
    label: "What are your hair goals?",
    desc: "Choose your haircare goals. Multiple selections allowed.",
    multi: true
  }
];

// PUBLIC_INTERFACE
function MultiStepHairProfileForm() {
  /** Multi-step form for building a hair profile, with smooth transitions and Tailwind CSS styling. */
  // Form state for each step:
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    hairType: "",
    scalpType: "",
    concerns: [],
    goals: []
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Animate between steps with fade and slide
  const [direction, setDirection] = useState("forward"); // "back" or "forward"

  function handleNext() {
    setDirection("forward");
    setStep((s) => Math.min(s + 1, steps.length));
  }
  function handleBack() {
    setDirection("back");
    setStep((s) => Math.max(s - 1, 1));
  }

  // Handlers per step for updating form state.
  function onChangeStep(val) {
    if (step === 1) setForm((f) => ({ ...f, hairType: val }));
    else if (step === 2) setForm((f) => ({ ...f, scalpType: val }));
    else if (step === 3) setForm((f) => ({ ...f, concerns: val }));
    else if (step === 4) setForm((f) => ({ ...f, goals: val }));
  }

  function isStepValid() {
    // Validation
    if (step === 1) return !!form.hairType;
    if (step === 2) return !!form.scalpType;
    if (step === 3) return !!form.concerns?.length;
    if (step === 4) return !!form.goals?.length;
    return false;
  }

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000); // Fake network latency for effect
  }

  // Render current step
  let stepContent = null;
  if (submitted) {
    stepContent = (
      <div className="flex flex-col items-center animate-fadein">
        <span className="text-4xl text-[#50E3C2] mb-3">🎉</span>
        <h3 className="text-xl font-semibold mb-1 text-[#4A90E2]">Profile submitted!</h3>
        <p className="text-gray-500 max-w-md text-center">
          Thank you for sharing your hair profile.<br />We'll use this info to personalize recommendations for you!
        </p>
      </div>
    );
  } else if (step === 1) {
    stepContent = (
      <OptionPicker
        options={hairTypeOptions}
        value={form.hairType}
        onChange={onChangeStep}
      />
    );
  } else if (step === 2) {
    stepContent = (
      <OptionPicker
        options={scalpTypeOptions}
        value={form.scalpType}
        onChange={onChangeStep}
      />
    );
  } else if (step === 3) {
    stepContent = (
      <OptionPicker
        options={hairConcernOptions}
        value={form.concerns}
        onChange={onChangeStep}
        multiSelect
      />
    );
  } else if (step === 4) {
    stepContent = (
      <OptionPicker
        options={hairGoalOptions}
        value={form.goals}
        onChange={onChangeStep}
        multiSelect
      />
    );
  }

  // Animate container classes - fade/slide per direction
  const transitionClass =
    direction === "forward"
      ? "animate-slidein-left"
      : "animate-slidein-right";

  return (
    <form
      className="relative w-full max-w-xl mx-auto p-8 md:p-10 bg-white rounded-3xl shadow-lg flex flex-col items-center min-h-[420px] transition-all"
      style={{
        boxShadow: "0px 6px 30px 0px #4A90E210",
        border: "1px solid #EDF2F7"
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <ProgressBar step={submitted ? steps.length : step} total={steps.length} />
      {!submitted && (
        <StepHeader currentStep={step} steps={steps} />
      )}
      <div
        className={`w-full mt-1 mb-7 min-h-[130px] ${transitionClass}`}
        key={step + (submitted ? "-success" : "")}
      >
        {stepContent}
      </div>

      <div className="flex justify-between items-center w-full">
        {step > 1 && !submitted && (
          <button
            type="button"
            className="bg-[#50E3C2] hover:bg-[#4A90E2] px-6 py-2 rounded-full font-medium text-white shadow transition-colors"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <div className="flex-1" />
        {!submitted && step < steps.length && (
          <button
            type="button"
            className="bg-[#F5A623] hover:bg-[#F8C268] px-6 py-2 rounded-full font-medium text-white shadow transition-colors"
            onClick={handleNext}
            disabled={!isStepValid()}
            style={{ opacity: isStepValid() ? 1 : 0.5, transition: "opacity 0.2s" }}
          >
            Next
          </button>
        )}
        {!submitted && step === steps.length && (
          <button
            type="submit"
            className="bg-[#4A90E2] hover:bg-[#50E3C2] px-8 py-2 rounded-full font-semibold text-white shadow transition-all"
            disabled={!isStepValid() || submitting}
            style={{ opacity: isStepValid() ? 1 : 0.5, transition: "opacity 0.2s" }}
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        )}
      </div>
    </form>
  );
}

// ===== CSS animations (Tailwind plugin, or inject extra for demo) =====
/**
 * Custom animation classes:
 * .animate-fadein { animation: fadeIn 0.6s both; }
 * .animate-slidein-left { animation: slideInLeft 0.7s cubic-bezier(.32,.63,.47,1) both; }
 * .animate-slidein-right { animation: slideInRight 0.7s cubic-bezier(.32,.63,.47,1) both; }
 *
 * Use these in your main CSS (index.css or App.css if not in Tailwind config).
 **/
export default MultiStepHairProfileForm;
