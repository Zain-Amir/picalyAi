import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import axios from 'axios';
const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  
  const generateImage = async () => {
    if (form.prompt) {
      try {
        console.log(form.prompt);
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/deepai', {
          method: 'POST', // Specify the HTTP method
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: form.prompt }), // Wrap the data in an object
        });
  
        const responseData = await response.json(); // Parse the response JSON
  
        console.log(responseData);
  
        // Extract image URL from the "stabilityai" provider
        const stabilityaiImageUrl = responseData.stabilityai && responseData.stabilityai.items && responseData.stabilityai.items.length > 0
          ? responseData.stabilityai.items[0].image_resource_url
          : null;
  
        setForm({ ...form, photo: stabilityaiImageUrl });
      } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again later.');
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a proper prompt');
    }
  };
  
const handleSubmit = ()=>{}

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (form.prompt && form.photo) {
  //     setLoading(true);
  //     try {
  //       const response = await fetch('http://localhost:8080/api/v1/post', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ ...form }),
  //       });

  //       await response.json();
  //       alert('Success');
  //       navigate('/');
  //     } catch (err) {
  //       alert(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     alert('Please generate an image with proper details');
  //   }
  // };

  return (
    <section className="max-w-7xl mx-auto items-center justify-between" >
      <div className='text-white bg-gradient-to-r hover:shadow-xl from-slate-950 to-purple-700 p-10 border border-white rounded-2xl hover:bg-gradient-to-b from-purple-700 to-slate-950'>
        <h1 className="font-extrabold text-white text-[32px]">Turn your imagination into a reality!</h1>
        <p className="mt-2 text-white text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      <form className="mt-16 items-center justify-between " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 border  rounded-lg p-10 w-full  hover:shadow-cardhover">
          <FormField
            labelName=" Enter Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        <div className=' flex flex-col justify-between items-center  '>
          <div className=" bg-gradient-to-t from-purple-200 to-yellow-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-70"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
        
          </div>
        

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-slate-950 font-bold tracking-widest bg-gradient-to-l from-slate-200 to-yellow-200  rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        </div>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;