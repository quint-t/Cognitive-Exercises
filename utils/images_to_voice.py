import base64
import glob
import os
import time
import traceback

import requests
import shutil


class SpeechifyAPI:
    def __init__(self):
        self.session = requests.Session()
        self.base_url = "https://audio.api.speechify.com"
        self.timeout = 60

        self.headers = {
            "content-type": "application/json",
            "Accept": "*/*",
            "Accept-Base64": "true",
            "Accept-Language": "es-419,es;q=0.6",
            "Origin": "https://speechify.com",
            "Referer": "https://speechify.com/",
            "Sec-GPC": "1",
            "X-Speechify-Client": "EmbeddableSpeechify",
            "X-Speechify-Client-Version": "0.1.301"
        }
        self.session.timeout = self.timeout
        self.session.headers.update(self.headers)

    def get_client_voices(self) -> list[list[str]]:
        url = f"{self.base_url}/v1/synthesis/client-voices"
        response = self.session.get(url)
        data = response.json()["config"]["onboarding"]["selectableVoices"]
        headers = ("displayName", "name", "gender", "engine", "language")
        voice_info_list: list[list[str]] = []
        for items in data.values():
            voice_info_list.extend([[voice_data.get(value) for value in headers] for voice_data in items])
        return voice_info_list

    def text_to_mp3(self, text: str, voice_name: str, voice_engine: str, lang: str) -> bytes:
        url = f"{self.base_url}/generateAudioFiles"
        payload = {
            "audioFormat": "mp3",
            "paragraphChunks": [text],
            "voiceParams": {
                "name": voice_name,
                "engine": voice_engine,
                "languageCode": lang
            }
        }
        response = self.session.post(url, json=payload)
        data = response.json()
        audio_stream_bytes: bytes = base64.b64decode(data["audioStream"])
        return audio_stream_bytes


speechify_api = SpeechifyAPI()


def text_to_speech(text: str, filename: str, voice_name: str, voice_engine: str, lang: str):
    try:
        audio_stream_bytes: bytes = speechify_api.text_to_mp3(text, voice_name, voice_engine, lang)
        interrupted = False
        while True:
            try:
                with open(filename, "wb") as fp:
                    fp.write(audio_stream_bytes)
            except KeyboardInterrupt:
                interrupted = True
                continue
            break
        if interrupted:
            raise KeyboardInterrupt()
    except KeyboardInterrupt:
        raise
    except:
        traceback.print_exc()
        return False
    return True


def main(voice_name: str, voice_engine: str, lang: str, restart: bool = False):
    main_dir = r'../'
    images_dir = os.path.join(main_dir, 'images')
    voice_dir = os.path.join(main_dir, 'voice')
    try:
        os.mkdir(voice_dir)
    except:
        pass
    if restart:
        for fsobj in list(os.listdir(voice_dir)):
            full_path_to_fsobj = os.path.join(voice_dir, fsobj)
            if os.path.isdir(full_path_to_fsobj):
                shutil.rmtree(full_path_to_fsobj)
            elif full_path_to_fsobj.endswith('mp3'):
                os.remove(full_path_to_fsobj)
    files = glob.glob(f'{images_dir}\\**\\*.jpg', recursive=True)
    tasks = [['Hello', voice_dir + '\\' + 'Hello' + '.mp3']]
    all_images_filenames_wo_ext = set()
    for file in files:
        if 'time_limit' in file:
            continue
        text = os.path.basename(file).replace('.jpg', '')
        tasks.append([text, voice_dir + '\\' + text + '.mp3'])
        all_images_filenames_wo_ext.add(text)
    tasks.sort(key=lambda x: x[0])
    k = str(len(str(len(tasks))))
    for n, (text, dest_file) in enumerate(tasks, 1):
        if not restart and os.path.exists(dest_file):
            continue
        while not text_to_speech(text, dest_file, voice_name, voice_engine, lang):
            time.sleep(1)
        time.sleep(1)
        print(('{0:0' + k + '}/{1:0' + k + '}. {2}').format(n, len(tasks), text))
    files = glob.glob(f'{voice_dir}\\**\\*.mp3', recursive=True)
    all_voice_filenames_wo_ext = set()
    for file in files:
        text = os.path.basename(file).replace('.mp3', '')
        if text == 'Hello':
            continue
        all_voice_filenames_wo_ext.add(text)
    print(f'Remaining images: {all_images_filenames_wo_ext - all_voice_filenames_wo_ext}')
    print(f'Remaining voice files: {all_voice_filenames_wo_ext - all_images_filenames_wo_ext}')


if __name__ == "__main__":
    main("nate", "speechify", "en-US", False)
