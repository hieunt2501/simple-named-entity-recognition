import torch

from backend.src.PretrainedModel import NerModel
from backend.src.dataset import EntityDataset
from backend.src.utils import find_idx, merge_subwords

def infer_ner(sentence, accumulated_length):
    model = NerModel()

    ner = model.ner 
    enc_tag = model.enc_tag
    tokenizer = model.tokenizer
    tokenized_sentence = tokenizer.encode(sentence)
    tokens = tokenizer.convert_ids_to_tokens(tokenized_sentence)[1:-1]
    sentence = sentence.lower()
    sentence_split = sentence.split()

    test_dataset = EntityDataset(
        texts=[sentence_split], 
        tags=[[0] * len(sentence_split)],
        tokenizer=tokenizer
    )

    with torch.no_grad():
        data = test_dataset[0]
        for k, v in data.items():
            data[k] = v.unsqueeze(0)
        tag, _ = ner(**data)
        output_tags = enc_tag.inverse_transform(
                tag.argmax(2).cpu().numpy().reshape(-1))
    output_tags = output_tags[1:len(tokenized_sentence)-1]

    tokens, output_tags = merge_subwords(tokens, output_tags)

    spans = []
    sentence_start_idx = 0
    for token, tag in zip(tokens, output_tags):        
        start_idx, end_idx = find_idx(sentence[sentence_start_idx:], token)
        if tag == 'O':
            sentence_start_idx = end_idx
            continue
        
        entity_type, entity_name = tag.split('-')
        if entity_type == 'B':
            span = {'start': sentence_start_idx + start_idx + accumulated_length,
                    'end': sentence_start_idx + end_idx + accumulated_length,
                    'type': entity_name.upper()}
            spans.append(span)
        else:
            span = spans[-1]
            span.update({'end': sentence_start_idx + end_idx + accumulated_length})
        sentence_start_idx = end_idx

    return spans