import express from 'express';

const app = express();

app.get("/", (request, response) => {
	return response.json({ message: "NLW4" });
});

app.post("/", (request, response) => {
	return response.json({ message: "dados salvos" });
});

app.listen(3333, () => console.log("Running"));