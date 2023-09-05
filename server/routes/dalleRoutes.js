import express from 'express';
import * as dotenv from 'dotenv';
import deepai from 'deepai'; // Import the deepai library
dotenv.config();

const router = express.Router();
deepai.setApiKey(process.env.DEEP_AI_API_KEY); // Set your DeepAI API key

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Call the DeepAI API with the provided prompt
    const deepaiResponse = await deepai.callStandardApi("text2img", {
      text: prompt,
      // other parameters as needed
    });

    const image = deepaiResponse.output_url; // Get the image URL from the response

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);

    let errorMessage = 'Something went wrong';
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
      errorMessage = error.response.data.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).send(errorMessage);
  }
});

export default router;
