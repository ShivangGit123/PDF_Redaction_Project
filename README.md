# PDF_Redaction_Project

# 🕵️‍♂️ Redaction Roulette

**Redaction Roulette** is a lightweight web app that automatically redacts sensitive information from uploaded text or PDF files. Built using **Flask (Python)** with a clean **HTML/CSS frontend**, it lets users upload files, apply redaction rules, and download the sanitized output — all through a simple interface.

---

## 🚀 Features
- Upload text or PDF files for redaction  
- Automatically detect & mask emails, phone numbers, IDs, and custom keywords  
- Choose redaction style: `[REDACTED]`, black boxes, or hashes  
- Preview and download redacted output instantly  
- Lightweight Flask backend + minimal HTML/CSS UI  

---
## ⚙️ Installation & Setup
1. Clone the repository or download the files.
2. Create a virtual environment and activate it:
   ```bash
   python -m venv .venv
   # macOS/Linux
   source .venv/bin/activate
   # Windows
   .venv\Scripts\activate
3. Install the dependencies:
4. pip install -r requirements.txt
5. Run the Flask app:
  python app.py
6. Open your browser and visit 👉 http://127.0.0.1:5000

🧠 How It Works

Upload a file or paste text into the text box.
Choose what to redact (emails, phone numbers, IDs, or custom words).
Select your preferred redaction style.
Click Submit → the app processes the content and returns a redacted version for preview or download.

🧾 Example API (optional)
curl -F "file=@sample.txt" \
     -F "rules=emails,phones" \
     -F "style=BLACK_BOX" \
     http://127.0.0.1:5000/api/redact \
     -o redacted.txt
   
