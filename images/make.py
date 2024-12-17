from pathlib import Path
import json

files = Path(".").glob('**/*.jpg')
tree = dict()

replaces = {
    "Santas": "Santa's",
    "Childrens": "Children's"
}

for filepath in files:
    if 'time_limit.jpg' in filepath.parts:
        continue
    parts = list(map(str, filepath.parts))
    head = tree
    for i in range(len(parts)):
        parts[i] = parts[i].replace('.jpg', '')
    for x in parts[:-2]:
        if x not in head:
            head[x] = dict()
            head = head[x]
        else:
            head = head[x]
    filename = parts[-1]
    title = parts[-1]
    for v1, v2 in replaces.items():
        title = title.replace(v1, v2)
    if filename == title:
        head.setdefault(parts[-2], list()).append(filename)
    else:
        head.setdefault(parts[-2], list()).append([filename, title])

with open("out.txt", "w") as out_file:
    s = json.dumps(tree, sort_keys=True, ensure_ascii=True, indent=4)
    s = s.replace(',\n' + ' ' * 4 * 3, ', ')
    s = s.replace('[\n' + ' ' * 4 * 3, '[ ')
    s = s.replace('\n' + ' ' * 4 * 2 + ']', ']')
    s = s.replace('\n' + ' ' * 4 * 3 + ']', ']')
    s = s.replace('[' + ' ' * 5 + '"', '["')
    s = s.replace(',' + ' ' * 5 + '"', ', "')
    out_file.write(s)
