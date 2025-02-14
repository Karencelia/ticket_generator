import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from '@/components/ui/Upload';


export default function FormPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [specialRequest, setSpecialRequest] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {

    let formErrors = {}; 

    if (!name) formErrors.name = "Name is Required";
    if (!email) formErrors.email = "Email is Required";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      setTimeout(() => setErrors({}), 2000);
      return;
    }
  
    const userData = { name, email, avatar, specialRequest };
    localStorage.setItem('ticketUser', JSON.stringify(userData));
    router.push('/ticket');
  };

  return (
    
      
    <div className="min-h-screen border-[#197686] mx-auto text-white flex items-center justify-center px-4 sm:px-6 md:px-8">
  <section className="max-w-xl mx-auto bg-[#0d1b2a] border border-[#197686] px-4 sm:px-6 md:px-8 rounded-[30px] shadow-lg py-6">
    <div className="max-w-lg w-full bg-transparent border border-[#197686] p-4 sm:p-6 md:p-8 rounded-[30px] shadow-lg">
      <div className='flex flex-col sm:flex-row justify-between items-center mb-4'>
        <h2 className="text-2xl text-center sm:text-left mb-2 sm:mb-0">Attendee Details</h2>
        <p className="text-sm sm:text-base">Step 2/3</p>
      </div>
      <div className="w-full h-1 bg-gray-700 mb-4">
        <div className="w-2/4 h-1 bg-[#197686]"></div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Upload Profile Photo</label>
        <Upload
          onChange={(file) => {
            const fileURL = URL.createObjectURL(file);
            setAvatar(fileURL);
          }}
          className="mt-2 bg-[#197686] border border-[#197686] p-4 sm:p-6 text-center rounded-lg cursor-pointer hover:border-[#197686] transition"
        >
          Drag & drop or click to upload
        </Upload>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-2">Enter your name</label>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 sm:p-3 bg-red-500 border border-[#197686] rounded-lg text-white"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-2">Enter your email *</label>
        <Input
          type="email"
          placeholder="hello@aviolagos.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 sm:p-3 border border-[#197686] rounded-lg bg-transparent text-red"
        />

{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-2">Special request?</label>
        <textarea
          placeholder="Textarea"
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          className="w-full p-2 sm:p-3 resize-none border border-[#197686] rounded-lg bg-transparent text-white h-24"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-evenly gap-4 text-sm">
        <Button onClick={() => router.push('/')} className='px-4 py-2 w-full sm:w-48 bg-transparent border border-[#24A0B5] rounded'>Back</Button>
        <Button onClick={handleSubmit} className="bg-[#24A0B5] hover:bg-[#24A0B5] px-6 py-2 w-full sm:w-48">
          Get My Free Ticket
        </Button>
      </div>
    </div>
  </section>
</div>

  );
}
