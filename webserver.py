from flask import Flask, render_template, jsonify
import pymongo
import json

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.IntelScrape
collection = db.items

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/data')
def getData():
    rows = []
    data = db.items.find({"scrape":{"$eq":"Processors"}}).limit(100)
    for row in data:
        row.pop('_id')
        row.pop('scrape')
        rows.append(row)
    return jsonify(rows)

@app.route('/fields')
def getFields():
    cols = []
    data = db.items.find({'scrape':{'$eq':'Processors'}})
    for i in data:
        cols.extend([x for x in i.keys() if x not in cols])
    cols.remove('_id')
    cols.remove('scrape')
    return jsonify(cols)

if __name__ == '__main__':
    app.run(debug=True)