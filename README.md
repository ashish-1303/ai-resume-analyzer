#  AI Resume Analyzer 

AI-powered Resume Analyzer with a responsive UI design and Gemini AI integration.

###  Tech Stack : 

- Frontend : 
ReactJS 
TypeScript
TailwindCSS
Axios

- Backend : 
NodeJS
ExpressJS
MongoDB

###  Features : 

- Upload PDF, DOCX or TXT resumes.
- Extract resume text on the server.
- Analyze resumes with Gemini AI.
- Return ATS score, summary, strengths, improvements, keyword suggestions, missing sections, and priority fixes.
- Store analysis history in MongoDB.


###  Setup : 

1. Copy `server/.env.example` to `server/.env`.
2. Add your Gemini API key and MongoDB connection string.
3. Install dependencies : npm install
4. Run both apps : npm run dev
Client : `http://localhost:5173`
Server : `http://localhost:5000`
