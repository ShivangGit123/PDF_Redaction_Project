from flask import Flask, render_template, request, send_file, redirect, url_for
import os
from werkzeug.utils import secure_filename
import fitz  # PyMuPDF
import re

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
RESULT_FOLDER = "results"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

PATTERNS = {
    "Aadhaar": re.compile(r"\b\d{4}\s?\d{4}\s?\d{4}\b"),
    "PAN": re.compile(r"\b[A-Z]{5}\d{4}[A-Z]\b", re.IGNORECASE),
    "Phone": re.compile(r"(?:\+91[-\s]?)?[6-9]\d{9}")
}

def redact_pdf(input_path, output_path):
    doc = fitz.open(input_path)
    for page in doc:
        text = page.get_text("text")
        for label, pattern in PATTERNS.items():
            for match in pattern.finditer(text):
                matched_text = match.group(0)
                instances = page.search_for(matched_text)
                for inst in instances:
                    page.add_redact_annot(inst, fill=(0, 0, 0))
        page.apply_redactions()
    doc.save(output_path, garbage=4, deflate=True)

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/redact', methods=['POST'])
def redact():
    if 'pdf' not in request.files:
        return "No file uploaded", 400
    file = request.files['pdf']
    if file.filename == '':
        return "No filename provided", 400

    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    output_filename = "redacted_" + filename
    output_path = os.path.join(RESULT_FOLDER, output_filename)
    file.save(input_path)

    # Redact PDF
    redact_pdf(input_path, output_path)

    # Instead of sending file directly, render a page to view & download
    return render_template('view_pdf.html', pdf_file=output_filename)

# Route to serve PDF for embedding
@app.route('/results/<filename>')
def serve_pdf(filename):
    return send_file(os.path.join(RESULT_FOLDER, filename))

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
