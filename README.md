
# AI Travel Agent

An **AI-powered travel recommendation system** that predicts flight prices and suggests travel destinations using machine learning, vector search, and OpenAI integration. The platform combines MindsDB for forecasting, MariaDB for data storage, and a modern Next.js frontend.

---

## Tech Stack

* **MariaDB** – Relational database
* **MindsDB** – Machine learning predictions and forecasting
* **OpenAI** – AI-powered travel recommendations
* **FastAPI** – Backend API framework
* **Next.js** – Frontend React framework
* **TailwindCSS & Flowbite** – UI styling
* **Docker** – Containerized MariaDB deployment
* **AWS EC2** – Cloud hosting
* **Gretel** – Synthetic data generation

---

## Features

* **Flight Price Prediction** – Forecasts flight prices using MindsDB ML models
* **AI Travel Recommendations** – OpenAI-powered destination suggestions based on preferences
* **Real-time Data** – Fetches and displays flight information from MariaDB
* **Interactive Dashboard** – Next.js frontend with forms, dropdowns, and results table
* **Synthetic Data Generation** – Uses Gretel to create realistic travel datasets
* **RESTful API** – FastAPI backend with Pydantic schemas and SQLAlchemy ORM

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Madhusanka-slc/ai-travel-agent.git
cd ai-travel-agent
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Install frontend dependencies:

```bash
npm install
```

Set up environment variables (create a `.env` file):

```env
MARIADB_HOST=localhost
MARIADB_USER=your_user
MARIADB_PASSWORD=your_password
OPENAI_API_KEY=your_key
```

Run the FastAPI backend:

```bash
uvicorn backend.main:app --reload
```

Run the Next.js frontend:

```bash
npm run dev
```

Now the application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
