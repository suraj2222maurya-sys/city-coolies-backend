# City Coolies Backend

This repository is the separate Python backend for City Coolies.

## Repository separation

- `city-coolies-service-platform` remains the Next.js frontend repository.
- `city-coolies-backend` contains backend code only.
- Do not place Next.js pages, UI components, CSS, frontend assets, or frontend routing code here.
- Do not place Python backend implementation inside the frontend repository.

## Current foundation

This repository has been reset to a clean Python/FastAPI foundation.
The previous Node.js/TypeScript backend is archived in Git history/its safety archive branch and is not part of the new main branch.
Razorpay/payment backend code is not included.

Frontend behavior such as service navigation, booking UI, blog navigation, `tel:` call links, email links, and WhatsApp links stays in the Next.js frontend.

## Windows setup

```powershell
cd C:\Users\user\city-coolies\city-coolies-backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Health checks:

- `http://127.0.0.1:8000/health`
- `http://127.0.0.1:8000/api/health`

Development API docs:

- `http://127.0.0.1:8000/docs`

Payment integrations will only be added later if explicitly required.