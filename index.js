
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";



const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Adding OpenAI API
const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://marvel-quiz-edf8a.web.app","http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json());
app.use(cors());

app.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  try {
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 3000,
      temperature: 0.3,
    });

    const botResponse = data.choices[0].text;
    res.json({ botResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.use('/posts', postRoutes);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('APP is RUN');
});

const CONNECTION_URL = 'mongodb+srv://Andria_Herivony:y4y7MNoyqlA9DAVg@andryzolalaina.sxmey4g.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);