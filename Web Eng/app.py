import csv
import json
import statistics
from flask import Flask, request, json, jsonify, Response
from datetime import datetime as dt

# This file implements the back-end API of our web application. It receives requests and returns responses in form of
# CSV or JSON to be displayed on the webpage. This also supports pagination by returning only the rows to be displayed
# on one page.

app = Flask(__name__)
filename = "music.csv"
fields = []
rows = []


# This loads the songs rows from the CSV file.
@app.before_first_request
def init_csv_fields():
    with open(filename, 'r') as csvfile:
        csvreader = csv.reader(csvfile)

        for col in next(csvreader):
            fields.append(col)

        for row in csvreader:
            rows.append(row)
    return


# This route implements GET queries for artists. It returns a list of artists with their details, optionally filtered
# by artist name or genre.
@app.route('/artists')
def artists():
    name = request.args.get('name', None)
    terms = request.args.get('terms', None)
    page_start_index = request.args.get('pageStartIndex', None)
    page_size = request.args.get('pageSize', None)
    response_format = request.args.get('format', None)

    result = '{"Artists": []}'
    json_result = json.loads(result)

    if page_size is None:
        page_size = 30
    if page_start_index is None:
        page_start_index = 0

    indices = []
    for idx, row in enumerate(rows):
        if name is None and terms is None:
            json_result['Artists'].append({"Artist": create_json(fields[:10], row[:10], 0)})
            indices.append(idx)
        elif terms is None:
            if row[6].lower() == name.lower():
                json_result['Artists'].append({"Artist": create_json(fields[:10], row[:10], 0)})
                indices.append(idx)
        elif name is None:
            if row[8].lower() == terms.lower():
                json_result['Artists'].append({"Artist": create_json(fields[:10], row[:10], 0)})
                indices.append(idx)
        else:
            if row[6].lower() == name.lower() and row[8].lower() == terms.lower():
                json_result['Artists'].append({"Artist": create_json(fields[:10], row[:10], 0)})
                indices.append(idx)

    if response_format == "csv":
        csv_fields = rm_brackets(str(fields[:10]))
        return Response(csv_fields + rm_brackets(str([sublist[:10] for sublist in list(map(rows.__getitem__, indices))])), mimetype='text/csv')
    elif response_format is not None and response_format != "json":
        return "<h2>Error: Request for a response format unsupported by server</h2>Supported formats: csv and json"

    start_idx = int(page_start_index) * int(page_size)
    end_idx = int(page_start_index) * int(page_size) + int(page_size)
    json_result['totalArtists'] = len(json_result['Artists'])
    json_result['Artists'] = json_result['Artists'][start_idx:end_idx]
    json_result['Links'] = [{"href": "/artists"}, {"rel": "retrieve"}, {"type": "GET"},
                            {"parameters": {
                                "terms": {"type": "text"},
                                "name": {"type": "text"},
                                "pageStartIndex": {"type": "number"},
                                "pageSize": {"type": "number"}
                            }}
                            ]
    return json_result


# This creates json objects from given column names, and the row and starting index for the rows to be displayed.
def create_json(local_fields, row, idx):
    res = {}
    for field in local_fields:
        res[field.replace(".", '_')] = row[idx]
        idx = idx + 1
    return res


# This formats the response if the user asks for CSV format.
def rm_brackets(string):
    return string.replace("[", "").replace("],", "\n").replace("]]", "\n").replace("]", "\n")


arg_dict = {'artist': 6, 'year': 34, 'terms': 8}


