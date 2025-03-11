from pathlib import Path
import json

image_ext = 'jpg'

images = list(Path("../images1/").glob(f'**/*.{image_ext}'))
tree = dict()

replaces = {
    "Santas": "Santa's",
    "Childrens": "Children's"
}

for image_path in images:
    parts = list(image_path.parts[-3:])
    parts[-1] = parts[-1].replace(f'.{image_ext}', '')
    if 'time_limit' in parts[-1]:
        continue
    head = tree
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

with open("../trials_lists/images1.js", "w") as out_file:
    s = json.dumps(tree, sort_keys=True, ensure_ascii=True, indent=4)
    s = s.replace(',\n' + ' ' * 4 * 3, ', ')
    s = s.replace('[\n' + ' ' * 4 * 3, '[')
    s = s.replace('\n' + ' ' * 4 * 2 + ']', ']')
    s = s.replace('\n' + ' ' * 4 * 3 + ']', ']')
    s = s.replace('[' + ' ' * 5 + '"', '["')
    s = s.replace(',' + ' ' * 5 + '"', ', "')
    s = s.replace('[' + ' ' * 4, '[')
    s = 'function getImages() {\n    return JSON.parse(`\n' + s + '\n    `);\n}\n';
    out_file.write(s)
