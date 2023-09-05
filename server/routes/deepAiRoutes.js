import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios'; // Import the axios library
// const axios = require('axios');
dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Eden AI!' });
});

router.route('/').post(async (req, res) => {
    try {
    // alert('hello')        
    const { prompt } = req.body;
    // res.status(300).json({ message: "hello" });
    const apiKey = process.env.EDEN_AI_API_KEY;
  
        const options = {
          method: 'POST',
          url: 'https://api.edenai.run/v2/image/generation',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTY2ZTA1NTUtZTUwZi00MWY5LThlZTAtZTNiYjdhMmZjNzM0IiwidHlwZSI6InNhbmRib3hfYXBpX3Rva2VuIn0.3nJ-6Nu-qImKOzKG33OYmr6vhQut2nOrY4o5XAG_Czk'
          },
          data: {
            response_as_dict: true,
            attributes_as_list: false,
            show_original_response: false,
            resolution: '512x512',
            num_images: 1,
            providers: 'stabilityai',
            text: prompt
          }
        };
    
        const response = await axios.request(options);
        res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the image.' });
      }
      
});

export default router;