# This route implements GET queries for songs. It returns a list of songs with their main details, optionally filtered
# by artist name, year or genre. If the Song ID is provided in the query, it returns all the details of that song.
@app.route('/songs')
def songs():
    song_id = request.args.get('id')
    response_format = request.args.get('format')
    page_start_index = request.args.get('pageStartIndex', None)
    page_size = request.args.get('pageSize', None)

    if page_size is None:
        page_size = 30
    if page_start_index is None:
        page_start_index = 0

    if song_id:
        result = '{"Song": []}'
        json_result = json.loads(result)

        idx = -1
        for i, row in enumerate(rows):
            if row[21] == song_id:
                json_result['Song'] = create_json(fields[12:], row, 12)
                idx = i

        if response_format == "csv":
            return Response(rm_brackets(str(fields[12:])) + rm_brackets(str(rows[idx][12:])), mimetype='text/csv')
        elif response_format is not None and response_format != "json":
            return "<h2>Error: Request for a response format unsupported by server</h2>Supported formats: csv and json"
        json_result['Links'] = [{"href": "/songs" + song_id + "/rename"}, {"rel": "rename"}, {"type": "PATCH"},
                                {"href": "/songs/" + song_id + "/delete"}, {"rel": "delete"}, {"type": "DELETE"}
                                ]
        return json_result

    result = '{"Songs": []}'
    json_result = json.loads(result)

    start_index = int(page_start_index) * int(page_size)
    end_index = int(page_start_index) * int(page_size) + int(page_size)
    indices = []
    flag = True
    if list(request.args.keys()).__len__() >= 1:
        for idx, row in enumerate(rows):
            for key, value in arg_dict.items():
                flag &= ((request.args.get(key) is None) or str(row[value]).lower() == request.args.get(key).lower())
            if flag:
                json_result['Songs'].append({"Song": create_json(fields, row, 0)})
                indices.append(idx)

            flag = True
    else:  # no query params given
        for idx, row in enumerate(rows):
            json_result['Songs'].append({"Song": create_json(fields, row, 0)})
            indices.append(idx)

    json_result['totalSongs'] = len(json_result['Songs'])
    json_result['Songs'] = json_result['Songs'][start_index:end_index]

    if response_format == "csv":
        csv_fields = rm_brackets(str(fields[12:]))
        return Response(csv_fields + rm_brackets(str([sublist[12:] for sublist in list(map(rows.__getitem__, indices))])), mimetype='text/csv')
    elif response_format is not None and response_format != "json":
        return "<h2>Error: Request for a response format unsupported by server</h2>Supported formats: csv and json"

    json_result['Links'] = [{"href": "/songs"}, {"rel": "retrieve"}, {"type": "GET"},
                            {"parameters": {
                                "artist": {"type": "text"},
                                "year": {"type": "number"},
                                "terms": {"type": "text"},
                                "pageStartIndex": {"type": "number"},
                                "pageSize": {"type": "number"}
                            }}
                            ]
    return json_result


# Removes data points that are negative numbers.
def remove_outliers(data):
    return_data = []
    for i in data:
        if i >= 0:
            return_data.append(i)
    return return_data


