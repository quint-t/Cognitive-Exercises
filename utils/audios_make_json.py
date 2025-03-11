from pathlib import Path
import json
import os

image_ext = 'jpg'
audio_ext = 'mp3'

images = list(Path("../images1/").glob(f'**/*.{image_ext}'))
audios = list(Path("../audios1/").glob(f'**/*.{audio_ext}'))
tree = dict()

replaces = {
    # ...
}

filtered_audios = []
for audio_path in audios:
    b = False
    audio_name = os.path.join(*audio_path.parts[-3:])[:-len(audio_ext)]
    for image_path in images:
        image_name = os.path.join(*image_path.parts[-3:])[:-len(image_ext)]
        if image_name == audio_name:
            filtered_audios.append(audio_path)
            b = True
            break
    if not b:
        print(audio_path, '- not found (skipped)')
        filtered_audios.append(audio_path)
audios = filtered_audios

for audio_path in audios:
    parts = list(audio_path.parts[-3:])
    parts[-1] = parts[-1].replace(f'.{audio_ext}', '')
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

with open("../trials_lists/audios1.js", "w") as out_file:
    s = json.dumps(tree, sort_keys=True, ensure_ascii=True, indent=4)
    s = s.replace(',\n' + ' ' * 4 * 3, ', ')
    s = s.replace('[\n' + ' ' * 4 * 3, '[')
    s = s.replace('\n' + ' ' * 4 * 2 + ']', ']')
    s = s.replace('\n' + ' ' * 4 * 3 + ']', ']')
    s = s.replace('[' + ' ' * 5 + '"', '["')
    s = s.replace(',' + ' ' * 5 + '"', ', "')
    s = s.replace('[' + ' ' * 4, '[')
    s = 'function getAudios() {\n    return JSON.parse(`\n' + s + '\n    `);\n}\n';
    out_file.write(s)
