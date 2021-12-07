import torch
import joblib
import re
import spacy
from pysbd.utils import PySBDFactory

from backend.src.model import BertNERModel

def load_enc_tag(path):
    enc_tag = joblib.load(path)
    return enc_tag

def load_ner_model(num_tag, bert, ckpt_path):    
    model = BertNERModel(bert=bert, num_tag=num_tag)
    model.load_state_dict(torch.load(
        ckpt_path, 
        map_location=torch.device('cpu'))) # run on cpu 
    return model

def find_idx(sentence, token):
    # avoid special character used for regex
    if token in '.^$*+-?()[]{}\|—/':
        token ='\\' + token
    match_list = [(match.start(), match.end()) \
        for match in re.finditer(token, sentence)]
    return match_list[0]

def merge_subwords(tokens, tags):
    tokens_res = []
    tags_res = []

    for token, tag in zip(tokens, tags):
        if len(token) >= 2 and token[0:2] == '##':
            text = tokens_res[-1] + token[2:]
            tokens_res = tokens_res[:-1]
            tokens_res.append(text)
        else:
            tokens_res.append(token)
            tags_res.append(tag)

    return tokens_res, tags_res

def segment_sentence(sentence):
    nlp = spacy.blank('en')
    nlp.add_pipe(PySBDFactory(nlp))
    doc = nlp(sentence)
    return [span.text for span in list(doc.sents)]