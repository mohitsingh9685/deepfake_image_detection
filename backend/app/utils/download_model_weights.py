import os
import requests

def download_model_weights(model_url: str, model_path: str):

    os.makedirs("models", exist_ok=True)
    
    if not os.path.exists(model_path):
        print("Downloading model from HuggingFace...")
        response = requests.get(model_url)
        with open(model_path, "wb") as f:
            f.write(response.content)
        print("Download complete.")
    else:
        print("Model weights already exist. Skipping download.")