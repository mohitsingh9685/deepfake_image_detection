# Deepfake Detection Web Application

A production-ready web application for detecting deepfakes using deep learning and a modern web stack.

## Tech Stack

- **Backend:** FastAPI (Python 3.10)
- **Deep Learning:** TensorFlow 2.16 with MobileNetV2
- **Frontend:** React 18 + Vite
- **Model:** Binary classification (Fake vs Real)
- **GPU Support:** Apple Metal compatible

## Project Structure

```
deepfake-project/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── model/
│   └── deepfake_model.h5
├── dataset/
│   ├── Train/
│   ├── Validation/
│   └── Test/
├── train.py
├── requirements.txt
└── README.md
```

## Setup Instructions

### Prerequisites

- Python 3.10+
- Node.js 16+ and npm
- Conda (recommended)

### 1. Train the Model

```bash
# Install dependencies
pip install -r requirements.txt

# Run training script
python train.py
```

The model will be saved to `model/deepfake_model.h5`.

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python main.py
```

Server runs on `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`

### 3. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## Usage

1. Open http://localhost:5173 in your browser
2. Click "Choose Image" to upload an image
3. Click "Analyze" to get prediction
4. View results: Prediction label and confidence score

## API Endpoints

### GET `/`
Returns API information

### GET `/health`
Health check endpoint

### POST `/predict`
Make a prediction on an image

**Request:** Multipart form data with image file
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "accept: application/json" \
  -F "file=@image.jpg"
```

**Response:**
```json
{
  "prediction": "Fake",
  "confidence": 0.9234,
  "raw_score": 0.9234
}
```

## Model Architecture

- **Base Model:** MobileNetV2 (pretrained on ImageNet)
- **Frozen Layers:** All base layers frozen for transfer learning
- **Custom Head:**
  - GlobalAveragePooling2D
  - Dropout(0.3)
  - Dense(1, sigmoid)
- **Optimizer:** Adam (lr=1e-4)
- **Loss:** Binary Crossentropy
- **Input Size:** 224x224x3
- **Output:** Probability score (0-1)

## Training Details

- **Batch Size:** 32
- **Epochs:** 10
- **Image Normalization:** 1/255
- **Data Splits:**
  - Training
  - Validation
  - Test

## Building for Production

### Backend
```bash
# Build Docker image
docker build -t deepfake-backend ./backend

# Run container
docker run -p 8000:8000 deepfake-backend
```

### Frontend
```bash
# Build for production
cd frontend
npm run build

# Output in dist/ directory
```

## Performance Metrics

Model evaluation results are saved in `model/` directory:
- `confusion_matrix.png` - Confusion matrix visualization
- `training_history.png` - Training and validation metrics

## Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:8000
```

### Backend
Model path: `model/deepfake_model.h5`

## Troubleshooting

**Model not loading:**
- Ensure `model/deepfake_model.h5` exists
- Run training script if model missing

**CORS errors:**
- Backend CORS middleware already configured
- Check frontend API_URL matches backend host:port

**API connection failed:**
- Verify backend running on port 8000
- Check firewall settings

## Performance Optimization

- Frontend: Uses Vite for fast bundling
- Backend: Implements async processing
- Model: MobileNetV2 optimized for inference speed
- GPU: Automatic Metal GPU acceleration on Apple Silicon

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
# deepfake_image_detection
