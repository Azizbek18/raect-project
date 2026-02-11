import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([]);
  
  const [massa, setMassa] = useState('');
  const [tuman, setTuman] = useState('');
  const [kocha, setKocha] = useState('');
  const [Uy_Manzili, setUyManzili] = useState('');

  const fetchData = () => {
    fetch('http://localhost:5098/api/Zakaslar')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchData(); }, []);

  const handlePost = (e) => {
    e.preventDefault();
    
    // Server kutayotgan modelga mos obyekt
    // Eslatma: Agar serverda nomlar katta harf bo'lsa (Massa, Tuman...), 
    // pastdagi nomlarni ham katta harf bilan yozing.
    const newZakas = {
      Massa: parseFloat(massa),
      Tuman: tuman,
      Kocha: kocha,
      Uy_Manzili: Uy_Manzili
    };

    fetch('http://localhost:5098/api/Zakaslar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newZakas)
    })
    .then(res => {
      if(res.ok) {
        // Formalarni tozalash
        setMassa(''); setTuman(''); setKocha(''); setUyManzili('');
        fetchData();
        alert("Zakas muvaffaqiyatli qo'shildi!");
      } else {
        alert("Xatolik! Ma'lumot formati noto'g'ri bo'lishi mumkin.");
      }
    })
    .catch(err => console.error("Xatolik:", err));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center font-sans">
      
      {/* FORM QISMI */}
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg mb-10 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 border-b pb-2">Yangi Buyurtma</h2>
        <form onSubmit={handlePost} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="text-sm font-semibold text-gray-600">Massa (kg)</label>
              <input type="number" value={massa} onChange={(e) => setMassa(e.target.value)} className="w-full p-2 border rounded-md" required />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-sm font-semibold text-gray-600">Tuman</label>
              <input type="text" value={tuman} onChange={(e) => setTuman(e.target.value)} className="w-full p-2 border rounded-md" required />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold text-gray-600">Ko'cha</label>
              <input type="text" value={kocha} onChange={(e) => setKocha(e.target.value)} className="w-full p-2 border rounded-md" required />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold text-gray-600">Uy manzili</label>
              <input type="text" value={Uy_Manzili} onChange={(e) => setUyManzili(e.target.value)} className="w-full p-2 border rounded-md" required />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">
            Bazaga Yuborish
          </button>
        </form>
      </div>

      {/* LIST QISMI */}
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Barcha Zakaslar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <p className="font-bold text-indigo-600">Massa: {item.massa} kg</p>
              <p className="text-sm text-gray-600 mt-1">📍 {item.tuman}, {item.kocha}, {item.uyManzili}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App