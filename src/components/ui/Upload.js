import { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export function Upload({ onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="relative flex flex-col items-center justify-center w-60 h-60 border-2  border-[#197686] border-dashed rounded-lg bg-[#1b263b] cursor-pointer hover:border-[#197686] transition">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud className="w-10 h-10 text-[#197686] mb-2" />
            <p className="text-sm text-[#197686]">Drag & drop or click to upload</p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
}
