export default async function handler(req, res) {
  const { path } = req.query; // Get the API endpoint from the path
  const url = `http://13.235.70.111:3000/${path.join("/")}`; // External API URL

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch API", details: error.message });
  }
}
