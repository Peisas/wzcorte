import { useEffect, useState } from "react";
import { SERVICES } from "./data/services";
import { generateTimes } from "./utils/generateTimes";
import ServiceSelector from "./components/ServiceSelector";
import TimeGrid from "./components/TimeGrid";

export default function App() {
  const TIMES = generateTimes();

  const [name, setName] = useState("");
  const [services, setServices] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [blocked, setBlocked] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBlocked(saved);
  }, [date]);

  function toggleService(service) {
    setServices(prev =>
      prev.some(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  }

  function isBlocked(t) {
    return blocked.some(b => b.date === date && b.time === t);
  }

  function confirm() {
    const booking = { date, time };
    localStorage.setItem(
      "bookings",
      JSON.stringify([...blocked, booking])
    );

    const text = services
      .map(s => `${s.title} - R$${s.price}`)
      .join(", ");

    const msg = `
✂️ *Agendamento - WZ do Corte*
👤 ${name}
📅 ${date}
⏰ ${time}
💈 ${text}
    `;

    window.open(
      `https://wa.me/5584987716386?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-5 space-y-4">
        <h1 className="text-xl font-bold text-center">WZ Du Corte ✂️</h1>

        <input
          placeholder="Seu nome"
          className="w-full p-3 border rounded"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {name && (
          <ServiceSelector
            services={SERVICES}
            selected={services}
            toggle={toggleService}
          />
        )}

        {services.length > 0 && (
          <input
            type="date"
            className="w-full p-3 border rounded"
            onChange={e => setDate(e.target.value)}
          />
        )}

        {date && (
          <TimeGrid
            times={TIMES}
            blocked={isBlocked}
            selected={time}
            onSelect={setTime}
          />
        )}

        {time && (
          <button
            onClick={confirm}
            className="w-full bg-green-600 text-white py-4 rounded font-bold"
          >
            Confirmar no WhatsApp
          </button>
        )}
      </div>
    </div>
  );
    }
