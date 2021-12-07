import torch
import torch.nn as nn

def loss_fn(output, target, mask, num_labels):
    lfn = nn.CrossEntropyLoss()
    active_loss = mask.view(-1) == 1
    active_logits = output.view(-1, num_labels)
    active_labels = torch.where(
        active_loss,
        target.view(-1),
        torch.tensor(lfn.ignore_index).type_as(target)
    )
    loss = lfn(active_logits, active_labels)
    return loss 

class BertNERModel(nn.Module):
    def __init__(self, bert, num_tag):
        super(BertNERModel, self).__init__()
        self.num_tag = num_tag
        self.bert = bert
        self.dropout = nn.Dropout(0.3)
        self.output_tag = nn.Linear(768, self.num_tag)
    
    def forward(self, ids, mask, token_type_ids, target_tag):
        output, _ = self.bert(
            ids, 
            attention_mask=mask, 
            token_type_ids=token_type_ids,
            return_dict=False
        )

        bo_tag = self.dropout(output)
        tag = self.output_tag(bo_tag)
        loss_tag = loss_fn(tag, target_tag, mask, self.num_tag)

        return tag, loss_tag