import type { NextApiRequest, NextApiResponse } from 'next';

// Utility function to handle fetch with a timeout
const fetchWithTimeout = (url: string, options: RequestInit, timeout = 5000) =>
  Promise.race([
    fetch(url, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    ),
  ]);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { payloadRequestCallBack, payloadCaptureLeadRequest } = req.body;

  try {
    // Send both requests in parallel with timeout
    const responses = await Promise.all([
      fetchWithTimeout('https://achieversit.com/management/requestCallBack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadRequestCallBack),
      }),
      fetchWithTimeout('https://achieversit.com/management/captureLeadRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadCaptureLeadRequest),
      }),
    ]);

    // Check if both responses are successful
    if (responses.every((response) => response.ok)) {
      return res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to submit the form' });
    }
  } catch (error) {
    console.error('Error or timeout during form submission:', error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
}
