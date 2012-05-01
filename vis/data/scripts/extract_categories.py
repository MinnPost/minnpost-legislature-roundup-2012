import json

json_data = open('../data/bills.json')

data = json.load(json_data)
categories = {}

for k, v in data.iteritems():
    for c in v["categories"]:
        try:
            categories[c].append(k)
        except KeyError:
            categories[c] = [k]

print categories

out = open('../data/categories.json', 'w')

out.write(json.dumps(categories))

json_data.close()
out.close()
