from backend.src.utils import load_ner_model, load_enc_tag
from transformers import BertModel, AutoTokenizer

class NerModel:
    _instance = None
    
    def __new__(self, cfg=None, *args, **kwargs):
        if not self._instance:
            self._instance = super(NerModel, self).__new__(self, *args, **kwargs)
            # load tag encoder
            self.enc_tag = load_enc_tag(cfg['enc_tag'])
            
            # load bert model and its tokenizer
            self.bert = BertModel.from_pretrained(cfg['base_model'])
            self.tokenizer = AutoTokenizer.from_pretrained(cfg['base_model'])
            self.max_len = cfg['max_len']
            
            # Load ner model
            self.ner = load_ner_model(
                len(list(self.enc_tag.classes_)), 
                self.bert,
                cfg['model_ckpt'])
        else:
            return self._instance