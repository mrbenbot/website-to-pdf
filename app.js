const express = require("express");
const { getPdf, getContent } = require("./browser");
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/pdf", async (req, res) => {
  const { url } = req.query;
  const pdf = await getPdf(url);
  res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  res.send(pdf);
});
app.get("/content", async (req, res) => {
  const { url } = req.query;
  const content = await getContent(url);
  res.json({ content });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
