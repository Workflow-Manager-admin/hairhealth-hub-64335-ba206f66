import React, { useState } from "react";

/**
 * ===============================
 * DailyHairCareRoutinePlanner
 * Card-based, minimal, soft-gradient modern design for Hairfit
 * Uses Tailwind CSS for styling, components are self-contained.
 * ===============================
 */

// Helper for a default set of times (hours of a day)
const defaultTimeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00",
  "12:00", "15:00", "17:00", "19:00", "21:00"
];

// Suggested routine task ideas for fast entry
const SUGGESTED_TASKS = [
  "Oil Hair", "Shampoo", "Conditioner", "Serum", "Mask", "Dry", "Brush", "Scalp Massage"
];

/**
 * PUBLIC_INTERFACE
 * Card for each task on the timeline, with actions.
 */
function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  return (
    <div
      className={`
        flex flex-col items-start rounded-2xl shadow-lg p-4 relative min-w-[220px] max-w-xs
        bg-gradient-to-br
        ${task.completed
          ? "from-[#F6FFFC] to-[#E0F7FA] opacity-80 ring-2 ring-[#50E3C2] line-through"
          : "from-white to-[#F8FBFD] ring-1 ring-[#E4E9F2]"
        }
        mb-2
        transition-all
      `}
      style={{
        borderColor: "#E4E9F2",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${
            task.completed ? "bg-[#50E3C2]" : "bg-[#F5A623]"
          }`}
          title={task.completed ? "Completed" : "Pending"}
        />
        <span
          className={`text-sm font-semibold ${task.completed ? "text-[#50E3C2]" : "text-[#4A90E2]"}`}
        >
          {task.time}
        </span>
      </div>
      <div className="font-medium text-gray-800 text-lg mb-2">
        {task.name}
      </div>
      {task.note && (
        <div className="text-xs text-gray-400 mb-1">{task.note}</div>
      )}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`
            rounded-full px-2.5 py-1 text-xs font-bold shadow transition
            ${task.completed
              ? "bg-[#50E3C2] text-white"
              : "bg-[#F5A623]/90 text-white hover:bg-[#F5A623]"
            }
          `}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? "✓ Done" : "Mark Done"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="rounded-full px-2.5 py-1 text-xs font-semibold text-[#4A90E2] bg-[#F2F6FA] hover:bg-[#E4F0F6] transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-full px-2 py-1 text-xs text-gray-400 hover:text-red-400 transition"
          aria-label="Delete"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 20 20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M6 14L14 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Horizontal timeline bar with time labels (like a daily calendar row).
 */
function TimelineBar({ slots, selectedTime, onSelect }) {
  return (
    <div className="flex gap-0.5 items-center justify-center w-full mb-3 pb-2 overflow-x-auto scrollbar-thin">
      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect && onSelect(slot)}
          className={`text-xs md:text-sm font-semibold px-3 py-1 mx-0.5 rounded-lg transition shadow
            ${selectedTime === slot
              ? "bg-[#4A90E2] text-white"
              : "bg-white text-[#4A90E2] hover:bg-[#EAF6FF]"
            }
          `}
          style={{ minWidth: 52 }}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Modal for adding/editing a task.
 */
function AddEditTaskModal({ show, onClose, onSave, initialTask, defaultTime }) {
  const isEditing = !!initialTask;
  const [name, setName] = useState(initialTask?.name || "");
  const [time, setTime] = useState(initialTask?.time || defaultTime || defaultTimeSlots[0]);
  const [note, setNote] = useState(initialTask?.note || "");

  React.useEffect(() => {
    if (show) {
      setName(initialTask?.name || "");
      setTime(initialTask?.time || defaultTime || defaultTimeSlots[0]);
      setNote(initialTask?.note || "");
    }
  }, [show, initialTask, defaultTime]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center transition">
      <div className="bg-white rounded-3xl shadow-lg max-w-xs w-full p-7 relative animate-fadein">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-[#E87A41] text-lg font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <div className="mb-3 text-[#4A90E2] text-lg font-semibold">
          {isEditing ? "Edit Task" : "Add Task"}
        </div>
        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault();
            if (name && time) {
              onSave({
                ...initialTask,
                name: name.trim(),
                time,
                note: note.trim(),
              });
              onClose();
            }
          }}
        >
          <label className="text-xs font-medium text-gray-500">Task Name</label>
          <input
            autoFocus
            className="p-2 rounded-xl border border-[#E4E9F2] bg-[#F8FBFD] text-sm focus:ring-2 focus:ring-[#50E3C2] transition"
            placeholder="e.g., Shampoo"
            value={name}
            onChange={e => setName(e.target.value)}
            list="hair-task-suggestions"
            maxLength={32}
            required
          />
          <datalist id="hair-task-suggestions">
            {SUGGESTED_TASKS.map(t => <option key={t} value={t} />)}
          </datalist>
          <label className="text-xs font-medium text-gray-500">Time</label>
          <select
            className="p-2 rounded-xl border border-[#E4E9F2] bg-[#F8FBFD] text-sm focus:ring-2 focus:ring-[#50E3C2]"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          >
            {defaultTimeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          <label className="text-xs font-medium text-gray-500">Note <span className="text-gray-300">(Optional)</span></label>
          <input
            className="p-2 rounded-xl border border-[#E4E9F2] bg-[#F8FBFD] text-sm"
            placeholder="Short note..."
            value={note}
            onChange={e => setNote(e.target.value)}
            maxLength={50}
          />
          <button
            type="submit"
            className="mt-3 bg-[#4A90E2] hover:bg-[#50E3C2] text-white font-semibold py-2 rounded-xl transition"
            disabled={!name || !time}
          >
            {isEditing ? "Save Changes" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Routine List/Timeline: Cards grouped horizontally by time (if needed).
 */
function RoutineTimeline({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 font-medium">
        No tasks yet. Start by adding your first hair care action!
      </div>
    );
  }
  // Sort by time
  const sorted = [...tasks].sort((a, b) => a.time.localeCompare(b.time));
  return (
    <div className="flex overflow-x-auto gap-6 py-4 scrollbar-thin">
      {sorted.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * The planner UI card: timeline + add/edit/remove/complete, main component.
 */
function DailyHairCareRoutinePlanner() {
  // State for all tasks
  const [tasks, setTasks] = useState([
    // Example default task for users who just landed on the page
    // { id: 1, name: "Oil Hair", time: "08:00", note: "Use argan oil", completed: false }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalTask, setModalTask] = useState(null); // If set, we're editing an existing task
  const [selectedTime, setSelectedTime] = useState(defaultTimeSlots[2]); // Highlight a chosen slot for fast task adding

  // PUBLIC_INTERFACE
  function handleAddTaskBtn() {
    setModalTask(null); // For new task
    setShowModal(true);
  }

  // PUBLIC_INTERFACE
  function handleEditTask(task) {
    setModalTask(task);
    setShowModal(true);
  }

  // PUBLIC_INTERFACE
  function handleSaveTask(editedTask) {
    if (editedTask.id) {
      // Edit existing
      setTasks(tasks =>
        tasks.map(t => (t.id === editedTask.id ? { ...t, ...editedTask } : t))
      );
    } else {
      // Add new
      setTasks(tasks => [
        ...tasks,
        {
          ...editedTask,
          id: Date.now() + Math.floor(Math.random() * 100000),
          completed: false
        }
      ]);
    }
    setModalTask(null);
  }

  // PUBLIC_INTERFACE
  function handleDeleteTask(id) {
    setTasks(tasks => tasks.filter(t => t.id !== id));
  }

  // PUBLIC_INTERFACE
  function handleToggleComplete(id) {
    setTasks(tasks =>
      tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  // For timeline bar
  function handleTimelineSelect(time) {
    setSelectedTime(time);
  }

  // Filter tasks for this day (component may be extended for multiple days in future)
  const todaysTasks = tasks;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-br from-[#F8FBFD] to-[#F2F6FA] rounded-3xl shadow-2xl px-6 py-7 md:px-10 relative ring-2 ring-[#EAF6FF]/50 overflow-visible">
      <div className="flex flex-row items-center justify-between mb-2 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#4A90E2] mb-1 leading-tight">
            Daily Routine Planner
          </h2>
          <div className="text-sm text-gray-500">
            Schedule hair care actions for your perfect day
          </div>
        </div>
        <button
          onClick={handleAddTaskBtn}
          className="ml-auto bg-[#F5A623] hover:bg-[#FFD18C] text-white font-semibold px-5 py-2 rounded-2xl shadow-lg transition"
        >
          + Add Task
        </button>
      </div>

      {/* Visual Timeline Bar for selecting time / adding quickly */}
      <TimelineBar
        slots={defaultTimeSlots}
        selectedTime={selectedTime}
        onSelect={handleTimelineSelect}
      />

      {/* Main Timeline with tasks */}
      <RoutineTimeline
        tasks={todaysTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />

      {/* Add/Edit Modal */}
      <AddEditTaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTask}
        initialTask={modalTask}
        defaultTime={selectedTime}
      />

      {/* Subtle footer */}
      <div className="mt-5 text-center text-xs text-gray-400">
        <span className="inline-block px-2 py-1 rounded-full bg-[#4A90E2]/10 text-[#4A90E2] font-medium">
          Powered by Hairfit
        </span>
      </div>
    </div>
  );
}

export default DailyHairCareRoutinePlanner;
