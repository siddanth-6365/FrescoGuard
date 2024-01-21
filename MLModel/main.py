from typing import Annotated
from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import json
from tensorflow.keras.models import load_model
import tensorflow as tf
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with the origin of your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model('model.h5')

class Data(BaseModel):
    crop: float
    temperature: float
    moisture: float
    pesticide: float
    light: float
    oxygen: float


@app.post("/spoilage")
async def sendData(info : Request):
    data = await info.json()
    crop = float(data["crop"])
    temperature = float(data["temperature"])
    moisture = float(data["moisture"])
    pesticide = float(data["pesticide"])
    light = float(data["light"])
    oxygen = float(data["oxygen"])
    x = [crop, temperature, moisture, pesticide, light, oxygen]
    x = np.array([x])
    x_ = tf.reshape(x, shape=(tf.shape(x)[0], -1))
    prediction = model.predict(x_)
    print(x_)
    print(prediction[0][0])
    ans = prediction[0][0]
    shelfLife = [1825, 1095, 550] 
    life = (shelfLife[int(crop)]*(100-ans))/100
    return {'spoilage': str(ans), 'life': str(int(life))}
 


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


