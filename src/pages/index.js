import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';


export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [ticketType, setTicketType] = useState('Free');
  const [selectedTickets, setSelectedTickets] = useState('1');

  useEffect(() => {
    setName(getFromLocalStorage('name') || '');
    setEmail(getFromLocalStorage('email') || '');
    setAvatar(getFromLocalStorage('avatar') || '');
  }, []);

  const handleNext = () => {
    saveToLocalStorage('ticketType', ticketType);
    saveToLocalStorage('selectedTickets', selectedTickets);
    router.push('/attendeeDetails');
  };

  return (
<div className="min-h-screen bg-[#0d1b2a] text-white px-4 sm:px-8 max-w-2xl mx-auto border border-[#197686] p-4 sm:p-6 rounded-lg shadow-lg">
    <section className="max-w-2xl mx-auto bg-transparent border border-[#197686] p-4 sm:p-6 rounded-[30px] shadow-lg">
      <div className='flex flex-col sm:flex-row justify-between items-center sm:items-start'>
        <header className="py-2 sm:py-4 text-left text-xl sm:text-2xl border-b border-gray-700 w-full sm:w-auto">Ticket Selection</header>
        <p className='mt-2 sm:mt-4'>Step 1/3</p>
      </div>
      <div className="w-full h-1 bg-gray-700 mb-2">
        <div className="w-1/3 h-1 bg-[#197686]"></div>
      </div>
      <div className="bg-gray-800 text-center shadow-lg p-4 sm:p-8 border-[#0E464F] rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif ticket">Techember Fest "25</h2>
        <p className="mt-2 text-gray-300">Join us for an unforgettable experience at <br /> [Event Name]! Secure your spot now.</p>
        <p className="mt-2 sm:mt-4 text-gray-300">📍 [Event Location] | March 15, 2025 | 7:00 PM</p>
      </div>
      <div className='bg-[#0E464f] h-1 mt-4'></div>
      <div className="mt-4 sm:mt-6">
        <h3 className="text-lg font-semibold mb-2">Select Ticket Type:</h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          {['Free', '$150 VIP', '$150 VVIP'].map((type) => (
            <button 
              key={type} 
              onClick={() => setTicketType(type)} 
              className={`flex-1 p-3 sm:p-4 rounded-xl border ${ticketType === type ? 'bg-[#197686] border border-[#24A0B5] text-white shadow-lg' : 'border-gray-500'} text-left transition hover:bg-[#24A0B5]`}
            >
              {type} <br /><span className="text-sm">{type === 'Free' ? 'Regular Access' : 'Premium Access'}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6">
        <h3 className="text-lg font-semibold mb-2">Number of Tickets</h3>
        <select
          value={selectedTickets}
          onChange={(e) => setSelectedTickets(e.target.value)}
          className="w-full p-2 border border-gray-500 rounded-lg bg-gray-800 focus:ring-2 focus:ring-[#24A0B5] text-white"
        >
          {[1, 2, 3, 4].map(num => (
            <option key={num} value={num} className="text-black">{num}</option>
          ))}
        </select>
        <p className="mt-2 text-lg">Selected Tickets: {selectedTickets}</p>
      </div>
      
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 w-full">
        <Button className="flex-1 px-4 py-2 bg-transparent border border-[#24A0B5] rounded">Cancel</Button>
        <Button onClick={handleNext} className="flex-1 px-4 py-2 bg-[#24A0B5] rounded hover:bg-[#24A0B5]">Next</Button>
      </div>  
    </section>
</div>

  );
}
