# simple-named-entity-recognition

This is a project built for a simple English named entity recognition.

## Download model and packages
Put all model to backend/model
- [Ner model](https://drive.google.com/file/d/1--o8xt2pOquOtTsgKzo-j-V-WhqP9hBt/view?usp=sharing)
- [Tags encoder](https://drive.google.com/file/d/1--p49Qw2_6-dc0bzrzmR7krIQRcP3U73/view?usp=sharing)
- Pretrained BERT
```bash
cd backend/model
git lfs install
git clone https://huggingface.co/bert-base-uncased
```
## Installation
- Set directory for backend.
```bash
pip install -e .
```
- Install packages.

```bash
cd backend
pip install -r requirements.txt
```
- Start backend.
```bash
python app.py
```
## Usage
Use Postman to send a post request to with a json body contains one 'text' field.
```
http://0.0.0.0:8000/ner/
```

## License
[MIT](https://choosealicense.com/licenses/mit/)