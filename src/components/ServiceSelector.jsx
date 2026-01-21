export default function ServiceSelector({ services, selected, toggle }) {
  return (
    <div className="space-y-2">
      {services.map((s) => {
        const active = selected.some(x => x.id === s.id);
        return (
          <button
            key={s.id}
            onClick={() => toggle(s)}
            className={`w-full flex justify-between p-3 rounded border
            ${active ? "bg-black text-white" : "bg-gray-100"}`}
          >
            <span>{s.title}</span>
            <span>R$ {s.price}</span>
          </button>
        );
      })}
    </div>
  );
}
