from fastapi import FastAPI, Request
import uvicorn
import logging
import time

from backend.src.infer_ner import infer_ner
from backend.src.PretrainedModel import NerModel
from backend.src.config import get_config
from backend.src.utils import segment_sentence

app = FastAPI()
config_app = get_config()

logging.basicConfig(filename=config_app['log']['app'],
                    format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

model = NerModel(config_app['bert_ner'])

@app.post("/ner")
async def get_ner_entities(request: Request):
    data = await request.json()
    data = dict(data)

    if 'text' not in data or not data['text']:
        return {"result": "no text field"}

    text = data['text']
    sentences = segment_sentence(text)

    accumulated_length = 0
    total_spans = []
    start_time = time.time()
    for sentence in sentences:        
        total_spans += infer_ner(sentence, accumulated_length)
        accumulated_length += len(sentence)
        if not ('\n' in sentence or '\t' in sentence):
            accumulated_length += 1
    exec_time = round(time.time() - start_time, 2)
    
    return {'text': text, 'spans': total_spans, 'time': exec_time}

uvicorn.run(
    app, 
    host=config_app['server']['ip_address'], 
    port=config_app['server']['port']
)