# This route implements GET queries for a particular artist. It returns the hotness statistics of the artist, along with
# the songs of the artist, optionally filtered by year.
@app.route('/artists/<name>', methods=['GET'])
def stats(name):
    year = request.args.get('year')
    response_format = request.args.get('format')
    hot_values = []
    song_years = []
    final_stats_json = {"artist_songs": []}

    with open(filename, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        next(csv_reader)

        for row in csv_reader:
            if year is None:
                if row[6].lower() == name.lower():
                    final_stats_json['artist_songs'].append({"Song": create_json(fields, row, 0)})
                    hot_values.append(row[20])
                    song_years.append(row[34])
            else:
                if row[6].lower() == name.lower() and row[34] == year:
                    final_stats_json['artist_songs'].append({"Song": create_json(fields, row, 0)})
                    hot_values.append(row[20])
                if row[6].lower() == name.lower():
                    song_years.append(row[34])

    hot_values = list(map(float, hot_values))
    hot_values = remove_outliers(hot_values)
    if hot_values.__len__() == 0:
        st_dev = 0
        mean = 0
        median = 0
    elif hot_values.__len__() == 1:
        st_dev = 0
        mean = hot_values[0]
        median = hot_values[0]
    else:
        st_dev = statistics.stdev(hot_values)
        mean = statistics.mean(hot_values)
        median = statistics.median(hot_values)

    song_years = list(set(map(int, song_years)))

    final_stats_json['stats_json'] = {'Mean': mean, 'Median': median, 'St_Dev': st_dev}
    final_stats_json['unique_song_years'] = song_years

    if response_format == "csv":
        return Response("mean,median,standard deviation<br/>" + str(mean) + "," + str(median) + "," + str(st_dev), mimetype='text/csv')
    elif response_format is not None and response_format != "json":
        return "<h2>Error: Request for a response format unsupported by server</h2>Supported formats: csv and json"

    final_stats_json['Links'] = [{"href": "/artists/" + name + "/addSong"}, {"rel": "add"}, {"type": "POST"},
                                 {"href": "/artists/" + name + "/"}, {"rel": "Statistics"}, {"type": "GET"}
                                 ]
    return jsonify(final_stats_json)


# This route implements POST queries to add a song for a given artist name. It takes some important song values and
# creates a new song row and adds it in the CSV file and on the website.
@app.route('/artists/<name>/addSong', methods=['POST'])
def add_song(name):
    writer = csv.writer(open(filename, "w", newline=''))
    writer.writerow(fields)
    for row in rows:
        writer.writerow(row)

    new_row = [0] * 35
    new_row[0] = request.get_json()['familiarity']
    new_row[1] = request.get_json()['artist_hotness']
    new_row[2] = request.get_json()['artist_id']
    new_row[3] = request.get_json()['latitude']
    new_row[4] = request.get_json()['location']
    new_row[5] = request.get_json()['longitude']
    new_row[6] = name
    new_row[8] = request.get_json()['terms']
    new_row[18] = request.get_json()['duration']
    new_row[20] = request.get_json()['hotness']
    new_row[21] = request.get_json()['songID']
    new_row[22] = request.get_json()['key']
    new_row[24] = request.get_json()['loudness']
    new_row[30] = request.get_json()['tempo']
    new_row[33] = request.get_json()['title']
    new_row[34] = request.get_json()['year']

    writer.writerow(new_row)
    rows.append(new_row)
    return get_json_result(new_row)


# This route implements PATCH queries to rename a song given a Song ID.
@app.route('/songs/<song_id>/rename', methods=['PATCH'])
def rename_song(song_id):
    data = request.json
    out_file = open(filename, "w", newline='')

    writer = csv.writer(out_file)
    writer.writerow(fields)

    renamed_row = []
    for row in rows:
        if row[21] == song_id:
            row[33] = data["title"]
            renamed_row = row

        writer.writerow(row)

    out_file.close()
    return get_json_result(renamed_row)


# This route implements DELETE queries to delete a song given a Song ID.
@app.route('/songs/<song_id>/delete', methods=['DELETE'])
def delete_song(song_id):
    out_file = open(filename, "w", newline='')
    writer = csv.writer(out_file)

    writer.writerow(fields)
    removed_row = ""
    for idx, row in enumerate(rows):
        if row[21] != song_id:
            writer.writerow(row)
        else:
            rows.remove(row)
            removed_row = row

    out_file.close()
    return get_json_result(removed_row)


def get_json_result(removed_row):
    json_result = {}
    json_result['data'] = {}
    for idx, value in enumerate(removed_row):
        json_result['data'][fields[idx]] = value
    json_result['Links'] = [{"href": "/songs"}, {"rel": "retrieve"}, {"type": "GET"},
                            {"parameters": {
                                "artist": {"type": "text"},
                                "year": {"type": "number"},
                                "terms": {"type": "text"}
                            }}
                            ]
    return json_result


@app.after_request
def add_headers(response):
    response.cache_control.max_age = 300
    response.last_modified = dt.utcnow()
    response.add_etag()
    return response


if __name__ == '__main__':
    app.run(debug=True)
