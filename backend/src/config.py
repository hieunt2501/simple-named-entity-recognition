import os
import yaml

CUR_DIR = os.path.dirname(__file__)

class BERTConfig:
    BASE_MODEL_PATH = os.path.join(CUR_DIR, "../model/bert-base-uncased")
    MODEL_PATH = "../model/model.bin"
    META_PATH = "../model/meta.bin"

def get_config():
    with open('app.yml', encoding='utf-8') as cfgFile:
        config_app = yaml.safe_load(cfgFile)        
    return config_app