import csv
import json
import statistics
from flask import Flask, request, json

app = Flask(__name__)
filename = "music.csv"
fields = []
rows = []


# load the fields from csv file
@app.before_first_request
def init_csv_fields():
    print("initialize csv fields")
    with open(filename, 'r') as csvfile:
        csvreader = csv.reader(csvfile)

        for col in next(csvreader):
            fields.append(col)

        for row in csvreader:
            rows.append(row)
    return


@app.route('/')
def index():
    return "index page"


@app.route('/artists')
def artists():
    name = request.args.get('name', None)
    terms = request.args.get('terms', None)

    result = '{"Artists": []}'
    json_result = json.loads(result)

    for row in rows:
        if terms is None:
            if row[6].lower() == name.lower():
                json_result['Artists'].append({"Artist": create_json(fields[:10], row[:10], 0)})
        elif name is None:
            if row[8].lower() == terms.lower():
                json_result['Artists'].append({"Artist": create_json(fields[:10], row[:10], 0)})
        else:
            if row[6].lower() == name.lower() and row[8].lower() == terms.lower():
                json_result['Artists'].append({"Artist": create_json(fields[:10], row[:10], 0)})
    return json_result


def create_json(local_fields, row, idx):
    res = {}
    for field in local_fields:
        res[field] = row[idx]
        idx = idx + 1
    return res


@app.route('/songs')
def songs():
    song_id = request.args.get('id')
    artist = request.args.get('artist')
    year = request.args.get('year')
    terms = request.args.get('terms')

    if song_id:
        result = '{"Song": []}'
        json_result = json.loads(result)

        for row in rows:
            if row[21] == song_id:
                json_result['Song'] = create_json(fields[12:], row, 12)

    if artist or year:
        result = '{"Songs": []}'
        json_result = json.loads(result)

        for row in rows:
            if year is None:
                if row[6].lower() == artist.lower():
                    json_result['Songs'].append({"Song": create_json(fields[12:], row, 12)})
            elif artist is None:
                if row[34] == year:
                    json_result['Songs'].append({"Song": create_json(fields[12:], row, 12)})
            else:
                if row[6].lower() == artist.lower() and row[34] == year:
                    json_result['Songs'].append({"Song": create_json(fields[12:], row, 12)})

    if terms:
        result = '{"Songs": []}'
        json_result = json.loads(result)

        for row in rows:
            if row[8].lower() == terms.lower():
                json_result['Songs'].append({"Song": create_json(fields[12:], row, 12)})

    return json_result


# removing data points that have negative numbers / outliers
def remove_outliers(data):
    return_data = []
    for i in data:
        if i >= 0:
            return_data.append(i)
    return return_data


@app.route('/songs/stats')
def stats():
    name = request.args.get('name')
    year = request.args.get('year')

    hot_values = []

    with open(filename, 'r') as csvfile:
        csvreader = csv.reader(csvfile)

        next(csvreader)

        for row in csvreader:
            if year is None:
                if row[6].lower() == name.lower():
                    hot_values.append(row[20])
            elif name is None:
                if row[34] == year:
                    hot_values.append(row[20])
            else:
                if row[6].lower() == name.lower() and row[34] == year:
                    hot_values.append(row[20])

    hot_values = list(map(float, hot_values))
    hot_values = remove_outliers(hot_values)

    mean = statistics.mean(hot_values)
    median = statistics.median(hot_values)
    st_dev = statistics.stdev(hot_values)

    stats_json = '{"Statistics":{"Mean":"' + str(mean) + '", "Median":"' + str(median) + '", "St Dev":"' + str(
        st_dev) + '"}}'
    return json.loads(stats_json)


@app.route('/songs/<song_id>/rename', methods=['PATCH'])
def rename_song(song_id):
    data = request.json
    out_file = open(filename, "wb")
    writer = csv.writer(out_file)

    for row in rows:
        if row[21] == song_id:
            row[33] = data["title"]
        writer.writerow(row)

    out_file.close()
    return data


if __name__ == '_main_':
    app.run(debug=True)
