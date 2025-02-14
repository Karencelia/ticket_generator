import { useEffect, useState, useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";

export default function Ticket() {
  const [user, setUser] = useState(null);
  const barcodeRef = useRef(null);
  const ticketRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('ticketUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user?.email && barcodeRef.current) {
      JsBarcode(barcodeRef.current, user.email, {
        format: 'CODE128',
        lineColor: '#000',
        background: '#fff',
        width: 2,
        height: 60,
        displayValue: false,
      });
    }
  }, [user]);

  const downloadPDF = () => {
    if (ticketRef.current) {
      html2canvas(ticketRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save('ticket.pdf');
      });
    }
  };

  if (!user) return <p className="text-white text-center">Loading ticket...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1b2a] text-white">
      <div className='max-w-xl mx-auto bg-[#0d1b2a] border border-[#197686] text-center rounded-[30px] shadow-lg py-6 px-8'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-4'>
        <h2 className="text-2xl text-center sm:text-left mb-2 sm:mb-0">Ready</h2>
        <p className="text-sm sm:text-base">Step 3/3</p>
      </div>
      <div className="w-full h-1 bg-gray-700 mb-4">
        <div className="w-2/4 h-1 bg-[#197686]"></div>
      </div>
      <h2 className="text-2xl font-semibold">Your Ticket is Booked.</h2>
      <p className="mt-2 text-gray-400">
        Check your email for a copy or you can 
        <span 
          className="font-bold text-white cursor-pointer underline" 
          onClick={downloadPDF}
        > download</span>
      </p>

      <div ref={ticketRef} className="relative mt-6 bg-transparent border-2 border-[#197686] rounded-lg p-4 w-[350px] sm:w-[400px]">
        <h3 className="text-xl font-bold text-center text-white italic">Techember Fest '25</h3>
        <div className="flex items-center justify-center mt-2 text-sm text-gray-300">
          <MapPin className="w-4 h-4 text-red-400 mr-1" />
          04 Rumens Road, Ikoyi, Lagos
        </div>
        <div className="flex items-center justify-center mt-1 text-sm text-gray-300">
          <Calendar className="w-4 h-4 text-red-400 mr-1" />
          March 15, 2025 | 7:00 PM
        </div>

        <div className="flex justify-center mt-4">
          <div className="w-48 h-48 border-2 border-[#197686] rounded-lg overflow-hidden">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-4 bg-[#1b263b] p-4 rounded-lg text-sm">
          <div className="grid grid-cols-2 gap-4 text-left border-b border-[#197686] p-2">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="font-semibold">{user.name || "Guest"}</p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="font-semibold">{user.email || "Not Provided"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-left border-b border-[#197686] p-2">
            <div>
              <p className="text-gray-400">Ticket Type:</p>
              <p className="font-semibold">VIP</p>
            </div>
            <div>
              <p className="text-gray-400">Ticket for:</p>
              <p className="font-semibold">1</p>
            </div>
          </div>
          <div className="mt-2 text-left">
            <p className="text-gray-400">Special request?</p>
            <p className="text-gray-300">{user.specialRequest || "Nil"}</p>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4 bg-white rounded-lg border border-[#197686] p-4">
          <svg ref={barcodeRef} className="w-full h-20"></svg>
          <p className="text-xs tracking-widest font-mono mt-2 text-black"> {user?.ticketId || 'TICKET12345'}</p>

        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-evenly gap-4 text-sm pt-4">
              <Button className='px-4 py-2 w-full sm:w-48 bg-transparent border border-[#24A0B5] rounded'>Get Another Ticket</Button>
              <Button onClick={downloadPDF} className="bg-[#24A0B5] hover:bg-[#24A0B5] px-6 py-2 w-full sm:w-48">
                Download
              </Button>
            </div>
      </div>
    </div>
  );
}
