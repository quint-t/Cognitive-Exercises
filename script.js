Array.prototype.insert = function (index, ...items) {
    this.splice(index, 0, ...items);
};

Array.prototype.pop = function (index = -1) {
    return this.splice(index < 0 ? this.length + index : index, 1)[0];
};

Array.prototype.sum = function () {
    return this.reduce(function (a, b) { return a + b; }, 0);
};

Array.prototype.sliceExt = function (start = null, end = null, step = null) {
    if (this.length === 0) {
        return [];
    }

    // start
    if (start == null) {
        start = 0;
    }
    else if (start < 0) {
        start = this.length + start;
    }
    start = Math.min(this.length - 1, Math.max(0, start));

    // end
    if (end == null) {
        end = this.length;
    }
    else if (end < 0) {
        end = this.length + end;
    }
    end = Math.min(this.length, Math.max(0, end));

    // step
    if (step == null) {
        step = 1;
    }
    let r = [];
    if (start < end && step > 0) {
        for (let i = start; i < end; i += step) {
            r.push(this[i]);
        }
    }
    else if (start > end && step < 0) {
        for (let i = start; i > end; i += step) {
            r.push(this[i]);
        }
    }
    return r;
}

function capitalize(string) {
    if ((typeof string === 'string' || string instanceof String) && string.length >= 1) {
        return string[0].toUpperCase() + string.slice(1);
    }
    return '';
}

function getVoices() {
    let i = 0;
    let voices = [];
    for (let voice of window.speechSynthesis.getVoices()) {
        if (voice.lang.toLowerCase().startsWith('en')) {
            let name = voice.name;
            if (name.toLowerCase().startsWith('microsoft')) {
                let splitted = name.split(' ');
                if (splitted.length >= 2) {
                    name = splitted[1];
                }
            }
            name = name.slice(0, 50);
            voices.push([i, voice.lang, name]);
        }
        ++i;
    }
    return voices;
}

function speak(text, voice_index) {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = window.speechSynthesis.getVoices()[voice_index];
    window.speechSynthesis.speak(utterThis);
}

function initGui() {
    state0();
}

function addWidget(widget) {
    getMain().appendChild(widget);
}

function clearWidgets() {
    getMain().textContent = "";
}

function getMain() {
    return document.getElementById("main");
}

function loadScores() {
    let defScores = {
        "ce_st1": 0,
        "ce_st2": 0,
        "ce_st3": 0,
        "ce_st4": 0
    };
    let scores = {};
    Object.keys(defScores).forEach((st) => {
        let tmp = localStorage.getItem(st);
        if (tmp != null) {
            scores[st] = parseInt(tmp);
        }
        else {
            scores[st] = defScores[st];
        }
    });
    return scores;
}

function loadHistory() {
    let history = localStorage.getItem('ce_history');
    if (history == null) {
        return [];
    }
    return JSON.parse(history);
}

function loadSettings() {
    let defParameters = {
        "ce_state1_active_template": "Default",
        "ce_state1_templates": "",
        "ce_state1_wrap": combo_enable_disable.Enable,
        "ce_state1_font_size": 16,
        "ce_state1_words_dictionary": combo_state1_words_dictionary.Wordsmyth,
        "ce_state1_voice_index_default": 0,

        "ce_st1_auto_mode": 60,
        "ce_st1_min_max_n": 0,
        "ce_st1_image_to_word": combo_enable_disable.Enable,
        "ce_st1_word_to_image": combo_enable_disable.Enable,
        "ce_st1_audio_to_word": combo_enable_disable.Enable,
        "ce_st1_audio_to_image": combo_enable_disable.Enable,
        "ce_st1_voice_to_word": combo_enable_disable.Enable,
        "ce_st1_voice_to_image": combo_enable_disable.Enable,
        "ce_st1_voice_index": -2,
        "ce_st1_image_voice_word_to_category": combo_enable_only_disable.Disable,
        "ce_st1_image_voice_random_task_each_time": combo_enable_disable.Enable,
        "ce_st1_image_voice_show_trial_time_limit": '0.0',
        "ce_st1_image_voice_answer_trial_time_limit": '0.0',
        "ce_st1_image_voice_hard_mode": combo_enable_disable.Disable,
        "ce_st1_image_voice_options": 4,
        "ce_st1_image_voice_insects_category": combo_enable_somewhat_disable.Somewhat,
        "ce_st1_image_voice_halloween_category": combo_enable_somewhat_disable.Enable,
        "ce_st1_image_voice_baby_category": combo_enable_somewhat_disable.Somewhat,
        "ce_st1_image_voice_family_members_category": combo_enable_somewhat_disable.Enable,
        "ce_st1_image_voice_holidays_category": combo_enable_disable.Enable,
        "ce_st1_image_voice_body_category": combo_enable_disable.Enable,
        "ce_st1_word_to_word": combo_enable_disable.Enable,
        "ce_st1_meaning_to_word": combo_enable_disable.Enable,
        "ce_st1_word_to_synonym": combo_enable_disable.Enable,
        "ce_st1_word_to_antonym": combo_enable_disable.Enable,
        "ce_st1_word_to_similar_word": combo_enable_disable.Enable,
        "ce_st1_find_word_in_sentence": combo_enable_disable.Enable,
        "ce_st1_word_random_task_each_time": combo_enable_disable.Enable,
        "ce_st1_word_show_trial_time_limit": '0.0',
        "ce_st1_word_answer_trial_time_limit": '0.0',
        "ce_st1_word_hard_mode": combo_enable_disable.Disable,
        "ce_st1_word_options": 4,

        "ce_st2_auto_mode": 5,
        "ce_st2_boxes": 2,
        "ce_st2_operations": 1,
        "ce_st2_min_max_operations": "1-5",
        "ce_st2_min_max_number": "1-5",

        "ce_state3_active_template": "Default",
        "ce_state3_templates": "",
        "ce_state3_wrap": combo_enable_disable.Enable,
        "ce_state3_font_size": 16,
        "ce_st3_auto_mode": 3,
        "ce_st3_current_number_of_statements": 4,
        "ce_st3_current_level": 1,
        "ce_st3_min_max_number_of_statements": "4-12",
        "ce_st3_min_max_level": "1-7",
        "ce_st3_max_solutions": 1,
        "ce_st3_show_puzzle_time_limit": '0.0',
        "ce_st3_answer_puzzle_time_limit": '0.0',

        "ce_state4_active_template": "Default",
        "ce_state4_templates": "",
        "ce_state4_wrap": combo_enable_disable.Enable,
        "ce_state4_font_size": 16,
        "ce_st4_auto_mode": 2,
        "ce_st4_current_attributes": 2,
        "ce_st4_current_objects": 3,
        "ce_st4_current_level": 1,
        "ce_st4_min_max_attributes": "2-5",
        "ce_st4_min_max_objects": "3-5",
        "ce_st4_min_max_level": "1-20",
        "ce_st4_hard_mode": combo_enable_disable.Disable,
        "ce_st4_max_seconds_to_wait": 10,
        "ce_st4_max_solutions": 1,
        "ce_st4_show_puzzle_time_limit": '0.0',
        "ce_st4_answer_puzzle_time_limit": '0.0',
    };
    let parameters = {};
    Object.keys(defParameters).forEach((param) => {
        let tmp = localStorage.getItem(param);
        if (tmp != null) {
            parameters[param] = tmp;
        }
        else {
            parameters[param] = defParameters[param];
        }
    });
    return parameters;
}

function setSetting(key, value) {
    localStorage.setItem(key, value);
    settings[key] = localStorage.getItem(key);
}

function getScoredText(text, st = null) {
    st = ((st == null) ? state : st);
    if (st === 1 || st === 2 || st === 3 || st === 4) {
        let score = scores['ce_st' + st];
        return '[' + score + '] ' + text + ' [' + score + ']';
    }
    return 'Enter';
}

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function checkAnswer(inputBoxValue) {
    if (inputBoxValue !== '') {
        currentGenerator.next(inputBoxValue);
    }
    let enterButton = document.getElementById('enterButton');
    if (enterButton != null) {
        enterButton.innerHTML = getScoredText('Enter');
    }
}

function toIntOrIntRange(s, min = null, max = null) {
    let values = ('' + s);
    values = values.split('-');
    if (values.length === 2) {
        let a = Number(values[0]);
        let b = Number(values[1]);
        if (Number.isFinite(a) && Number.isFinite(b) && a <= b &&
            (min == null || min != null && min <= a) &&
            (max == null || max != null && b <= max)) {
            return [a, b];
        }
    }
    else if (values.length == 1) {
        let t = Number(values[0]);
        if (Number.isFinite(t) &&
            (min == null || min != null && min <= t) &&
            (max == null || max != null && t <= max)) {
            return [t];
        }
    }
    return null;
}

function calculate_factorial(num) {
    let rval = 1;
    let i;
    for (i = 2; i <= num; i += 1) {
        rval = rval * i;
    }
    return rval;
}

function calculate_permutations(n, k) {
    let p = calculate_factorial(n);
    let v = calculate_factorial(n - k);
    return p / v;
}

function randomShuffle(unshuffled) {
    let shuffled = unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    return shuffled;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(unshuffled) {
    return unshuffled[randomInt(0, unshuffled.length - 1)];
}

function replaceTags(str, replace_string = '') {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replaceAll(/(<([^>]+)>)+/ig, replace_string);
}

function stateN_defaults(st) {
    let storageCopy = Object.assign({}, localStorage);
    Object.keys(storageCopy).forEach((x) => {
        if (x.startsWith(st + '_')) {
            localStorage.removeItem(x);
        }
    });
    if (state !== -1) {
        settings = loadSettings();
    }
}

function stateN_clear_score(st) {
    if (Array.isArray(st)) {
        st.forEach((x) => {
            localStorage.removeItem(x);
        });
    }
    else {
        localStorage.removeItem(st);
    }
    if (state !== -1) {
        scores = loadScores();
        state0();
    }
}

function* permutationsGenerator(permutation, length = null) {
    let pool = Array.from(permutation);
    let n = pool.length;
    length = isInt(length) && length > 0 ? length : n;
    if (length > n) {
        return;
    }
    let indices = range(0, n);
    let cycles = range(n, n - length, -1);
    yield indices.slice(0, length).map((i) => pool[i]);
    let tmp_list = range(0, length).reverse();
    while (n > 0) {
        let break_condition = false;
        for (let i of tmp_list) {
            cycles[i] -= 1;
            if (cycles[i] === 0) {
                let x1 = indices.slice(i + 1, indices.length);
                let x2 = indices.slice(i, i + 1);
                indices = indices.slice(0, i).concat(x1).concat(x2);
                cycles[i] = n - i;
            }
            else {
                let j = cycles[i];
                j = (j === 0) ? 0 : indices.length - j;
                let tmp = indices[i];
                indices[i] = indices[j];
                indices[j] = tmp;
                yield indices.slice(0, length).map((i) => pool[i]);
                break_condition = true;
                break;
            }
        }
        if (!break_condition) {
            return;
        }
    }
}

function* wordsGenerator(alphabet, length) {
    alphabet = randomShuffle([...alphabet]);
    if (length <= 2) {
        let generator = permutationsGenerator(alphabet, length);
        let n = 1000;
        while (true) {
            let i = 0;
            let array = [];
            for (let x of generator) {
                array.push(x.join(''));
                if (++i >= n) {
                    break;
                }
            }
            if (array.length === 0) {
                break;
            }
            array = randomShuffle(array);
            for (let x of array) {
                yield (x);
            }
        }
    }
    else {
        let generated = [];
        let n = calculate_permutations(alphabet.length, length);
        while (generated.length < n) {
            let word = randomShuffle(alphabet).slice(0, length).join('');
            while (generated.includes(word)) {
                word = randomShuffle(alphabet).slice(0, length).join('');
            }
            generated.push(word);
            yield (word);
        }
    }
    return null;
}

function* wordsGetter(words) {
    for (let w of randomShuffle(words)) {
        yield (w);
    }
    return null;
}

function imageToFileUrl(category1, category2, filename) {
    return "images/" + category1 + '/' + category2 + '/' + filename + ".jpg";
}

function* imageGetter(dictionary, options, hard_mode, not_item_checker, not_variants_checker) {
    let list = [];
    for (const [category1, val1] of Object.entries(dictionary)) {
        for (const [category2, val2] of Object.entries(val1)) {
            for (const image of val2) {
                let filename = '';
                let title = '';
                if (Array.isArray(image)) {
                    filename = image[0];
                    title = image[1];
                }
                else {
                    filename = title = image;
                }
                if (not_item_checker(category1, category2, title)) {
                    continue;
                }
                let real_filename = imageToFileUrl(category1, category2, filename);
                list.push([category1, category2, real_filename, title, [[category1, category2, real_filename, title]]]);
            }
        }
    }
    for (let w1 of randomShuffle(list)) {
        if (hard_mode) {
            for (let w2 of randomShuffle(list)) {
                if (w1[w1.length - 1].length >= options) {
                    break;
                }
                if (w1[0] == w2[0] && w1[1] == w2[1] && w1[2] != w2[2] &&
                    w1[3].toLowerCase().includes(w2[3].toLowerCase()) === false &&
                    w2[3].toLowerCase().includes(w1[3].toLowerCase()) === false &&
                    not_variants_checker(w1[0], w1[1], w1[3], w2[0], w2[1], w2[3]) === false) {
                    w1[w1.length - 1].push([w2[0], w2[1], w2[2], w2[3]]);
                }
            }
        }
        for (let w2 of randomShuffle(list)) {
            if (w1[w1.length - 1].length >= options) {
                break;
            }
            if (w1[0] != w2[0] && w1[1] != w2[1] &&
                w1[3].toLowerCase().includes(w2[3].toLowerCase()) === false &&
                w2[3].toLowerCase().includes(w1[3].toLowerCase()) === false &&
                not_variants_checker(w1[0], w1[1], w1[3], w2[0], w2[1], w2[3]) === false) {
                w1[w1.length - 1].push([w2[0], w2[1], w2[2], w2[3]]);
            }
        }
        for (let w2 of randomShuffle(list)) {
            if (w1[w1.length - 1].length >= options) {
                break;
            }
            if (w1[0] == w2[0] && w1[1] == w2[1] && w1[2] != w2[2] &&
                w1[3].toLowerCase().includes(w2[3].toLowerCase()) === false &&
                w2[3].toLowerCase().includes(w1[3].toLowerCase()) === false &&
                not_variants_checker(w1[0], w1[1], w1[3], w2[0], w2[1], w2[3]) === false) {
                w1[w1.length - 1].push([w2[0], w2[1], w2[2], w2[3]]);
            }
        }
    }
    for (let w of randomShuffle(list)) {
        yield (w);
    }
    return null;
}

function download_settings(event) {
    let storageCopy = Object.assign({}, localStorage);
    let storageData = {};
    Object.keys(storageCopy).forEach((x) => {
        if (x.startsWith('CE_') || x.startsWith('ce_')) {
            storageData[x] = storageCopy[x];
        }
    });
    let data = Object.entries(storageData);
    let blob = new Blob([JSON.stringify(data)],{
        type: "text"
    });
    let element = document.createElement('a');
    element.style.display = "none";
    element.setAttribute("href", URL.createObjectURL(blob));
    let datetime_string = getStrDateTime().replaceAll(':', '.').replaceAll(' ', '_');
    element.setAttribute("download", `${datetime_string}_Cognitive-Exercises.json`);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function upload_settings(event) {
    let element = document.createElement('input');
    element.id = 'file_upload';
    element.type = 'file';
    element.onchange = function (event) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            let f = event.target.files[0];
            if (f) {
                let r = new FileReader;
                r.addEventListener("load", (function(event) {
                    let json_parsed = JSON.parse(event.target.result);
                    for (const kv of json_parsed) {
                        let k = kv[0], v = kv[1];
                        localStorage.setItem(k, v);
                    }
                    location.reload();
                }));
                r.readAsText(f);
            }
        } else {
            alert("This functionality not supported by your browser.")
        }
    }
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function textToLines(text, n_symbols_per_line, indent = 0, pre_indent = true, preserve_endlines = true) {
    let words = text.split(' '), new_words = [];
    for (let w of words) {
        let i = 0;
        for (let sw of w.split('\n')) {
            if (preserve_endlines && i >= 1) {
                new_words.push(null);
            }
            new_words.push(sw);
            i += 1;
        }
    }
    words = new_words;
    let current_line = '', new_lines = [], indent_str = '';
    for (let i = 0; i < indent; ++i) {
        indent_str = indent_str.concat(' ');
    }
    for (let i = 0; i < words.length; ++i) {
        if (words[i] == null) {
            new_lines.push(indent_str.concat(current_line));
            current_line = '';
            continue;
        }
        let s = '';
        if (current_line.length > 0) {
            s = current_line.concat(' ');
        }
        s = s.concat(words[i]);
        if (indent_str.concat(s).length <= n_symbols_per_line) {
            current_line = s;
        }
        else {
            new_lines.push(indent_str.concat(current_line));
            current_line = words[i];
        }
    }
    if (current_line.length > 0) {
        new_lines.push(indent_str.concat(current_line));
    }
    let result = new_lines.join('\n');
    if (pre_indent == false) {
        result = result.replaceAll(/^\s+/g, '');
    }
    return result;
}

function* wordGetter(dictionary, options, hard_mode) {
    let list = [];
    for (const [word, params] of Object.entries(dictionary)) {
        list.push([word, params]);
    }
    let task_type = '', task_types = [], skip = false, all_max_depth = 8, hard_mode_max_depth = 3;
    while (true) {
        list = randomShuffle(list);
        for (let list_item of list) {
            let another_word_flag = false;
            while (true) {
                let task1 = '', task2 = '', expected = '', explanation = '', options_list = [];
                let word = list_item[0];
                let definition = randomChoice(list_item[1]);
                let part_of_speech = definition[0];
                let meaning = definition[1];
                let example = definition[2];
                let synonyms = definition[3];
                let antonyms = definition[4];
                let similar_words = definition[5];
                task_type = skip ? task_type : (yield 'task');
                skip = false;
                if (Array.isArray(task_type)) {
                    let obj = task_type;
                    task_types = randomShuffle([...obj[0]]);
                    task_type = task_types[0];
                    task_types = task_types.slice(1);
                    word = obj[1];
                    definition = obj[2];
                    part_of_speech = definition[0];
                    meaning = definition[1];
                    example = definition[2];
                    synonyms = definition[3];
                    antonyms = definition[4];
                    similar_words = definition[5];
                    another_word_flag = true;
                }
                else {
                    another_word_flag = false;
                }
                let all_synonyms = new Map();
                let all_antonyms = new Map();
                let all_similar_words = new Map();
                let all_x_to_explanation = new Map();
                let q = [[word, definition, '', 0]];
                while (q.length > 0) {
                    let [w, w_definition, w_type, depth] = q.pop(0);
                    if (w_type == 'ant') {
                        if (all_antonyms.has(w)) {
                            continue;
                        }
                        all_antonyms.set(w, depth);
                    }
                    else if (w_type == 'syn') {
                        if (all_synonyms.has(w)) {
                            continue;
                        }
                        all_synonyms.set(w, depth);
                    }
                    else if (w_type == 'sim') {
                        if (all_similar_words.has(w)) {
                            continue;
                        }
                        all_similar_words.set(w, depth);
                    }
                    let synonyms_for_x = [];
                    let antonyms_for_x = [];
                    let similar_words_for_x = [];
                    if (dictionary[w]) {
                        for (let desa of dictionary[w]) {
                            desa[3].forEach((item) => {
                                let t_explanation = '', t_desa = desa;
                                if (w_type == 'syn' && dictionary[item]) {
                                    for (let t of dictionary[item]) {
                                        if (t[3].includes(w)) {
                                            t_explanation = t[1];
                                            t_desa = t;
                                        }
                                    }
                                }
                                if ((w == word) || t_explanation.length > 0) {
                                    synonyms_for_x.push([item, t_desa, depth + (desa != w_definition)]);
                                    if (depth <= hard_mode_max_depth && t_explanation.length > 0) {
                                        all_x_to_explanation.set(item, t_explanation);
                                    }
                                }
                            });
                            desa[4].forEach((item) => {
                                let t_explanation = '', t_desa = desa;
                                if (w_type == 'ant' && dictionary[item]) {
                                    for (let t of dictionary[item]) {
                                        if (t[4].includes(w)) {
                                            t_explanation = t[1];
                                            t_desa = t;
                                        }
                                    }
                                }
                                if ((w == word) || t_explanation.length > 0) {
                                    antonyms_for_x.push([item, t_desa, depth + (desa != w_definition)]);
                                    if (depth <= hard_mode_max_depth && t_explanation.length > 0) {
                                        all_x_to_explanation.set(item, t_explanation);
                                    }
                                }
                            });
                            desa[5].forEach((item) => {
                                let t_explanation = '', t_desa = desa;
                                if (w_type == 'sim' && dictionary[item]) {
                                    for (let t of dictionary[item]) {
                                        if (t[5].includes(w)) {
                                            t_explanation = t[1];
                                            t_desa = t;
                                        }
                                    }
                                }
                                if ((w == word) || t_explanation.length > 0) {
                                    similar_words_for_x.push([item, t_desa, depth + (desa != w_definition)]);
                                    if (depth <= hard_mode_max_depth && t_explanation.length > 0) {
                                        all_x_to_explanation.set(item, t_explanation);
                                    }
                                }
                            });
                        }
                    }
                    for (let [syn, desa, new_depth] of synonyms_for_x) {
                        new_depth += 1;
                        if (new_depth >= all_max_depth) {
                            continue;
                        }
                        q.push([syn, desa, 'syn', new_depth]);
                    }
                    for (let [ant, desa, new_depth] of antonyms_for_x) {
                        new_depth += 1;
                        if (new_depth >= all_max_depth) {
                            continue;
                        }
                        q.push([ant, desa, w_type == 'ant' ? 'syn' : 'ant', new_depth]);
                    }
                    for (let [sim, desa, new_depth] of similar_words_for_x) {
                        new_depth += 1;
                        if (new_depth >= all_max_depth) {
                            continue;
                        }
                        q.push([sim, desa, 'sim', new_depth]);
                    }
                    q.sort(function (a, b) { return a[2] - b[2]; });
                }
                for (const [w, params] of Object.entries(dictionary)) {
                    for (const desa of params) {
                        if (desa[3].includes(word) && all_synonyms.has(w) == false) {
                            all_synonyms.set(w, hard_mode_max_depth + 1);
                            for (let t of desa[3]) {
                                if (all_synonyms.has(t) == false) {
                                    all_synonyms.set(t, hard_mode_max_depth + 1);
                                }
                            }
                            for (let t of desa[4]) {
                                if (all_antonyms.has(t) == false) {
                                    all_antonyms.set(t, hard_mode_max_depth + 1);
                                }
                            }
                            for (let t of desa[5]) {
                                if (all_similar_words.has(t) == false) {
                                    all_similar_words.set(t, hard_mode_max_depth + 1);
                                }
                            }
                        }
                        if (desa[4].includes(word) && all_antonyms.has(w) == false) {
                            all_antonyms.set(w, hard_mode_max_depth + 1);
                            for (let t of desa[3]) {
                                if (all_antonyms.has(t) == false) {
                                    all_antonyms.set(t, hard_mode_max_depth + 1);
                                }
                            }
                            for (let t of desa[4]) {
                                if (all_synonyms.has(t) == false) {
                                    all_synonyms.set(t, hard_mode_max_depth + 1);
                                }
                            }
                            for (let t of desa[5]) {
                                if (all_antonyms.has(t) == false) {
                                    all_antonyms.set(t, hard_mode_max_depth + 1);
                                }
                            }
                        }
                        if (desa[5].includes(word) && all_similar_words.has(w) == false) {
                            all_similar_words.set(w, hard_mode_max_depth + 1);
                            for (let t of desa[3]) {
                                if (all_synonyms.has(t) == false) {
                                    all_synonyms.set(t, hard_mode_max_depth + 1);
                                }
                            }
                            for (let t of desa[4]) {
                                if (all_antonyms.has(t) == false) {
                                    all_antonyms.set(t, hard_mode_max_depth + 1);
                                }
                            }
                            for (let t of desa[5]) {
                                if (all_similar_words.has(t) == false) {
                                    all_similar_words.set(t, hard_mode_max_depth + 1);
                                }
                            }
                        }
                    }
                }
                for (let [synonym, depth] of all_synonyms.entries()) {
                    if (depth <= hard_mode_max_depth && all_antonyms.has(synonym)) {
                        all_synonyms.set(synonym, hard_mode_max_depth + 1);
                        all_antonyms.set(synonym, hard_mode_max_depth + 1);
                    }
                }
                for (let [antonym, depth] of all_antonyms.entries()) {
                    if (depth <= hard_mode_max_depth && all_synonyms.has(antonym)) {
                        all_synonyms.set(antonym, hard_mode_max_depth + 1);
                        all_antonyms.set(antonym, hard_mode_max_depth + 1);
                    }
                    if (depth <= hard_mode_max_depth && all_similar_words.has(antonym)) {
                        all_antonyms.set(antonym, hard_mode_max_depth + 1);
                        all_similar_words.set(antonym, hard_mode_max_depth + 1);
                    }
                }
                all_synonyms.delete(word);
                all_antonyms.delete(word);
                all_similar_words.delete(word);
                if (task_type == 'word-to-word') {
                    task1 = 'Next word: ' + capitalize(word);
                    if (part_of_speech.length > 0) {
                        task1 += ' (' + part_of_speech + ')';
                    }
                    task1 += meaning ? ('\nMeaning of the word:\n ' + meaning) : "";
                    task2 = 'Choose word:';
                    expected = word;
                    let sd_list = [];
                    for (let [synonym, depth] of all_synonyms.entries()) {
                        if (depth == 1 || hard_mode && depth <= hard_mode_max_depth) {
                            sd_list.push([synonym, depth]);
                        }
                    }
                    sd_list = randomShuffle(sd_list);
                    for (let [synonym, depth] of sd_list) {
                        options_list.push(synonym);
                    }
                    for (let x of randomShuffle(list)) {
                        if (options_list.length >= options) {
                            break;
                        }
                        if (x[0] != word && all_antonyms.has(x[0]) == false) {
                            options_list.push(x[0]);
                        }
                    }
                }
                else if (task_type == 'meaning-to-word' && meaning.length > 0) {
                    task1 = 'Next meaning of the word:\n ' + meaning;
                    task2 = 'Word';
                    if (part_of_speech.length > 0) {
                        task2 += ' (' + part_of_speech + ')';
                    }
                    task2 += ':';
                    expected = word;
                    explanation = meaning;
                    let ad_list = [];
                    for (let [antonym, depth] of all_antonyms.entries()) {
                        if (depth <= hard_mode_max_depth) {
                            ad_list.push([antonym, depth]);
                        }
                    }
                    ad_list = randomShuffle(ad_list);
                    for (let [antonym, depth] of ad_list) {
                        options_list.push(antonym);
                    }
                    for (let x of randomShuffle(list)) {
                        if (options_list.length >= options) {
                            break;
                        }
                        if (x[0] != word && all_synonyms.has(x[0]) == false && all_similar_words.has(x[0]) == false) {
                            options_list.push(x[0]);
                        }
                    }
                }
                else if (task_type == 'word-to-synonym' && synonyms.length > 0) {
                    expected = randomChoice(synonyms);
                    task1 = 'Next word: ' + capitalize(word);
                    if (part_of_speech.length > 0) {
                        task1 += ' (' + part_of_speech + ')';
                    }
                    task1 += '\nMeaning of the word:\n ' + meaning;
                    let sd_list = [];
                    for (let [synonym, depth] of all_synonyms.entries()) {
                        if (depth == 1 || hard_mode && depth <= hard_mode_max_depth) {
                            sd_list.push([synonym, depth]);
                        }
                    }
                    sd_list = randomShuffle(sd_list);
                    for (let [synonym, depth] of sd_list) {
                        expected = synonym;
                        break;
                    }
                    if (synonyms.includes(expected) == false) {
                        task2 = 'Choose a parasynonym for the word:';
                    }
                    else{
                        task2 = 'Choose a synonym for the word:';
                    }
                    let ad_list = [];
                    for (let [antonym, depth] of all_antonyms.entries()) {
                        if (depth <= hard_mode_max_depth) {
                            ad_list.push([antonym, depth]);
                        }
                    }
                    ad_list = randomShuffle(ad_list);
                    for (let [antonym, depth] of ad_list) {
                        if (antonym[0].slice(0, 3) == expected.slice(0, 3)) {
                            continue;
                        }
                        options_list.push(antonym);
                    }
                    for (let x of randomShuffle(list)) {
                        if (options_list.length >= options) {
                            break;
                        }
                        if (x[0].slice(0, 3) == expected.slice(0, 3)) {
                            continue;
                        }
                        if (x[0] != word && all_synonyms.has(x[0]) == false && all_similar_words.has(x[0]) == false) {
                            options_list.push(x[0]);
                        }
                    }
                    explanation = capitalize(word) + ' - ' + meaning;
                    if (all_x_to_explanation.get(expected)) {
                        explanation = (capitalize(expected) + ' - ' + all_x_to_explanation.get(expected) + '\n').concat(explanation);
                    }
                    else if (dictionary[expected]) {
                        let expected_meaning = '';
                        for (let d of dictionary[expected]) {
                            if (d[3].includes(word)) {
                                expected_meaning = d[1];
                            }
                        }
                        if (expected_meaning.length == 0) {
                            for (let d of dictionary[expected]) {
                                if (d[5].includes(word)) {
                                    expected_meaning = d[1];
                                }
                            }
                        }
                        if (expected_meaning.length > 0) {
                            explanation = (capitalize(expected) + ' - ' + expected_meaning + '\n').concat(explanation);
                        }
                    }
                }
                else if (task_type == 'word-to-antonym' && antonyms.length > 0) {
                    expected = randomChoice(antonyms);
                    task1 = 'Next word: ' + capitalize(word);
                    if (part_of_speech.length > 0) {
                        task1 += ' (' + part_of_speech + ')';
                    }
                    task1 += '\nMeaning of the word:\n ' + meaning;
                    let ad_list = [];
                    for (let [antonym, depth] of all_antonyms.entries()) {
                        if (depth == 1 || hard_mode && depth <= hard_mode_max_depth) {
                            ad_list.push([antonym, depth]);
                        }
                    }
                    ad_list = randomShuffle(ad_list);
                    for (let [antonym, depth] of ad_list) {
                        expected = antonym;
                        break;
                    }
                    if (antonyms.includes(expected) == false) {
                        task2 = 'Choose a paraantonym for the word:';
                    }
                    else{
                        task2 = 'Choose an antonym for the word:';
                    }
                    let sd_list = [];
                    for (let [synonym, depth] of all_synonyms.entries()) {
                        if (depth <= hard_mode_max_depth) {
                            sd_list.push([synonym, depth]);
                        }
                    }
                    sd_list = randomShuffle(sd_list);
                    for (let [synonym, depth] of sd_list) {
                        if (synonym.slice(0, 3) == expected.slice(0, 3)) {
                            continue;
                        }
                        options_list.push(synonym);
                    }
                    for (let x of randomShuffle(list)) {
                        if (options_list.length >= options) {
                            break;
                        }
                        if (x[0].slice(0, 3) == expected.slice(0, 3)) {
                            continue;
                        }
                        if (x[0] != word && all_antonyms.has(x[0]) == false && all_similar_words.has(x[0]) == false) {
                            options_list.push(x[0]);
                        }
                    }
                    explanation = capitalize(word) + ' - ' + meaning;
                    if (all_x_to_explanation.get(expected)) {
                        explanation = (capitalize(expected) + ' - ' + all_x_to_explanation.get(expected) + '\n').concat(explanation);
                    }
                    else if (dictionary[expected]) {
                        let expected_meaning = '';
                        for (let d of dictionary[expected]) {
                            if (d[4].includes(word)) {
                                expected_meaning = d[1];
                            }
                        }
                        if (expected_meaning.length == 0) {
                            for (let d of dictionary[expected]) {
                                if (d[5].includes(word)) {
                                    expected_meaning = d[1];
                                }
                            }
                        }
                        if (expected_meaning.length > 0) {
                            explanation = (capitalize(expected) + ' - ' + expected_meaning + '\n').concat(explanation);
                        }
                    }
                }
                else if (task_type == 'word-to-similar-word' && similar_words.length > 0) {
                    expected = randomChoice(similar_words);
                    task1 = 'Next word: ' + capitalize(word);
                    if (part_of_speech.length > 0) {
                        task1 += ' (' + part_of_speech + ')';
                    }
                    task1 += '\nMeaning of the word:\n ' + meaning;
                    let sd_list = [];
                    for (let [similar_word, depth] of all_similar_words.entries()) {
                        if (depth == 1 || hard_mode && depth <= hard_mode_max_depth) {
                            sd_list.push([similar_word, depth]);
                        }
                    }
                    sd_list = randomShuffle(sd_list);
                    for (let [similar_word, depth] of sd_list) {
                        expected = similar_word;
                        break;
                    }
                    if (similar_words.includes(expected) == false) {
                        task2 = 'Choose a parasimilar word for the word:';
                    }
                    else{
                        task2 = 'Choose a similar word for the word:';
                    }
                    let ad_list = [];
                    for (let [antonym, depth] of all_antonyms.entries()) {
                        if (depth <= hard_mode_max_depth) {
                            ad_list.push([antonym, depth]);
                        }
                    }
                    ad_list = randomShuffle(ad_list);
                    for (let [antonym, depth] of ad_list) {
                        if (antonym.slice(0, 3) == expected.slice(0, 3)) {
                            continue;
                        }
                        options_list.push(antonym);
                    }
                    for (let x of randomShuffle(list)) {
                        if (options_list.length >= options) {
                            break;
                        }
                        if (x[0].slice(0, 3) == expected.slice(0, 3)) {
                            continue;
                        }
                        if (x[0] != word && all_synonyms.has(x[0]) == false && all_similar_words.has(x[0]) == false) {
                            options_list.push(x[0]);
                        }
                    }
                    explanation = capitalize(word) + ' - ' + meaning;
                    if (all_x_to_explanation.get(expected)) {
                        explanation = (capitalize(expected) + ' - ' + all_x_to_explanation.get(expected) + '\n').concat(explanation);
                    }
                    else if (dictionary[expected]) {
                        let expected_meaning = '';
                        for (let d of dictionary[expected]) {
                            if (d[5].includes(word)) {
                                expected_meaning = d[1];
                            }
                        }
                        if (expected_meaning.length == 0) {
                            for (let d of dictionary[expected]) {
                                if (d[3].includes(word)) {
                                    expected_meaning = d[1];
                                }
                            }
                        }
                        if (expected_meaning.length > 0) {
                            explanation = (capitalize(expected) + ' - ' + expected_meaning + '\n').concat(explanation);
                        }
                    }
                }
                else if (task_type == 'find-word-in-sentence' && example.length > 0) {
                    task1 = 'Next sentence:\n ' + example;
                    task2 = 'Choose word (' + part_of_speech + '):';
                    expected = word;
                    explanation = another_word_flag ? '' : example;
                    let example_splitted = example.toLowerCase().split(' ');
                    for (let x of randomShuffle(list)) {
                        if (options_list.length >= options) {
                            break;
                        }
                        if (example_splitted.some((t) => t.slice(0, 3) == x[0].slice(0, 3))) {
                            continue;
                        }
                        if (all_synonyms.has(x[0]) == false &&
                            all_antonyms.has(x[0]) == false &&
                            all_similar_words.has(x[0]) == false
                        ) {
                            options_list.push(x[0]);
                        }
                    }
                }
                if (expected == null || expected.length == 0) {
                    if (another_word_flag) {
                        task_type = [task_types, word, definition];
                        skip = true;
                        continue;
                    }
                    skip = true;
                    console.log(`${word} skipped; task = ${task_type}`);
                    break;
                }
                options_list = options_list.slice(0, options - 1);
                options_list.push(expected);
                let new_options_list = [];
                for (let x of options_list) {
                    new_options_list.push(capitalize(x));
                }
                options_list = new_options_list;
                if (options_list.length <= 1) {
                    if (another_word_flag) {
                        task_type = [task_types, word, definition];
                        skip = true;
                        continue;
                    }
                    skip = true;
                    console.log(`${word} skipped; task = ${task_type}`);
                    break;
                }
                let r = [[capitalize(word), task1, task2, capitalize(expected), explanation, options_list],
                         [word, definition], task_type];
                yield (r); // task_type, word, task1, task2, expected, explanation, options
                task_types = [];
                if (another_word_flag == false) {
                    break;
                }
            }
        }
    }
}

function range(start, stop, step = 1) {
    let a = [], b = start;
    if (step > 0) {
        while (b < stop) {
            a.push(b);
            b += step;
        }
    }
    else if (step < 0) {
        while (b > stop) {
            a.push(b);
            b += step;
        }
    }
    return a;
}

function appendText(taskArea, text, clearBefore = false, scrollTop = -1) {
    if (clearBefore) {
        taskArea.innerHTML = '';
    }
    taskArea.innerHTML += text;
    taskArea.style.height = 'auto';
    if (taskArea.style.whiteSpace == 'pre') {
        taskArea.style.height = (taskArea.scrollHeight + 20) + 'px';
    }
    else {
        taskArea.style.height = taskArea.scrollHeight + 'px';
    }
    if (scrollTop === -1) {
        taskArea.scrollTop = taskArea.scrollHeight;
    }
    else {
        taskArea.scrollTop = scrollTop;
    }
}

function addScore(st, n = 1) {
    localStorage.setItem(st, scores[st] += n);
}

function createInputElems(wrap = false) {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");
    let taskArea = document.createElement("textarea");
    taskArea.classList.add("taskArea");
    taskArea.readOnly = true;
    if (wrap == false) {
        taskArea.style.whiteSpace = 'pre';
    }
    else {
        taskArea.style.whiteSpace = 'pre-wrap';
    }
    taskDiv.style.display = 'inline-block';
    taskDiv.style.width = '350px';
    taskDiv.appendChild(taskArea);
    return [taskDiv, taskArea];
}

function createKeyboard(symbols, stateN, additionalButtons = null, endlBySymbols = null, buttonsClasses = null) {
    let inputDiv = document.createElement("div");
    inputDiv.id = "inputDiv";
    let inputBox = document.createElement("input");
    inputBox.id = "inputBox";
    inputBox.type = "text";
    inputBox.onkeydown = function (event) {
        if (event.code.toLowerCase() === "enter" || event.key === 13 || event.keyCode === 13 || event.which === 13) {
            checkAnswer(inputBox.value);
            inputBox.value = '';
        }
    };
    let keyboardDiv = document.createElement("div");
    keyboardDiv.id = "keyboardDiv";
    let eachButtonAction = function (event) {
        event = event.target;
        inputBox.value += event.innerHTML;
    };
    let enterButtonAction = function (event) {
        checkAnswer(inputBox.value);
        inputBox.value = '';
    };
    let backButtonAction = function (event) {
        if (confirm("Are you sure you want to go back?")) {
            stateN();
        }
    };
    let delButtonAction = function (event) {
        inputBox.value = inputBox.value.slice(0, -1);
    };
    let clearButtonAction = function (event) {
        inputBox.value = "";
    };
    [...symbols].forEach(symbol => {
        let button = createActionButton(symbol, eachButtonAction);
        button.classList.add("blackButton");
        button.classList.add("monospace");
        if (buttonsClasses != null && buttonsClasses[symbol] != undefined) {
            button.classList.add(...buttonsClasses[symbol]);
        }
        keyboardDiv.appendChild(button);
        if (endlBySymbols != null && endlBySymbols.indexOf(symbol) !== -1) {
            keyboardDiv.appendChild(document.createElement('br'));
        }
    });
    let additionalDiv = null;
    if (additionalButtons != null) {
        for (const key in additionalButtons) {
            const value = additionalButtons[key];
            let button = document.createElement('button');
            button.classList.add("blackButton");
            button.innerHTML = key;
            button.onmouseup = value;
            if (additionalDiv == null) {
                additionalDiv = document.createElement('div');
            }
            additionalDiv.appendChild(button);
        }
    }
    let hr = document.createElement("hr");
    hr.style.borderColor = 'gray';
    let enterButton = createActionButton(getScoredText('Enter'), enterButtonAction);
    let delButton = createActionButton("Delete", delButtonAction);
    let clearButton = createActionButton("Clear", clearButtonAction);
    let backButton = createActionButton("Back", backButtonAction);
    enterButton.id = "enterButton";
    enterButton.classList.add("blackButton");
    enterButton.classList.add("w60");
    delButton.classList.add("blackButton");
    delButton.classList.add("w20");
    clearButton.classList.add("blackButton");
    clearButton.classList.add("20");
    backButton.classList.add("blackButton");
    inputDiv.appendChild(inputBox);
    inputDiv.appendChild(keyboardDiv);
    inputDiv.appendChild(clearButton);
    inputDiv.appendChild(enterButton);
    inputDiv.appendChild(delButton);
    inputDiv.appendChild(hr);
    if (additionalDiv != null) {
        additionalDiv.prepend(backButton);
        inputDiv.appendChild(additionalDiv);
    }
    else {
        inputDiv.appendChild(backButton);
    }
    return inputDiv;
}

function createChooser(stateN, options, additionalButtons) {
    let inputDiv = document.createElement("div");
    inputDiv.id = "inputDiv";
    let chooserDiv = document.createElement("div");
    chooserDiv.id = "chooserDiv";
    let eachButtonAction = function (event) {
        setTimeout(function () {
            checkAnswer(event.target.innerHTML);
        }, 50);
    };
    for (let i = 0; i < options; ++i) {
        let button = document.createElement('button');
        button.classList.add("blackButton");
        button.classList.add("no-hover");
        button.innerHTML = '...';
        button.onmouseup = eachButtonAction;
        chooserDiv.appendChild(button);
    }

    let backButtonAction = function (event) {
        if (confirm("Are you sure you want to go back?")) {
            stateN();
        }
    };

    let imageDiv = document.createElement('div');
    imageDiv.id = 'imageDiv';
    let img = document.createElement('img');
    img.id = 'imgTask';
    imageDiv.appendChild(img);
    imageDiv.style.display = 'none';

    let audioDiv = document.createElement('div');
    audioDiv.id = 'audioDiv';
    let audioButton = document.createElement('button');
    audioButton.id = 'audioButton';
    audioButton.classList.add("blackButton");
    audioButton.classList.add("no-hover");
    audioButton.innerHTML = 'Play';
    audioButton.onmouseup = function () {
        let category1 = audioButton.category1;
        let category2 = audioButton.category2;
        let title = audioButton.title;
        st1_play(`${category1}/${category2}/${title}.mp3`);
    }
    audioButton.ondblclick = function () {
        alert(audioButton.title);
    }
    audioDiv.appendChild(audioButton);
    audioDiv.style.display = 'none';

    let voiceDiv = document.createElement('div');
    voiceDiv.id = 'voiceDiv';
    let voiceButton = document.createElement('button');
    voiceButton.id = 'voiceButton';
    voiceButton.classList.add("blackButton");
    voiceButton.classList.add("no-hover");
    voiceButton.innerHTML = 'Play';
    voiceButton.onmouseup = function () {
        let voice_index = parseInt(voiceButton.voice_index);
        if (isInt(voice_index) && voice_index !== -1) {
            st1_speak(voiceButton.voice_text, voiceButton.voice_index);
        }
    }
    voiceButton.ondblclick = function () {
        alert(voiceButton.voice_text);
    }
    voiceDiv.appendChild(voiceButton);
    voiceDiv.style.display = 'none';

    let showTrialTimerDiv = document.createElement('div');
    showTrialTimerDiv.id = 'showTrialTimerDiv';
    let showTrialTimerImg = document.createElement('img');
    showTrialTimerImg.id = 'showTrialTimerImg';
    showTrialTimerImg.src = "./images/time_limit.jpg";
    showTrialTimerImg.alt = "time limit";
    showTrialTimerImg.style.width = '350px';
    showTrialTimerDiv.appendChild(showTrialTimerImg);
    let showTrialTimerP = document.createElement('p');
    showTrialTimerP.id = 'showTrialTimerP';
    showTrialTimerP.style.margin = '5px';
    showTrialTimerDiv.appendChild(showTrialTimerP);
    showTrialTimerDiv.style.display = '';

    let answerTrialTimerDiv = document.createElement('div');
    answerTrialTimerDiv.id = 'answerTrialTimerDiv';
    let answerTrialTimerP = document.createElement('p');
    answerTrialTimerP.id = 'answerTrialTimerP';
    answerTrialTimerP.style.margin = '5px';
    answerTrialTimerDiv.appendChild(answerTrialTimerP);
    answerTrialTimerDiv.style.display = '';

    let additionalDiv = null;
    if (additionalButtons != null) {
        for (const key in additionalButtons) {
            const value = additionalButtons[key];
            let button = document.createElement('button');
            button.classList.add("blackButton");
            button.innerHTML = key;
            button.onmouseup = value;
            if (additionalDiv == null) {
                additionalDiv = document.createElement('div');
            }
            additionalDiv.appendChild(button);
        }
    }
    let hr = document.createElement("hr");
    hr.style.borderColor = 'gray';
    let backButton = createActionButton("Back", backButtonAction);
    backButton.classList.add("blackButton");
    inputDiv.appendChild(imageDiv);
    inputDiv.appendChild(audioDiv);
    inputDiv.appendChild(voiceDiv);
    inputDiv.appendChild(showTrialTimerDiv);
    inputDiv.appendChild(chooserDiv);
    inputDiv.appendChild(answerTrialTimerDiv);
    inputDiv.appendChild(hr);
    if (additionalDiv != null) {
        additionalDiv.prepend(backButton);
        inputDiv.appendChild(additionalDiv);
    }
    else {
        inputDiv.appendChild(backButton);
    }
    return inputDiv;
}

function updateChooser(options, images = false) {
    let chooserDiv = document.getElementById("chooserDiv");
    let children = chooserDiv.children;
    for (let i = 0, k = 0; i < children.length; i++) {
        if (children[i].nodeName == 'BUTTON') {
            if (images) {
                if (k < options.length &&
                    state1_check_for_dict(state1_images, options[k][0], options[k][1], options[k][3])) {
                    children[i].style.display = '';
                    children[i].style.color = '#ffffff00';
                    children[i].style.background = 'url("' + options[k][2] + '")';
                    children[i].style.backgroundSize = 'contain';
                    children[i].style.backgroundRepeat = 'no-repeat';
                    children[i].style.backgroundPosition = 'center center';
                    children[i].innerHTML = options[k][3];
                    children[i].style.width = '170px';
                    children[i].style.height = '170px';
                }
                else {
                    children[i].style.display = 'none';
                    children[i].style.color = '';
                    children[i].style.background = '';
                    children[i].style.backgroundSize = '';
                    children[i].style.backgroundRepeat = '';
                    children[i].style.backgroundPosition = '';
                    children[i].innerHTML = '-';
                    children[i].style.width = '';
                    children[i].style.height = '';
                }
            }
            else {
                children[i].style.color = '';
                children[i].style.background = '';
                children[i].style.backgroundSize = '';
                children[i].style.backgroundRepeat = '';
                children[i].style.backgroundPosition = '';
                children[i].innerHTML = (k < options.length) ? options[k] : '-';
                children[i].style.width = '';
                children[i].style.height = '';
                if (k < options.length) {
                    children[i].style.display = '';
                }
                else {
                    children[i].style.display = 'none';
                }
            }
            ++k;
        }
    }
}

function createTableOfSelects(stateN, additionalButtons = null) {
    let inputDiv = document.createElement("div");
    inputDiv.id = "inputDiv";
    let enterButtonAction = function (event) {
        let tableRows = document.getElementById('inputTable').rows;
        let answer = [];
        for (let i = 1; i < tableRows.length; i++) {
            let row = tableRows[i].cells;
            for (let j = 1, m = row.length; j < m; ++j) {
                answer.push(row[j].children[0].value);
            }
        }
        answer = answer.join('_');
        if (answer !== '') {
            updateTableOfSelects(currentGenerator.next(answer).value);
        }
        event.target.innerHTML = getScoredText('Enter');
    };
    let backButtonAction = function (event) {
        if (confirm("Are you sure you want to go back?")) {
            stateN();
        }
    };
    let table = document.createElement('table');
    table.id = 'inputTable';
    let tableDiv = document.createElement('div');
    tableDiv.appendChild(table);
    tableDiv.style.overflow = 'auto';
    tableDiv.style.whiteSpace = 'nowrap';
    let additionalDiv = null;
    if (additionalButtons != null) {
        for (const key in additionalButtons) {
            const value = additionalButtons[key];
            let button = document.createElement('button');
            button.classList.add("blackButton");
            button.innerHTML = key;
            button.onmouseup = value;
            if (additionalDiv == null) {
                additionalDiv = document.createElement('div');
            }
            additionalDiv.appendChild(button);
        }
    }
    let hr = document.createElement("hr");
    hr.style.borderColor = 'gray';
    let enterButton = createActionButton(getScoredText('Enter'), enterButtonAction);
    let backButton = createActionButton("Back", backButtonAction);
    enterButton.id = "enterButton";
    enterButton.classList.add("blackButton");
    enterButton.classList.add("w60");
    backButton.classList.add("blackButton");

    let showPuzzleTimerDiv = document.createElement('div');
    showPuzzleTimerDiv.id = 'showPuzzleTimerDiv';
    let showPuzzleTimerP = document.createElement('p');
    showPuzzleTimerP.id = 'showPuzzleTimerP';
    showPuzzleTimerP.style.margin = '5px';
    showPuzzleTimerDiv.appendChild(showPuzzleTimerP);
    showPuzzleTimerDiv.style.display = '';

    let answerPuzzleTimerDiv = document.createElement('div');
    answerPuzzleTimerDiv.id = 'answerPuzzleTimerDiv';
    let answerPuzzleTimerP = document.createElement('p');
    answerPuzzleTimerP.id = 'answerPuzzleTimerP';
    answerPuzzleTimerP.style.margin = '5px';
    answerPuzzleTimerDiv.appendChild(answerPuzzleTimerP);
    answerPuzzleTimerDiv.style.display = '';

    inputDiv.appendChild(showPuzzleTimerDiv);
    inputDiv.appendChild(tableDiv);
    inputDiv.appendChild(answerPuzzleTimerDiv);
    inputDiv.appendChild(enterButton);
    inputDiv.appendChild(hr);
    if (additionalDiv != null) {
        additionalDiv.prepend(backButton);
        inputDiv.appendChild(additionalDiv);
    }
    else {
        inputDiv.appendChild(backButton);
    }
    return inputDiv;
}

function updateTableOfSelects(cellValues) {
    let table = document.getElementById('inputTable');
    if (table != null && cellValues != null && cellValues.length > 0) {
        table.innerHTML = '';
        let headerRow = document.createElement('tr');
        cellValues[0].forEach((headerText) => {
            let headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });
        table.appendChild(headerRow);
        for (let i = 1; i < cellValues.length; i++) {
            let dataRow = document.createElement('tr');
            cellValues[i].forEach((cellValue) => {
                let dataCell = document.createElement('td');
                if (Array.isArray(cellValue)) {
                    let select = document.createElement('select');
                    select.classList.add("modern_select");
                    cellValue.forEach((option) => {
                        let optionElem = document.createElement('option');
                        optionElem.value = option;
                        optionElem.text = option;
                        select.appendChild(optionElem);
                    });
                    select.value = select.childNodes[0].value;
                    if (select.value == 'True') {
                        select.value = select.childNodes[1] ? select.childNodes[1].value : select.value;
                    }
                    dataCell.appendChild(select);
                }
                else {
                    let stringTag = document.createElement('p');
                    stringTag.innerHTML = cellValue.toString();
                    dataCell.appendChild(stringTag);
                }
                dataRow.appendChild(dataCell);
            });
            table.appendChild(dataRow);
        }
    }
}

function createParameters(parameters) {
    let table = document.createElement("table");
    parameters.forEach(item => {
        let firstElement = null;
        let secondElement = null;
        switch (item[2]) {
            case "template_choose_new": {
                firstElement = createTemplateChooser(item[0], item[3]);
                secondElement = createParameterActionButton(item[1], item[4]);
                secondElement.innerHTML = 'New';
                break;
            }
            case "template_save_delete": {
                firstElement = createParameterActionButton(item[0], item[3]);
                firstElement.innerHTML = 'Save';
                secondElement = createParameterActionButton(item[1], item[4]);
                secondElement.innerHTML = 'Delete';
                break;
            }
            case "buttons": {
                firstElement = createParameterActionButton(
                    item[0], item[3]);
                secondElement = createParameterActionButton(
                    item[1], item[4]);
                break;
            }
            case "range": {
                firstElement = document.createElement("p");
                firstElement.innerHTML = item[1];
                secondElement = createParameterRangeButton(item[0], item[1], item[3]);
                secondElement.id = item[0];
                break;
            }
            case "integer": {
                firstElement = document.createElement("p");
                firstElement.innerHTML = item[1];
                secondElement = createParameterIntegerButton(item[0], item[1], item[3]);
                secondElement.id = item[0];
                break;
            }
            case "float": {
                firstElement = document.createElement("p");
                firstElement.innerHTML = item[1];
                secondElement = createParameterFloatButton(item[0], item[1], item[3]);
                secondElement.id = item[0];
                break;
            }
            case "combobox": {
                firstElement = document.createElement("p");
                firstElement.innerHTML = item[1];
                secondElement = createParameterCombobox(item[0], item[3], item.length >= 5 ? item[4] : null);
                secondElement.id = item[0];
                secondElement.style.maxWidth = '135px';
                break;
            }
            case "text_button": {
                firstElement = document.createElement("input");
                firstElement.type = "text";
                firstElement.value = item[0];
                firstElement.classList.add('modern_select');
                secondElement = createParameterActionButton(null, item[3], firstElement);
                secondElement.innerHTML = item[1];
                break;
            }
            case "combobox_button": {
                firstElement = document.createElement("select");
                firstElement.classList.add('modern_select');
                for (let [value, text] of item[4]) {
                    let option = document.createElement("option");
                    option.value = value;
                    option.innerHTML = text;
                    firstElement.appendChild(option);
                    firstElement.value = value;
                }
                firstElement.style.maxWidth = '204px';
                secondElement = createParameterActionButton(null, item[3], firstElement);
                secondElement.innerHTML = item[1];
                break;
            }
            case "ce_st1_voice_combobox": {
                firstElement = document.createElement("p");
                firstElement.innerHTML = item[1];
                secondElement = createVoiceCombobox(item[0], function (value) {
                    let voice_index = parseInt(value);
                    if (voice_index !== -1 && voice_index !== -2) {
                        setSetting('ce_state1_voice_index_default', voice_index);
                    }
                    if (isInt(voice_index) && voice_index !== -1) {
                        st1_speak('Hello', voice_index);
                    }
                }, true);
                secondElement.id = item[0];
                secondElement.style.maxWidth = '135px';
                break;
            }
            case "hr": {
                firstElement = document.createElement("hr");
                firstElement.style.borderColor = 'hsl(45, 100%, 50%)';
                firstElement.style.backgroundColor = 'hsl(45, 100%, 50%)';
                firstElement.style.height = '3px';
                secondElement = document.createElement("hr");
                secondElement.style.borderColor = 'hsl(45, 100%, 50%)';
                secondElement.style.backgroundColor = 'hsl(45, 100%, 50%)';
                secondElement.style.height = '3px';
                break;
            }
            case "hr1": {
                firstElement = document.createElement("hr");
                firstElement.style.borderColor = 'hsl(45, 100%, 50%)';
                secondElement = document.createElement("p");
                break;
            }
            case "hr2": {
                firstElement = document.createElement("p");
                secondElement = document.createElement("hr");
                secondElement.style.borderColor = 'hsl(45, 100%, 50%)';
                break;
            }
            case "text": {
                firstElement = document.createElement("p");
                firstElement.innerHTML = item[3];
                secondElement = document.createElement("p");
                secondElement.innerHTML = item[4];
                break;
            }
        }
        if (firstElement == null || secondElement == null) {
            return;
        }
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.appendChild(firstElement);
        td2.appendChild(secondElement);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    });
    return table;
}

function createActionButton(text, onmouseup) {
    let button = document.createElement("button");
    button.innerHTML = text;
    button.onmouseup = onmouseup;
    return button;
}

function createParameterIntegerButton(param_id, name, condition) {
    let button = document.createElement("button");
    button.classList.add("amberButton");
    button.innerHTML = settings[param_id];
    button.onmouseup = function (event) {
        event = event.target;
        let prevValue = event.innerHTML;
        let value = prompt(replaceTags(name, ' '), event.innerHTML);
        let parsed = parseInt(value);
        if (isInt(parsed) && condition(parsed)) {
            event.innerHTML = parsed;
            setSetting(param_id, event.innerHTML);
        }
        else {
            setSetting(param_id, prevValue);
            event.innerHTML = prevValue;
        }
    };
    return button;
}

function toFloatString(number, min_digits = undefined, max_digits = undefined) {
    return Number(number).toLocaleString('en-US', { minimumFractionDigits: min_digits, maximumFractionDigits: max_digits }).replace(/[^\w\.]/g, '');
}

function createParameterFloatButton(param_id, name, condition) {
    let button = document.createElement("button");
    button.classList.add("amberButton");
    button.innerHTML = settings[param_id];
    button.onmouseup = function (event) {
        event = event.target;
        let prevValue = event.innerHTML;
        let value = prompt(replaceTags(name, ' '), event.innerHTML);
        let parsed = parseFloat(value);
        if ((('' + parsed) == value) && condition(parsed)) {
            event.innerHTML = toFloatString(parsed, 1, 1);
            setSetting(param_id, event.innerHTML);
        }
        else {
            setSetting(param_id, prevValue);
            event.innerHTML = prevValue;
        }
    };
    return button;
}

function createParameterRangeButton(param_id, name, condition) {
    let button = document.createElement("button");
    button.classList.add("amberButton");
    button.innerHTML = settings[param_id];
    button.onmouseup = function (event) {
        event = event.target;
        let prevValue = event.innerHTML;
        let value = prompt(replaceTags(name, ' '), event.innerHTML);
        let parsed = toIntOrIntRange(value);
        if (parsed != null && condition(parsed)) {
            event.innerHTML = parsed.length == 1
                ? parsed[0] : (parsed[0] + '-' + parsed[1]);
            setSetting(param_id, event.innerHTML);
        }
        else {
            setSetting(param_id, prevValue);
            event.innerHTML = prevValue;
        }
    };
    return button;
}

function createParameterCombobox(param_id, options, onchangeFunc = null) {
    let select = document.createElement("select");
    options.forEach(optionValue => {
        let option = document.createElement("option");
        option.value = optionValue;
        option.innerHTML = optionValue;
        select.appendChild(option);
    });
    select.value = settings[param_id];
    select.classList.add("modern_select");
    select.onclick = function (event) {
        select.setAttribute('previous', select.value);
    };
    select.onchange = function (event) {
        event = event.target;
        let prev_value = select.getAttribute('previous');
        if (onchangeFunc != null) {
            if (onchangeFunc(event.value)) {
                setSetting(param_id, event.value);
                select.setAttribute('previous', event.value);
            }
            else {
                select.value = prev_value;
            }
        }
        else {
            setSetting(param_id, event.value);
        }
    }
    return select;
}

function createVoiceCombobox(param_id, onchangeFunc = null, add_voice_std_option = false) {
    let select = document.createElement("select");
    /*
    let empty_option = document.createElement("option");
    empty_option.value = -1;
    empty_option.innerHTML = "No voice";
    select.appendChild(empty_option);
    select.value = empty_option.value;
    */
    if (add_voice_std_option) {
        let voice_std_option = document.createElement("option");
        voice_std_option.value = -2;
        voice_std_option.innerHTML = "[Web] Nate";
        select.appendChild(voice_std_option);
    }
    let options = getVoices();
    options.forEach(optionValue => {
        let option = document.createElement("option");
        option.value = optionValue[0];
        option.innerHTML = '[Local] ' + optionValue[2];
        select.appendChild(option);
    });
    for (let x of options) {
        if (x[0] == settings[param_id]) {
            select.value = x[0];
        }
    }
    if (add_voice_std_option && settings[param_id] == -2) {
        select.value = -2;
    }
    select.classList.add("modern_select");
    select.onchange = function (event) {
        event = event.target;
        setSetting(param_id, event.value);
        if (onchangeFunc != null) {
            onchangeFunc(event.value);
        }
    }
    return select;
}

function stopAnyAudio() {
    try {
        window.speechSynthesis.pause();
        window.speechSynthesis.cancel();
    }
    catch (err) {
        console.log(err);
    }
    for (const [audio_filename, audio_value] of Object.entries(state1_audio_mp3)) {
        try {
            audio_value.pause();
            audio_value.currentTime = 0;
        }
        catch (err) {
            console.log(`${audio_filename} - ${err}`);
        }
    }
    for (const [audio_filename, audio_value] of Object.entries(state1_voice_mp3)) {
        try {
            audio_value.pause();
            audio_value.currentTime = 0;
        }
        catch (err) {
            console.log(`${audio_filename} - ${err}`);
        }
    }
}

function st1_play(audio_file_url) {
    stopAnyAudio();
    if (audio_file_url.length > 0) {
        if (!Object.hasOwn(state1_audio_mp3, audio_file_url)) {
            state1_audio_mp3[audio_file_url] = new Audio('audios/' + audio_file_url);
        }
        state1_audio_mp3[audio_file_url].play().then(null, function () {
            filename_wo_ext = audio_file_url.replace(/.*?([^/]+?)(\.\w+|$)/gm, '$1');
            speak(filename_wo_ext, getVoices()[0][0]);
            delete state1_audio_mp3[audio_file_url];
        });
    }
}

function st1_speak(text, voice_index) {
    stopAnyAudio();
    text = text.trim();
    if (voice_index >= 0) {
        speak(text, voice_index);
        return;
    }
    let filename = state1_voice_title_to_filename[text];
    if (filename) {
        if (!Object.hasOwn(state1_voice_mp3, filename)) {
            state1_voice_mp3[filename] = new Audio('voice/' + filename + '.mp3');
        }
        state1_voice_mp3[filename].play().then(null, function () {
            speak(text, settings['ce_state1_voice_index_default']);
            delete state1_voice_mp3[filename];
        });
    }
    else {
        speak(text, settings['ce_state1_voice_index_default']);
    }
}

function createMenuButton(text, onmouseup) {
    let button = document.createElement("button");
    button.classList.add("amberButton");
    button.innerHTML = text;
    button.onmouseup = onmouseup;
    return button;
}

function createTemplateChooser(param_id, onmouseup) {
    let combobox = document.createElement("select");
    combobox.classList.add("modern_select");
    combobox.id = param_id;
    combobox.onchange = onmouseup;
    return combobox;
}

function createParameterActionButton(param_id, onmouseup, data_from = null) {
    let button = document.createElement("button");
    button.classList.add("amberButton");
    if (param_id != null) {
        button.innerHTML = param_id;
        button.id = param_id;
    }
    if (data_from != null) {
        button.onmouseup = function (event) {
            onmouseup(data_from, event);
        };
    }
    else {
        button.onmouseup = onmouseup;
    }
    return button;
}

function createCaption(text) {
    let caption = document.createElement('h1');
    caption.innerHTML = text;
    return caption;
}

function state0() {
    stopAnyAudio();
    currentGenerator = null;
    state = 0;
    clearWidgets();
    addWidget(createCaption('Cognitive Exercises'));

    addWidget(createMenuButton(getScoredText(statesToNames.st1, 1), state1));
    /*
    addWidget(createMenuButton(getScoredText(statesToNames.st2, 2), state2));
    */
    addWidget(createMenuButton(getScoredText(statesToNames.st3, 3), state3));
    addWidget(createMenuButton(getScoredText(statesToNames.st4, 4), state4));

    let historyButton = createActionButton('History', () => {
        stateHistory();
    });
    historyButton.classList.add('blackButton');
    historyButton.classList.add('w100');
    addWidget(historyButton);

    let settingsButton = createActionButton('Settings', () => {
        stateSettings();
    });
    settingsButton.classList.add('blackButton');
    settingsButton.classList.add('w100');
    addWidget(settingsButton);

    let clearScoresButton = createActionButton('Clear scores', () => {
        if (confirm('Are you sure you want to clear the scores?')) {
            stateN_clear_score(['ce_st1', 'ce_st2', 'ce_st3', 'ce_st4']);
        }
    });
    clearScoresButton.classList.add('blackButton');
    clearScoresButton.classList.add('w100');
    addWidget(clearScoresButton);
    addWidget(document.createElement('br'));
    addWidget(document.createElement('br'));
    let link = document.createElement('a');
    link.href = 'https://github.com/quint-t/Cognitive-Exercises';
    link.target = '_blank';
    link.innerHTML = 'Version ' + version;
    addWidget(link);
    let p = document.createElement('span');
    p.innerHTML = ' / ';
    p.style.color = '#333333';
    addWidget(p);
    let download_link = document.createElement('a');
    download_link.href = 'https://github.com/quint-t/Cognitive-Exercises/archive/refs/heads/main.zip';
    download_link.target = '_blank';
    download_link.innerHTML = 'Download it';
    addWidget(download_link);
    addWidget(document.createElement('br'));
    let tg_link = document.createElement('a');
    tg_link.href = 'https://t.me/+25UKv4tsGmc1YmEy';
    tg_link.target = '_blank';
    tg_link.innerHTML = 'Contact me';
    addWidget(tg_link);
}

function resetAllSettings() {
    let storageCopy = Object.assign({}, localStorage);
    Object.keys(storageCopy).forEach((x) => {
        if (x.startsWith('CE_') || x.startsWith('ce_')) {
            localStorage.removeItem(x);
        }
    });
    location.reload();
}

function stateHistory() {
    currentGenerator = null;
    state = -1;
    clearWidgets();
    let backButton = createActionButton('Back', () => {
        state0();
    });
    backButton.classList.add('blackButton');
    backButton.classList.add('w100');
    addWidget(backButton);
    let clearButton = createActionButton('Clear history', () => {
        if (confirm('Are you sure you want to clear the history?')) {
            localStorage.removeItem('ce_history');
            ce_history = loadHistory();
            state0();
        }
    });
    clearButton.classList.add('blackButton');
    clearButton.classList.add('w100');
    addWidget(clearButton);
    ce_history.forEach(historyElem => {
        let task = createInputElems();
        let taskDiv = task[0];
        let taskArea = task[1];
        taskArea.innerHTML = historyElem;
        addWidget(taskDiv);
        taskArea.style.height = 'auto';
        taskArea.style.height = (taskArea.scrollHeight + 20) + 'px';
    });
}

function stateSettings() {
    currentGenerator = null;
    state = -1;
    clearWidgets();
    let backButton = createActionButton('Back', () => {
        state0();
    });
    backButton.classList.add('blackButton');
    backButton.classList.add('w100');
    addWidget(backButton);

    let downloadButton = createActionButton('Export settings', (event) => {
        download_settings(event);
    });
    downloadButton.classList.add('blackButton');
    downloadButton.classList.add('w100');
    addWidget(downloadButton);

    let uploadButton = createActionButton('Import settings', (event) => {
        upload_settings(event);
    });
    uploadButton.classList.add('blackButton');
    uploadButton.classList.add('w100');
    addWidget(uploadButton);

    let resetButton = createActionButton('Reset all settings', () => {
        if (confirm('Are you sure you want to reset all settings?')) {
            resetAllSettings();
        }
    });
    resetButton.classList.add('blackButton');
    resetButton.classList.add('w100');
    addWidget(resetButton);
}

function state1ImageShow(text) {
    currentGenerator = null;
    state = -1;
    clearWidgets();
    let backButton = createActionButton('Back', () => {
        state1();
    });
    backButton.classList.add('blackButton');
    backButton.classList.add('w100');
    addWidget(backButton);

    let random_button_element = createParameterActionButton(null, function () {
        let random_image = randomChoice(state1_image_examples);
        let image_file_name = random_image[0];
        state1ImageShow(image_file_name);
    });
    random_button_element.innerHTML = 'Random image';
    addWidget(random_button_element);
    addWidget(document.createElement('br'));

    let select_element = document.createElement("select");
    select_element.classList.add('modern_select');
    for (let [k, v] of state1_image_examples) {
        let option = document.createElement("option");
        option.value = k;
        option.innerHTML = v;
        select_element.appendChild(option);
    }
    select_element.value = text;
    select_element.style.maxWidth = '300px';
    show_button = createParameterActionButton(null, function (input_element) {
        let text = input_element.value;
        state1ImageShow(text);
    }, select_element);
    show_button.innerHTML = 'Show';
    addWidget(select_element);
    addWidget(show_button);

    addWidget(document.createElement('br'));

    let imageDiv = document.createElement('img');
    imageDiv.src = `images/${text}`;
    imageDiv.alt = text;
    imageDiv.style.maxWidth = '350px';
    imageDiv.style.maxHeight = '350px';
    imageDiv.style.backgroundSize = 'contain';
    imageDiv.style.backgroundRepeat = 'no-repeat';
    imageDiv.style.backgroundPosition = 'center center';
    addWidget(imageDiv);

    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    addWidget(paragraph);
}

function state1WordInfo(text) {
    let s = [];
    if (state1_words[text] != null) {
        for (let definition of state1_words[text]) {
            let part_of_speech = definition[0];
            let meaning = definition[1];
            let example = definition[2];
            let synonyms = definition[3];
            let antonyms = definition[4];
            let similar_words = definition[5];
            text = capitalize(text.toLowerCase());
            s.push(`${text} (${part_of_speech}) - ${meaning}.`);
            if (example != null && example.length > 0) {
                s.push(`${example}.`);
            }
            if (synonyms.length > 0) {
                s.push(`Synonyms: ${synonyms.join(', ')}.`);
            }
            if (antonyms.length > 0) {
                s.push(`Antonyms: ${antonyms.join(', ')}.`);
            }
            if (similar_words.length > 0) {
                s.push(`Similar words: ${similar_words.join(', ')}.`);
            }
            s.push("");
        }
    }
    else {
        let synonyms = [];
        let antonyms = [];
        let similar_words = [];
        for (const [word, definitions] of Object.entries(state1_words)) {
            for (const definition of definitions) {
                for (let syn of definition[3]) {
                    if (syn == text) {
                        synonyms.push(word);
                    }
                }
                for (let ant of definition[4]) {
                    if (ant == text) {
                        antonyms.push(word);
                    }
                }
                for (let sim of definition[5]) {
                    if (sim == text) {
                        similar_words.push(word);
                    }
                }
            }
        }
        text = capitalize(text.toLowerCase());
        if (synonyms.length > 0) {
            s.push(`${text} - is a synonym for: ${synonyms.join(', ')}.`);
        }
        if (antonyms.length > 0) {
            s.push(`${text} - is an antonym for: ${antonyms.join(', ')}.`);
        }
        if (similar_words.length > 0) {
            s.push(`${text} - is a similar word for: ${similar_words.join(', ')}.`);
        }
    }
    if (s.length > 0) {
        s = s.join('\n\n');
        currentGenerator = null;
        state = -1;
        clearWidgets();
        let backButton = createActionButton('Back', () => {
            state1();
        });
        backButton.classList.add('blackButton');
        backButton.classList.add('w100');
        addWidget(backButton);

        let random_button_element = createParameterActionButton(null, function () {
            let random_word = randomChoice(Object.keys(state1_words));
            state1WordInfo(random_word);
        });
        random_button_element.innerHTML = 'Random word';
        addWidget(random_button_element);
        addWidget(document.createElement('br'));

        input_element = document.createElement("input");
        input_element.type = "text";
        input_element.value = text;
        input_element.classList.add('modern_select');
        input_element.style.maxWidth = '280px';
        let info_button_element = createParameterActionButton(null, function () {
            state1WordInfo(input_element.value.toLowerCase());
        }, input_element);
        info_button_element.innerHTML = 'Info';
        addWidget(input_element);
        addWidget(info_button_element);

        let infoArea = document.createElement("textarea");
        infoArea.classList.add("infoArea");
        infoArea.readOnly = true;
        infoArea.style.whiteSpace = 'pre-wrap';
        infoArea.innerHTML = s.trim();
        addWidget(infoArea);
        infoArea.style.height = 'auto';
        infoArea.style.height = (infoArea.scrollHeight + 20) + 'px';
    }
    else {
        alert('No word found!');
    }
}

function getStrDateTime() {
    let dts = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60)))).toISOString();
    dts = dts.replace('T', ' ').replaceAll('-', '.').slice(0, 19);
    return dts;
}

function formatHistoryElem(historyElem) {
    let stateName = statesToNames['st' + state];
    return getStrDateTime() + '. ' + stateName + '\n' + historyElem;
}

function addHistoryItem(historyElem) {
    historyElem = historyElem.join('\n');
    ce_history.unshift(formatHistoryElem(historyElem));
    if (ce_history.length > 25) {
        ce_history = ce_history.slice(0, 25);
    }
    localStorage.setItem('ce_history', JSON.stringify(ce_history));
}

function updateLastHistoryItem(historyElem) {
    historyElem = historyElem.join('\n');
    ce_history[0] = formatHistoryElem(historyElem);
    localStorage.setItem('ce_history', JSON.stringify(ce_history));
}

function refill_templates(exercise_number) {
    let active_template = settings['ce_state' + exercise_number + '_active_template'];
    let state_n_templates = settings['ce_state' + exercise_number + '_templates'];
    if (!state_n_templates) {
        active_template = 'Default';
        new_template(exercise_number, active_template);
        state_n_templates = settings['ce_state' + exercise_number + '_templates'];
    }
    state_n_templates = JSON.parse(state_n_templates);
    let select = document.getElementById('ce_st' + exercise_number + '_template_choose');
    select.innerHTML = '';
    for (const [key, value] of Object.entries(state_n_templates)) {
        let option = document.createElement('option');
        option.value = key;
        option.innerHTML = key;
        select.appendChild(option);
    }
    select.value = active_template;
    choose_template(exercise_number, active_template);
}

function choose_template(exercise_number, active_template) {
    if (active_template == null) {
        active_template = settings['ce_state' + exercise_number + '_active_template'];
    }
    let state_n_templates = settings['ce_state' + exercise_number + '_templates'];
    state_n_templates = JSON.parse(state_n_templates ? state_n_templates : '{}');
    if (state_n_templates.hasOwnProperty(active_template)) {
        let template = state_n_templates[active_template];
        for (let [key, value] of Object.entries(template)) {
            setSetting(key, value);
        }
        setSetting('ce_state' + exercise_number + '_active_template', active_template);
    }
}

function new_template(exercise_number, template_name = null) {
    let state_n_templates = settings['ce_state' + exercise_number + '_templates'];
    state_n_templates = JSON.parse(state_n_templates ? state_n_templates : '{}');
    if (template_name == null) {
        template_name = prompt('Enter name of template:');
    }
    if (template_name == null) {
        return;
    }
    if (/^([a-zA-Z0-9_ ]+)$/.test(template_name) == false) {
        alert('Template name is invalid!');
        return;
    }
    if (state_n_templates.hasOwnProperty(template_name)) {
        alert('Template already exists!');
        return;
    }
    let new_template_value = {};
    for (const [key, value] of Object.entries(settings)) {
        if (key.startsWith('ce_st' + exercise_number + '_')) {
            new_template_value[key] = value;
        }
    }
    state_n_templates[template_name] = new_template_value;
    setSetting('ce_state' + exercise_number + '_templates', JSON.stringify(state_n_templates));
    choose_template(exercise_number, template_name);
}

function save_template(exercise_number) {
    let active_template = settings['ce_state' + exercise_number + '_active_template'];
    let state_n_templates = settings['ce_state' + exercise_number + '_templates'];
    state_n_templates = JSON.parse(state_n_templates ? state_n_templates : '{}');
    if (state_n_templates.hasOwnProperty(active_template)) {
        let new_template_value = {};
        for (const [key, value] of Object.entries(settings)) {
            if (key.startsWith('ce_st' + exercise_number + '_')) {
                new_template_value[key] = value;
            }
        }
        state_n_templates[active_template] = new_template_value;
        setSetting('ce_state' + exercise_number + '_templates', JSON.stringify(state_n_templates));
    }
}

function delete_template(exercise_number) {
    let active_template = settings['ce_state' + exercise_number + '_active_template'];
    let state_n_templates = settings['ce_state' + exercise_number + '_templates'];
    state_n_templates = JSON.parse(state_n_templates ? state_n_templates : '{}');
    if (active_template == 'Default') {
        alert('You cannot delete Default template!');
        return;
    }
    if (state_n_templates.hasOwnProperty(active_template)) {
        delete state_n_templates[active_template];
        setSetting('ce_state' + exercise_number + '_templates', JSON.stringify(state_n_templates));
        choose_template(exercise_number, 'Default');
    }
}

function state1() {
    stopAnyAudio();
    choose_template('1', null);
    clearInterval(st1_show_trial_interval);
    clearInterval(st1_answer_trial_interval);
    let random_word = capitalize(randomChoice(Object.keys(state1_words)));
    currentGenerator = null;
    state = 1;
    clearWidgets();
    addWidget(createCaption(statesToNames.st1));
    addWidget(createParameters([
        [
            "Save & Start", "Back", "buttons",
            function (event) {
                save_template('1');
                state1_start();
            },
            function (event) {
                state1_back();
            },
        ],
        [
            "ce_st1_template_choose", "ce_st1_template_new", "template_choose_new",
            function (event) {
                choose_template('1', event.target.value);
                state1();
            },
            function (event) {
                new_template('1');
                state1();
            },
        ],
        [
            "ce_st1_template_save", "ce_st1_template_delete", "template_save_delete",
            function (event) {
                save_template('1');
            },
            function (event) {
                if (confirm('Are you sure you want to delete the template?')) {
                    delete_template('1');
                    state1();
                }
            },
        ],
        ["", "", "hr"],
        [
            "Increase level", "Decrease", "buttons",
            function (event) {
                let st1_n = toIntOrIntRange(settings['ce_st1_min_max_n']);
                let st1_n_min = st1_n[0];
                let st1_n_max = st1_n.length == 2 ? st1_n[1] : st1_n_min;
                let was_diff = (st1_n.length == 2);
                if (was_diff === false) {
                    st1_n_min = Math.min(Math.max(st1_n_min + 1, 0), 1000);
                }
                st1_n_max = Math.min(Math.max(st1_n_max + 1, 0), 1000);
                st1_n_min = Math.min(st1_n_min, st1_n_max);
                if (was_diff == false) {
                    st1_n_string = st1_n_min;
                }
                else {
                    st1_n_string = st1_n_min + '-' + st1_n_max;
                }
                st1_n = st1_n_min;
                setSetting('ce_st1_min_max_n', st1_n_string);
                document.getElementById('ce_st1_min_max_n').innerHTML = st1_n_string;
            },
            function (event) {
                let st1_n = toIntOrIntRange(settings['ce_st1_min_max_n']);
                let st1_n_min = st1_n[0];
                let st1_n_max = st1_n.length == 2 ? st1_n[1] : st1_n_min;
                let was_diff = (st1_n.length == 2);
                if (was_diff === false) {
                    st1_n_min = Math.min(Math.max(st1_n_min - 1, 0), 1000);
                }
                st1_n_max = Math.min(Math.max(st1_n_max - 1, 0), 1000);
                st1_n_min = Math.min(st1_n_min, st1_n_max);
                if (was_diff == false) {
                    st1_n_string = st1_n_min;
                }
                else {
                    st1_n_string = st1_n_min + '-' + st1_n_max;
                }
                st1_n = st1_n_min;
                setSetting('ce_st1_min_max_n', st1_n_string);
                document.getElementById('ce_st1_min_max_n').innerHTML = st1_n_string;
            },
        ],
        ["ce_st1_auto_mode", "<b>Auto mode</b><br>Move to the next level every K successful trials<br>[0:disable|1-10000]", "integer", function (xv) {
            return xv === 0 || 1 <= xv && xv <= 10000;
        }],
        ["ce_st1_min_max_n", "<b>Auto mode</b><br>Min-Max N<br>[0|1-1000]", "range", function (xv) {
            return xv != null &&
                   0 <= xv[0] && xv[0] <= 1000 &&
                   (xv.length === 1 || 0 <= xv[1] && xv[1] <= 1000);
        }],
        ["", "", "hr"],
        ["ce_st1_image_to_word", "<u>Image to Word</u>", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_word_to_image", "<u>Word to Image</u>", "combobox", Object.values(combo_enable_disable)],
        ["", "", "hr1"],
        ["ce_st1_audio_to_word", "<u>Audio to Word</u>", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_audio_to_image", "<u>Audio to Image</u>", "combobox", Object.values(combo_enable_disable)],
        ["", "", "hr1"],
        ["ce_st1_voice_to_word", "<u>Voice to Word</u>", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_voice_to_image", "<u>Voice to Image</u>", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_voice_index", "Voice", "ce_st1_voice_combobox"],
        ["", "", "hr1"],
        ["ce_st1_image_voice_word_to_category", "Mode 'Choose category'", "combobox", Object.values(combo_enable_only_disable)],
        ["ce_st1_image_voice_random_task_each_time", "Random task each time<br>for one trial", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_image_voice_show_trial_time_limit", "Show trial time limit<br>(in seconds)<br>[0:disable|1-120]", "float", function (xv) {
            return xv === 0 || 0.1 <= xv && xv <= 120;
        }],
        ["ce_st1_image_voice_answer_trial_time_limit", "Answer trial time limit<br>(in seconds)<br>[0:disable|1-120]", "float", function (xv) {
            return xv === 0 || 0.1 <= xv && xv <= 120;
        }],
        ["ce_st1_image_voice_hard_mode", "Hard mode", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_image_voice_options", "Options", "combobox", Object.values(combo_st1_options)],
        ["", "", "hr1"],
        ["ce_st1_image_voice_insects_category", "Category 'Insects'", "combobox", Object.values(combo_enable_somewhat_disable)],
        ["ce_st1_image_voice_halloween_category", "Category 'Halloween'", "combobox", Object.values(combo_enable_somewhat_disable)],
        ["ce_st1_image_voice_baby_category", "Category 'Baby'", "combobox", Object.values(combo_enable_somewhat_disable)],
        ["ce_st1_image_voice_family_members_category", "Category 'Family members'", "combobox", Object.values(combo_enable_somewhat_disable)],
        ["ce_st1_image_voice_holidays_category", "Category 'Official holidays'", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_image_voice_body_category", "Category 'Body'", "combobox", Object.values(combo_enable_disable)],
        ["", "", "hr"],
        ["ce_st1_word_to_word", "<u>Word to Word</u>", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_meaning_to_word", "<u>Meaning to Word</u>", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_word_to_synonym", "<u>Word to Synonym</u>", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_word_to_antonym", "<u>Word to Antonym</u>", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_word_to_similar_word", "<u>Word to Similar word</u>", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_find_word_in_sentence", "<u>Find word in sentence</u>", "combobox", Object.values(combo_enable_disable)],
        ["", "", "hr1"],
        ["ce_st1_word_random_task_each_time", "Random task each time<br>for one word", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_word_show_trial_time_limit", "Show trial time limit<br>(in seconds)<br>[0:disable|1-120]", "float", function (xv) {
            return xv === 0 || 0.1 <= xv && xv <= 120;
        }],
        ["ce_st1_word_answer_trial_time_limit", "Answer trial time limit<br>(in seconds)<br>[0:disable|1-120]", "float", function (xv) {
            return xv === 0 || 0.1 <= xv && xv <= 120;
        }],
        ["ce_st1_word_hard_mode", "Hard mode", "combobox", Object.values(combo_enable_disable)],
        ["ce_st1_word_options", "Options", "combobox", Object.values(combo_st1_options)],
        ["", "", "hr"],
        ["ce_state1_words_dictionary", "Dictionary of words", "combobox", Object.values(combo_state1_words_dictionary), function (xv) {
            if (confirm('Are you sure you want to choose ' + xv + '?')) {
                setSetting('ce_state1_words_dictionary', xv);
                save_template('1');
                location.reload();
                return true;
            }
            else {
                return false;
            }
        }],
        ["ce_state1_wrap", "Wrap text", "combobox", Object.values(combo_enable_disable)],
        ["", "", "hr"],
        ["", "Show", "combobox_button", function (input_element) {
            let text = input_element.value;
            state1ImageShow(text);
        }, state1_image_examples],
        ["", "Play", "combobox_button", function (input_element) {
            let text = input_element.value;
            if (text != null && text.length > 0) {
                st1_play(text);
            }
        }, state1_audio_examples],
        ["Hello", "Speak", "text_button", function (input_element) {
            let text = input_element.value;
            let select = document.getElementById('ce_st1_voice_index');
            if (text != null && text.length > 0 && select != null) {
                st1_speak(text.toLowerCase(), select.value);
            }
        }],
        [random_word, "Info", "text_button", function (input_element) {
            let text = input_element.value.toLowerCase();
            state1WordInfo(text);
        }],
        ["", "", "hr"],
        ["", "", "text", "Categories<br>Images<br>Audio files<br>Nate's voice files", `${state1_statistics_images_categories}<br>${state1_statistics_images}<br>${state1_statistics_audio_files}<br>${state1_statistics_voice_files}`],
        ["", "", "text", "Dictionary<br>Words<br>Words with definitions<br>Definitions of the words<br>Synonyms<br>Antonyms<br>Similar words", `${state1_dictionary_source}<br>${state1_statistics_unique_words}<br>${state1_statistics_words_with_meaning}<br>${state1_statistics_words_definitions}<br>${state1_statistics_synonyms}<br>${state1_statistics_antonyms}<br>${state1_statistics_similar_words}`],
        [
            "Default settings", "Clear score", "buttons",
            function (event) {
                if (confirm('Are you sure you want to set the default settings for the current template?')) {
                    stateN_defaults('ce_st1');
                    save_template('1');
                    state1();
                }
            },
            function (event) {
                if (confirm('Are you sure you want to clear the scores?')) {
                    stateN_clear_score('ce_st1');
                    save_template('1');
                    state1();
                }
            },
        ],
    ]));
    refill_templates('1');
}

function state1_back() {
    state0();
}

function state1_start() {
    clearWidgets();
    let task = createInputElems(settings['ce_state1_wrap'] == combo_enable_disable.Enable);
    let taskDiv = task[0];
    let taskArea = task[1];
    let st1_image_voice_options = parseInt(settings['ce_st1_image_voice_options']);
    let st1_word_options = parseInt(settings['ce_st1_word_options']);
    let st1_options = Math.max(st1_image_voice_options, st1_word_options);
    let fs = parseInt(settings['ce_state1_font_size']);
    taskArea.style.fontSize = isFinite(fs) ? fs + 'px' : '16px';
    addWidget(createCaption(statesToNames.st1));
    addWidget(taskDiv);
    addWidget(document.createElement('br'));
    addWidget(createChooser(state1, st1_options, {
        'Restart': () => {
            if (confirm("Are you sure you want to restart?")) {
                currentGenerator.next('-RESTART-');
            }
        },
        'Skip': () => {
            taskArea.innerHTML = 'Generating...\n';
            setTimeout(function () {
                currentGenerator.next('-SKIP-');
            }, 50);
        },
        'Answer': () => { currentGenerator.next('-ANSWER-') },
        '+': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(7, fs + 1));
            setSetting('ce_state1_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
            appendText(taskArea, '', false, 0);
        },
        '-': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(7, fs - 1));
            setSetting('ce_state1_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
            appendText(taskArea, '', false, 0);
        },
    }));
    currentGenerator = state1_generator(taskArea);
    currentGenerator.next();
}

function findSubarray(arr, subarr) {
    for (var i = 0; i < 1 + (arr.length - subarr.length); i++) {
        var j = 0;
        for (; j < subarr.length; j++)
            if (arr[i + j] !== subarr[j])
                break;
        if (j == subarr.length)
            return i;
    }
    return -1;
}

function convertOptionsToString(options) {
    let i = 0, currentLine = '', text = '';
    for (let x of options) {
        if (currentLine.length == 0) {
            currentLine = currentLine.concat('' + x);
        }
        else {
            currentLine = currentLine.concat(' | ' + x);
        }
        ++i;
        if (i != 0 && i % 2 == 0) {
            text = text.concat(currentLine + '\n');
            currentLine = '';
        }
    }
    if (currentLine.length > 0) {
        text = text.concat(currentLine + '\n');
    }
    return text;
}

function* state1_generator(taskArea) {
    let st1_auto_mode = parseInt(settings['ce_st1_auto_mode']);
    let st1_n = toIntOrIntRange(settings['ce_st1_min_max_n']);
    let st1_n_min = st1_n[0];
    let st1_n_max = st1_n.length == 2 ? st1_n[1] : st1_n_min;
    let was_diff = (st1_n.length == 2);
    st1_n = st1_n_min;
    let st1_image_voice_options = parseInt(settings['ce_st1_image_voice_options']);
    let st1_word_options = parseInt(settings['ce_st1_word_options']);
    let st1_options = Math.max(st1_image_voice_options, st1_word_options);
    let st1_image_voice_word_to_category = settings['ce_st1_image_voice_word_to_category'];
    let st1_word_to_image = settings['ce_st1_word_to_image'];
    let st1_image_to_word = settings['ce_st1_image_to_word'];
    let st1_audio_to_word = settings['ce_st1_audio_to_word'];
    let st1_audio_to_image = settings['ce_st1_audio_to_image'];
    let st1_voice_to_word = settings['ce_st1_voice_to_word'];
    let st1_voice_to_image = settings['ce_st1_voice_to_image'];
    let st1_voice_index = parseInt(settings['ce_st1_voice_index']);
    let st1_image_voice_hard_mode = settings['ce_st1_image_voice_hard_mode'];
    let st1_word_hard_mode = settings['ce_st1_word_hard_mode'];
    let st1_image_voice_show_trial_time_limit = parseFloat(settings['ce_st1_image_voice_show_trial_time_limit']);
    let st1_image_voice_answer_trial_time_limit = parseFloat(settings['ce_st1_image_voice_answer_trial_time_limit']);
    let st1_word_mode_show_trial_time_limit = parseFloat(settings['ce_st1_word_show_trial_time_limit']);
    let st1_word_mode_answer_trial_time_limit = parseFloat(settings['ce_st1_word_answer_trial_time_limit']);
    let st1_word_to_word = settings['ce_st1_word_to_word'];
    let st1_meaning_to_word = settings['ce_st1_meaning_to_word'];
    let st1_word_to_synonym = settings['ce_st1_word_to_synonym'];
    let st1_word_to_antonym = settings['ce_st1_word_to_antonym'];
    let st1_word_to_similar_word = settings['ce_st1_word_to_similar_word'];
    let st1_find_word_in_sentence = settings['ce_st1_find_word_in_sentence'];
    let st1_image_voice_modes_random_bool = settings['ce_st1_image_voice_random_task_each_time'] == combo_enable_disable.Enable;
    let st1_word_mode_random_bool = settings['ce_st1_word_random_task_each_time'] == combo_enable_disable.Enable;

    let st1_insects_category = settings['ce_st1_image_voice_insects_category'];
    let st1_halloween_category = settings['ce_st1_image_voice_halloween_category'];
    let st1_baby_category = settings['ce_st1_image_voice_baby_category'];
    let st1_family_members_category = settings['ce_st1_image_voice_family_members_category'];
    let st1_holidays_category = settings['ce_st1_image_voice_holidays_category'];
    let st1_body_category = settings['ce_st1_image_voice_body_category'];
    let auto_increase_counter = 0;
    let clearBefore = true;
    let not_item_checker = function (category1, category2, title) {
        title = title.toLowerCase();
        if (st1_insects_category == combo_enable_disable.Disable && (
            category2 == 'Insects' ||
            title == 'bat' ||
            title == 'bee' ||
            category2 == 'Sea animals' && title.includes('coral') ||
            title == 'crab' ||
            title == 'crayfish' ||
            title == 'frog' ||
            title == 'giant squid' ||
            title == 'jellyfish' ||
            title == 'lobster' ||
            title == 'mole' ||
            title == 'nautilus' ||
            title == 'octopus' ||
            title == 'poop' ||
            title == 'proposal' ||
            title == 'romper' ||
            title == 'sea anemone' ||
            title == 'sea urchin' ||
            title == 'shrimp' ||
            title == 'snail' ||
            title == 'snake' ||
            title == 'spider' ||
            title == 'squid' ||
            title == 'starfish' ||
            title == 'walrus'
        )) {
            return true;
        }
        if (st1_insects_category == combo_enable_somewhat_disable.Somewhat && (
            category2 == 'Insects'
        )) {
            return true;
        }
        if (st1_halloween_category == combo_enable_disable.Disable && (
            category2 == 'Halloween' ||
            title == 'clown' ||
            title == 'fear' ||
            title == 'grimace' ||
            title == 'kind' ||
            category2 == 'Aircraft' && title == 'kite' ||
            title == 'pumpkin' ||
            title == 'shout' ||
            title == 'spider' ||
            title == 'wicked'
        )) {
            return true;
        }
        if (st1_halloween_category == combo_enable_somewhat_disable.Somewhat && (
            category2 == 'Halloween'
        )) {
            return true;
        }
        if (st1_baby_category == combo_enable_disable.Disable && (
            category1 == 'Baby' ||
            category1 == 'School' ||
            category2 == 'Counting' ||
            category2 == 'Mothers day' ||
            title == 'angel' ||
            title == 'aunt' ||
            title == 'balance bike' ||
            title == 'blow ones nose' ||
            title == 'blow' ||
            title == 'boy' ||
            title == 'brother' ||
            title == 'brush teeth' ||
            title == 'build' ||
            title == 'care' ||
            title == 'clap' ||
            title == 'climb' ||
            title == 'coach' ||
            title == 'collect, gather' ||
            title == 'communion' ||
            title == 'crawl' ||
            title == 'cry' ||
            title == 'curly' ||
            title == 'dad' ||
            title == 'daughter' ||
            title == 'descend' ||
            title == 'do laundry' ||
            title == 'dressed' ||
            title == 'family' ||
            title == 'feed' ||
            title == 'friendship' ||
            title == 'get dressed' ||
            title == 'girl' ||
            title == 'grandson' ||
            title == 'grimace' ||
            title == 'hide' ||
            title == 'hug' ||
            title == 'hurt' ||
            title == 'kind' ||
            title == 'kiss' ||
            category2 == 'Aircraft' && title == 'kite' ||
            title == 'lady' ||
            title == 'mom' ||
            title == 'mother' ||
            title == 'nephew' ||
            title == 'newborn' ||
            title == 'niece' ||
            title == 'parent' ||
            title == 'peep out' ||
            title == 'play the piano' ||
            title == 'play with friends' ||
            title == 'play' ||
            title == 'playpen' ||
            title == 'playroom' ||
            title == 'pray' ||
            title == 'pregnant' ||
            title == 'press' ||
            category2 == "Movement verbs" && title == 'pull' ||
            title == 'push' ||
            title == 'put on make-up' ||
            title == 'put on shoes' ||
            title == 'put' ||
            title == 'relax' ||
            title == 'roll' ||
            title == 'run' ||
            title == 'shoot' ||
            title == 'shout' ||
            title == 'sister' ||
            title == 'sit on the potty' ||
            title == 'sit' ||
            title == 'sleep' ||
            title == 'son' ||
            title == 'splash' ||
            title == 'sweep' ||
            title == 'swing' ||
            title == 'take a bath' ||
            title == 'teacher' ||
            title == 'teenager' ||
            title == 'throw up' ||
            title == 'throw' ||
            title == 'tie shoelaces' ||
            title == 'uncle' ||
            title == 'unclothed' ||
            title == 'walk' ||
            title == 'watch tv' ||
            title == 'whisper' ||
            title == 'yawn' ||
            title.includes('baby') ||
            title.includes('child') ||
            title.includes('daughter') ||
            title.includes('father') ||
            title.includes('mother') ||
            title.includes('parent')
        )) {
            return true;
        }
        if (st1_baby_category == combo_enable_somewhat_disable.Somewhat && (
            category1 == 'Baby' ||
            title == 'dressed' ||
            title == 'unclothed'
        )) {
            return true;
        }
        if (st1_family_members_category == combo_enable_disable.Disable && (
            category2 == 'Mothers day' ||
            category2 == 'Valentines day' ||
            category2 == 'Family members' ||
            category2 == 'Stages' ||
            title == 'bring up' ||
            title == 'care' ||
            title == 'clean, scrub' ||
            title == 'feed' ||
            title == 'get dressed' ||
            title == 'hold' ||
            title == 'hug' ||
            title == 'icon' ||
            title == 'kiss' ||
            title == 'play with friends' ||
            title == 'play' ||
            title == 'present' ||
            title == 'push' ||
            title == 'put on shoes' ||
            title == 'throw up' ||
            title == 'wake up' ||
            title == 'walk' ||
            title == 'whisper' ||
            title.includes('child') ||
            title.includes('daughter') ||
            title.includes('father') ||
            title.includes('mother') ||
            title.includes('parent')
        )) {
            return true;
        }
        if (st1_family_members_category == combo_enable_somewhat_disable.Somewhat && (
            category2 == 'Mothers day' ||
            category2 == 'Valentines day' ||
            category2 == 'Family members' ||
            title.includes('child') ||
            title.includes('daughter') ||
            title.includes('father') ||
            title.includes('mother') ||
            title.includes('parent')
        )) {
            return true;
        }
        if (st1_holidays_category == combo_enable_disable.Disable && (
            category1 == 'Holidays'
        )) {
            return true;
        }
        if (st1_body_category == combo_enable_disable.Disable && (
            category2 == 'Body parts' ||
            category2 == 'Face'
        )) {
            return true;
        }
        if (st1_image_voice_word_to_category == combo_enable_only_disable.Only && (
            category1 == 'Adjectives' ||
            category1 == 'Baby' ||
            category1 == 'Bedroom' ||
            category1 == 'Holidays' ||
            category1 == 'Verbs' ||
            category2 == 'Stages'
        )) {
            return true;
        }
        return false;
    };
    let not_variants_checker = function (
        item1_category1, item1_category2, item1_title,
        item2_category1, item2_category2, item2_title
    ) {
        if (item1_category2 == item2_category2 && item1_category2 == 'Mothers day') {
            return true;
        }
        let item1_splitted = item1_title.split(' ');
        let item2_splitted = item2_title.split(' ');
        for (let x of item1_splitted) {
            if (x.length <= 2) {
                continue;
            }
            for (let y of item2_splitted) {
                if (y.length <= 2) {
                    continue;
                }
                x = x.toLowerCase().replaceAll(/\W/g, '');
                y = y.toLowerCase().replaceAll(/\W/g, '');
                if (x.includes(y) || y.includes(x) || x.slice(0, 3) == y.slice(0, 3)) {
                    return true;
                }
            }
        }
        return false;
    };
    let short_to_full_variant = new Map();
    let full_to_short_variants = new Map();
    let variants = [
        [st1_image_to_word == combo_enable_disable.Enable && Object.keys(state1_images).length > 0,
            'image', 'image-to-word'],
        [st1_word_to_image == combo_enable_disable.Enable && Object.keys(state1_images).length > 0,
            'image', 'word-to-image'],
        [st1_audio_to_word == combo_enable_disable.Enable && Object.keys(state1_audios_all).length > 0,
            'audio', 'audio-to-word'],
        [st1_audio_to_image == combo_enable_disable.Enable && Object.keys(state1_audios_for_images).length > 0,
            'audio', 'audio-to-image'],
        [st1_voice_to_word == combo_enable_disable.Enable && Object.keys(state1_images).length > 0 && (st1_voice_index >= 0 || st1_voice_index === -2),
            'voice', 'voice-to-word'],
        [st1_voice_to_image == combo_enable_disable.Enable && Object.keys(state1_images).length > 0 && (st1_voice_index >= 0 || st1_voice_index === -2),
            'voice', 'voice-to-image'],
        [st1_word_to_word == combo_enable_disable.Enable,
            'word', 'word-to-word'],
        [st1_meaning_to_word == combo_enable_disable.Enable,
            'word', 'meaning-to-word'],
        [st1_word_to_synonym == combo_enable_disable.Enable,
            'word', 'word-to-synonym'],
        [st1_word_to_antonym == combo_enable_disable.Enable,
            'word', 'word-to-antonym'],
        [st1_word_to_similar_word == combo_enable_disable.Enable,
            'word', 'word-to-similar-word'],
        [st1_find_word_in_sentence == combo_enable_disable.Enable,
            'word', 'find-word-in-sentence'],
    ];
    for (let x of variants) {
        let add_variant_bool = x[0], short_variant = x[1], full_variant = x[2];
        if (add_variant_bool) {
            let tmp = short_to_full_variant.get(short_variant) ?? [];
            tmp.push(full_variant);
            short_to_full_variant.set(short_variant, tmp);
            full_to_short_variants.set(full_variant, short_variant);
        }
    }
    if (short_to_full_variant.size == 0 || full_to_short_variants.size == 0) {
        return;
    }
    let images_generator = imageGetter(state1_images, st1_image_voice_options,
        st1_image_voice_hard_mode == combo_enable_disable.Enable,
        not_item_checker, not_variants_checker);
    let audios_for_images_generator = imageGetter(state1_audios_for_images, st1_image_voice_options,
        st1_image_voice_hard_mode == combo_enable_disable.Enable,
        not_item_checker, not_variants_checker);
    let audios_all_generator = imageGetter(state1_audios_all, st1_image_voice_options,
        st1_image_voice_hard_mode == combo_enable_disable.Enable,
        not_item_checker, not_variants_checker);
    let word_generator = wordGetter(state1_words, st1_word_options,
        st1_word_hard_mode == combo_enable_disable.Enable);
    let task_list = [];
    let mistakeFlag = false, skip_mode = true, lines = [];
    st1_auto_mode = st1_auto_mode > 0 ? Math.max(st1_auto_mode, st1_n_max) : 0;
    let imageDiv = document.getElementById('imageDiv');
    let audioDiv = document.getElementById('audioDiv');
    let voiceDiv = document.getElementById('voiceDiv');
    let audioButton = document.getElementById('audioButton');
    let voiceButton = document.getElementById('voiceButton');
    let showTrialTimerImg = document.getElementById('showTrialTimerImg');
    let showTrialTimerP = document.getElementById('showTrialTimerP');
    let answerTrialTimerP = document.getElementById('answerTrialTimerP');
    var show_trial_timer_var = 0;
    var answer_trial_timer_var = 0;
    let skip_plug = [];
    for (let i = 0; i < st1_options; ++i) {
        skip_plug.push('skip');
    }
    let st1_n_string = '';
    if (was_diff === false) {
        st1_n_string = st1_n_min;
        setSetting('ce_st1_min_max_n', st1_n_string);
        save_template('1');
    }
    else {
        st1_n_string = st1_n_min + '-' + st1_n_max;
        setSetting('ce_st1_min_max_n', st1_n_string);
        save_template('1');
    }
    appendText(taskArea, "N = " + st1_n_string + "!\n", clearBefore);
    addHistoryItem([statesToNames.st1]);
    while (true) {
        clearInterval(st1_show_trial_interval);
        clearInterval(st1_answer_trial_interval);
        stopAnyAudio();
        imageDiv.style.display = 'none';
        audioDiv.style.display = 'none';
        voiceDiv.style.display = 'none';
        showTrialTimerImg.style.display = 'none';
        let img = imageDiv.firstChild;
        img.src = '';
        img.alt = '';
        if (mistakeFlag === false && st1_auto_mode !== 0 && auto_increase_counter >= st1_auto_mode) {
            if (was_diff === false) {
                st1_n_min = Math.min(Math.max(st1_n_min + 1, 0), 1000);
            }
            st1_n_max = Math.min(Math.max(st1_n_max + 1, 0), 1000);
            st1_n_min = Math.min(st1_n_min, st1_n_max);
            if (was_diff == false) {
                st1_n_string = st1_n_min;
            }
            else {
                st1_n_string = st1_n_min + '-' + st1_n_max;
            }
            setSetting('ce_st1_min_max_n', st1_n_string);
            save_template('1');
            st1_n = st1_n_min;
            auto_increase_counter = 0;
            task_list = [];
            mistakeFlag = false;
            skip_mode = true;
            st1_auto_mode = st1_auto_mode > 0 ? Math.max(st1_auto_mode, st1_n_max) : 0;
            appendText(taskArea, "N = " + st1_n_string + "!\n", clearBefore);
        }
        else if (mistakeFlag) {
            auto_increase_counter = Math.max(0, auto_increase_counter - 2);
            mistakeFlag = false;
        }
        let short_variant = randomChoice(Array.from(short_to_full_variant.keys()));
        let full_variant = randomChoice(short_to_full_variant.get(short_variant));
        let variant_data = null;
        if (short_variant == 'image' || short_variant == 'voice') {
            let gen_next = images_generator.next();
            if (gen_next.done ?? true) {
                images_generator = imageGetter(state1_images, st1_image_voice_options,
                    st1_image_voice_hard_mode == combo_enable_disable.Enable,
                    not_item_checker, not_variants_checker);
                gen_next = images_generator.next();
            }
            variant_data = gen_next.value;
            // [category 1, category 2, filename, title, variants]
        }
        else if (short_variant == 'audio') {
            let gen_next = null;
            if (full_variant == 'audio-to-word') {
                gen_next = audios_all_generator.next();
                if (gen_next.done ?? true) {
                    audios_all_generator = imageGetter(state1_audios_all, st1_image_voice_options,
                        st1_image_voice_hard_mode == combo_enable_disable.Enable,
                        not_item_checker, not_variants_checker);
                    gen_next = audios_all_generator.next();
                }
            }
            else if (full_variant == 'audio-to-image') {
                gen_next = audios_for_images_generator.next();
                if (gen_next.done ?? true) {
                    audios_for_images_generator = imageGetter(state1_audios_for_images, st1_image_voice_options,
                        st1_image_voice_hard_mode == combo_enable_disable.Enable,
                        not_item_checker, not_variants_checker);
                    gen_next = audios_for_images_generator.next();
                }
            }
            else {
                continue;
            }
            if (gen_next.done ?? true) {
                if (short_to_full_variant.size >= 2) {
                    continue;
                }
                break;
            }
            variant_data = gen_next.value;
            // [category 1, category 2, filename, title, variants]
        }
        else if (short_variant == 'word') {
            word_generator.next();
            let gen_next = word_generator.next(full_variant);
            if (gen_next.done ?? true) {
                word_generator = wordGetter(state1_words, st1_word_options,
                    st1_word_hard_mode == combo_enable_disable.Enable);
                word_generator.next();
                gen_next = word_generator.next(full_variant);
            }
            variant_data = gen_next.value;
            // [[word_capitalized, task1, task2, expected_capitalized, explanation, options_list], [word, definition], task_type]
        }
        task_list.push([short_variant, full_variant, variant_data]);
        let prev_n = st1_n, n_prev_task = null, current_task = task_list[task_list.length - 1];
        if (task_list.length - 1 < st1_n) {
            skip_mode = true;
        }
        else {  // task_list.length - 1 == st1_n
            if (st1_n_min != st1_n_max) {
                prev_n = randomInt(Math.min(st1_n, st1_n_min), Math.min(task_list.length - 1, st1_n_max));
            }
            n_prev_task = task_list[task_list.length - prev_n - 1];
            if (task_list.length - 1 >= st1_n_max) {
                task_list = task_list.slice(1);
            }
            skip_mode = false;
        }
        if (current_task == null) {
            return;
        }
        if (n_prev_task == null) {
            n_prev_task = current_task;
        }
        let text = '', expected = '', explanation = '';
        if (skip_mode === true) {
            expected = 'skip';
            updateChooser(skip_plug);
        }
        short_variant = n_prev_task[0];
        full_variant = n_prev_task[1];
        variant_data = n_prev_task[2];
        if (short_variant == 'image' || short_variant == 'audio' || short_variant == 'voice') {
            if (n_prev_task != current_task && st1_image_voice_modes_random_bool) {
                if (full_variant == 'image-to-word' && full_to_short_variants.has('word-to-image')) {
                    full_variant = randomChoice(['image-to-word', 'word-to-image']);
                }
                else if (full_variant == 'word-to-image' && full_to_short_variants.has('image-to-word')) {
                    full_variant = randomChoice(['word-to-image', 'image-to-word']);
                }
                else if (full_variant == 'voice-to-word' && full_to_short_variants.has('word-to-image')) {
                    full_variant = randomChoice(['voice-to-word', 'word-to-image']);
                }
                else if (full_variant == 'voice-to-image' && full_to_short_variants.has('image-to-word')) {
                    full_variant = randomChoice(['voice-to-image', 'image-to-word']);
                }
                else if (full_variant == 'audio-to-word' && full_to_short_variants.has('word-to-image') &&
                         state1_check_for_dict(state1_audios_for_images, variant_data[0], variant_data[1], variant_data[3])) {
                    full_variant = randomChoice(['audio-to-word', 'word-to-image']);
                }
                else if (full_variant == 'audio-to-image' && full_to_short_variants.has('image-to-word')) {
                    full_variant = randomChoice(['audio-to-image', 'image-to-word']);
                }
                short_variant = full_to_short_variants.get(full_variant);
            }
            let category_element_mode_active = 0;
            if (full_variant == 'image-to-word' || full_variant == 'audio-to-word' || full_variant == 'voice-to-word') {
                if (st1_image_voice_word_to_category == combo_enable_only_disable.Only) {
                    category_element_mode_active = randomChoice([1, 2]);
                }
                else if (st1_image_voice_word_to_category == combo_enable_only_disable.Enable) {
                    category_element_mode_active = randomChoice([0, 1, 2]);
                }
            }
            if (category_element_mode_active && (
                variant_data[0] == 'Adjectives' ||
                variant_data[0] == 'Baby' ||
                variant_data[0] == 'Bedroom' ||
                variant_data[0] == 'Holidays' ||
                variant_data[0] == 'Verbs' ||
                variant_data[1] == 'Stages'
            ) && st1_image_voice_word_to_category != combo_enable_only_disable.Only) {
                category_element_mode_active = 0;
            }
            if (st1_image_voice_hard_mode == combo_enable_disable.Enable) {
                text += prev_n + "-Back [" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + "]\n\n";
            }
            else if (category_element_mode_active) {
                text += prev_n + "-Back (" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ")\n\n";
                let element_name = '***';
                if (short_variant == 'image' || st1_n === 0) {
                    element_name = variant_data[3];
                }
                text += 'Element: ' + element_name + '\n';
            }
            else {
                text += prev_n + "-Back (" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ")\n\n";
                text += 'Category: ' + variant_data[1] + '\n';
            }
            explanation = variant_data[0] + " > " + variant_data[1] + " > " + variant_data[3];
            if (skip_mode === false) {
                let choose_text = '';
                let options = variant_data[4];
                if (category_element_mode_active == 0) {
                    expected = variant_data[3];
                    choose_text = "Choose element:\n";
                }
                else {
                    expected = category_element_mode_active == 1 ? variant_data[0] : variant_data[1];
                    let i = 0, new_options = [];
                    for (let x of options) {
                        if (x[3] == variant_data[3]) {
                            new_options.push([x[0], x[1], '', expected]);
                        }
                        else {
                            new_options.push([x[0], x[1], x[2], x[3]]);
                        }
                        ++i;
                    }
                    options = new_options;
                    choose_text = "Choose category:\n";
                }
                options = randomShuffle(options);
                let options_by_first = [];
                let i = 0;
                for (let x of options) {
                    if (x[3] == expected) {
                        explanation = '[' + (i + 1) + '] ' + explanation;
                    }
                    options_by_first.push([x[3]]);
                    i += 1;
                }
                let images_used = false;
                if (full_variant == 'image-to-word' || full_variant == 'audio-to-word' || full_variant == 'voice-to-word') {
                    options = options_by_first;
                    text += choose_text;
                    text += textToLines(convertOptionsToString(options_by_first), 100, 1, true);
                }
                else if (full_variant == 'word-to-image' || full_variant == 'audio-to-image' || full_variant == 'voice-to-image') {
                    text += choose_text.slice(0, -2);
                    images_used = true;
                }
                text += '\n';
                updateChooser(options, images_used);
                lines.push("N=" + prev_n + ", " + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ": " +
                           capitalize(full_variant) + ': ' + variant_data[0] + " > " + variant_data[1] + " > " + variant_data[3]);
            }
        }
        else if (short_variant == 'word') {
            // [[word_capitalized, task1, task2, expected_capitalized, explanation, options_list], [word, definition]]
            if (st1_word_hard_mode == combo_enable_disable.Enable) {
                text += prev_n + "-Back [" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + "]\n\n";
            }
            else {
                text += prev_n + "-Back (" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ")\n\n";
            }
            if (skip_mode === false) {
                if (n_prev_task != current_task && st1_word_mode_random_bool) {
                    let new_full_variants = [full_variant];
                    if (full_variant == 'word-to-word' || full_variant == 'word-to-synonym' ||
                        full_variant == 'word-to-antonym' || full_variant == 'word-to-similar-word') {
                        new_full_variants = [...short_to_full_variant.get('word')];
                        let p = new_full_variants.indexOf('find-word-in-sentence');
                        if (p > -1) {
                            new_full_variants.pop(p);
                        }
                    }
                    word_generator.next();
                    let gen_next = word_generator.next([new_full_variants, variant_data[1][0], variant_data[1][1]]);  // [variant, word]
                    if (!(gen_next.done ?? true)) {
                        variant_data = gen_next.value;
                        full_variant = gen_next.value[2];
                        n_prev_task = [short_variant, full_variant, variant_data];
                    }
                }
                expected = variant_data[0][3]; // [word, task1, task2, expected, explanation, options]
                explanation = variant_data[0][4] ? ('\n' + variant_data[0][4]) : '';
                let options = variant_data[0][5];
                options = randomShuffle(options);
                updateChooser(options);
                if (n_prev_task == current_task) {
                    text += variant_data[0][1] + '\n';
                }
                text += variant_data[0][2] + '\n' + textToLines(convertOptionsToString(options), 100, 1, true) + '\n';
                let line = "N=" + prev_n + ", " + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ": ";
                if (full_variant == 'word-to-word') {
                    line += capitalize(full_variant) + ': ' + capitalize(variant_data[0][0]);
                }
                else if (full_variant == 'meaning-to-word') {
                    let meaning = variant_data[1][1][1];
                    meaning = meaning ? (' - ' + meaning) : '';
                    line += capitalize(full_variant) + ': ' + capitalize(variant_data[0][0]) + meaning;
                }
                else if (full_variant == 'find-word-in-sentence') {
                    let sentence = variant_data[1][1][2];
                    sentence = sentence ? (': ' + sentence) : '';
                    line += capitalize(full_variant) + ': ' + capitalize(variant_data[0][0]) + sentence;
                }
                else {
                    line += capitalize(full_variant) + ': ' + capitalize(variant_data[0][0]) + ' -> ' + variant_data[0][3];
                }
                lines.push(line);
            }
        }
        short_variant = current_task[0];
        full_variant = current_task[1];
        variant_data = current_task[2];
        if (n_prev_task != current_task && short_variant != 'audio' && short_variant != 'voice') {
            text += '\n';
        }
        if (short_variant == 'image') {
            if (full_variant == 'word-to-image') {
                text += 'Next word: ' + variant_data[3] + '\n';
            }
            else if (full_variant == 'image-to-word') {
                let image_path = variant_data[2];
                let img = imageDiv?.firstChild;
                img.src = image_path;
                img.alt = image_path;
                imageDiv.style.display = '';
            }
        }
        else if (short_variant == 'audio') {
            audioButton.category1 = variant_data[0];
            audioButton.category2 = variant_data[1];
            audioButton.title = variant_data[3];
            audioButton.onmouseup();
            audioDiv.style.display = '';
        }
        else if (short_variant == 'voice') {
            voiceButton.voice_text = variant_data[3];
            voiceButton.voice_index = st1_voice_index;
            voiceButton?.onmouseup();
            voiceDiv.style.display = '';
        }
        else if (short_variant == 'word') {
            if (current_task != n_prev_task || skip_mode) {
                text += variant_data[0][1] + '\n';
            }
        }
        updateLastHistoryItem([lines.join("\n")]);

        show_trial_timer_var = 0;
        answer_trial_timer_var = 0;
        if (n_prev_task != current_task) {
            if (current_task[0] == 'image' || current_task[0] == 'audio' || current_task[0] == 'voice') {
                show_trial_timer_var += st1_image_voice_show_trial_time_limit;
            }
            else if (current_task[0] == 'word') {
                show_trial_timer_var += st1_word_mode_show_trial_time_limit;
            }
            if (n_prev_task[0] == 'image' || n_prev_task[0] == 'audio' || n_prev_task[0] == 'voice') {
                if (st1_image_voice_answer_trial_time_limit > 0) {
                    answer_trial_timer_var += show_trial_timer_var + st1_image_voice_answer_trial_time_limit;
                }
            }
            else if (n_prev_task[0] == 'word') {
                if (st1_word_mode_answer_trial_time_limit > 0) {
                    answer_trial_timer_var += show_trial_timer_var + st1_word_mode_answer_trial_time_limit;
                }
            }
        }
        else {
            if (current_task[0] == 'image' || current_task[0] == 'audio' || current_task[0] == 'voice') {
                show_trial_timer_var += st1_image_voice_show_trial_time_limit;
                if (st1_image_voice_answer_trial_time_limit > 0) {
                    answer_trial_timer_var += show_trial_timer_var + st1_image_voice_answer_trial_time_limit;
                }
            }
            else if (current_task[0] == 'word') {
                show_trial_timer_var += st1_word_mode_show_trial_time_limit;
                if (st1_word_mode_answer_trial_time_limit > 0) {
                    answer_trial_timer_var += show_trial_timer_var + st1_word_mode_answer_trial_time_limit;
                }
            }
        }

        if (show_trial_timer_var > 0) {
            showTrialTimerP.innerHTML = '' + show_trial_timer_var;
            showTrialTimerP.style.display = '';
            st1_show_trial_interval = setInterval(function () {
                show_trial_timer_var -= 0.1;
                if (show_trial_timer_var <= 0) {
                    appendText(taskArea, "\n", clearBefore);
                    showTrialTimerP.innerHTML = '&nbsp;';
                    showTrialTimerImg.style.display = '';
                    imageDiv.style.display = 'none';
                    audioDiv.style.display = 'none';
                    voiceDiv.style.display = 'none';
                    clearInterval(st1_show_trial_interval);
                    return;
                }
                else {
                    showTrialTimerP.innerHTML = toFloatString(show_trial_timer_var, 1, 1);
                }
            }, 100);
        }
        else {
            showTrialTimerP.innerHTML = '&nbsp;';
            showTrialTimerP.style.display = 'none';
        }

        if (answer_trial_timer_var > 0) {
            answerTrialTimerP.innerHTML = '' + answer_trial_timer_var;
            answerTrialTimerP.style.display = '';
            st1_answer_trial_interval = setInterval(function () {
                answer_trial_timer_var -= 0.1;
                if (answer_trial_timer_var <= 0) {
                    clearInterval(st1_show_trial_interval);
                    clearInterval(st1_answer_trial_interval);
                    answerTrialTimerP.innerHTML = '&nbsp;';
                    setTimeout(function () {
                        currentGenerator.next('-NO-ANSWER-');
                    }, 0);
                    return;
                }
                else {
                    answerTrialTimerP.innerHTML = toFloatString(answer_trial_timer_var, 1, 1);
                }
            }, 100);
        }
        else {
            answerTrialTimerP.innerHTML = '&nbsp;';
            answerTrialTimerP.style.display = 'none';
        }

        appendText(taskArea, text + "\n");
        taskArea.scrollTop = 0;
        taskArea.scrollLeft = 0;
        while (true) {
            let actual = (yield);
            if (actual === '-NO-ANSWER-') {
                if (skip_mode === true) {
                    mistakeFlag = false;
                }
                else {
                    mistakeFlag = true;
                }
                appendText(taskArea, '', clearBefore);
                break;
            }
            if (actual === '-SKIP-') {
                appendText(taskArea, '', clearBefore);
                break;
            }
            if (actual === '-ANSWER-') {
                appendText(taskArea, 'Answer:\n');
                appendText(taskArea, "Expected: " + expected + '\n');
                if (explanation != '') {
                    appendText(taskArea, "Explanation: " + explanation + '\n');
                }
                continue;
            }
            if (actual === '-RESTART-') {
                auto_increase_counter = 0;
                task_list = [];
                mistakeFlag = false;
                skip_mode = true;
                st1_auto_mode = st1_auto_mode > 0 ? Math.max(st1_auto_mode, st1_n_max) : 0;
                images_generator = imageGetter(state1_images, st1_image_voice_options,
                    st1_image_voice_hard_mode == combo_enable_disable.Enable,
                    not_item_checker, not_variants_checker);
                audios_all_generator = imageGetter(state1_audios_all, st1_image_voice_options,
                    st1_image_voice_hard_mode == combo_enable_disable.Enable,
                    not_item_checker, not_variants_checker);
                audios_for_images_generator = imageGetter(state1_audios_for_images, st1_image_voice_options,
                    st1_image_voice_hard_mode == combo_enable_disable.Enable,
                    not_item_checker, not_variants_checker);
                word_generator = wordGetter(state1_words, st1_word_options,
                    st1_word_hard_mode == combo_enable_disable.Enable);
                appendText(taskArea, '', clearBefore);
                break;
            }
            appendText(taskArea, actual + ' - ');
            let status = actual === expected;
            if (status) {
                if (skip_mode === false) {
                    auto_increase_counter += 1;
                    addScore('ce_st1', st1_n + 1);
                }
                appendText(taskArea, '', clearBefore);
                break;
            }
            else {
                appendText(taskArea, 'No, retry\n');
                mistakeFlag = true;
            }
        }
    }
}

function state2() {
    currentGenerator = null;
    state = 2;
    clearWidgets();
    addWidget(createCaption(statesToNames.st2));
    addWidget(createParameters([
        [
            "Start", "Back", "buttons",
            function (event) {
                state2_start();
            },
            function (event) {
                state2_back();
            },
        ],
        [
            "Increase level", "Decrease", "buttons",
            function (event) {
                let st2_boxes = parseInt(settings['ce_st2_boxes']);
                let st2_operations = parseInt(settings['ce_st2_operations']);
                let st2_min_max_operations = toIntOrIntRange(settings['ce_st2_min_max_operations']);
                let st2_min_operations = st2_min_max_operations[0];
                let st2_max_operations = st2_min_max_operations.length == 2 ? st2_min_max_operations[1] : st2_min_operations;
                if (st2_operations < st2_max_operations) {
                    st2_operations += 1;
                }
                else if (st2_boxes < 30) {
                    st2_operations = st2_min_operations;
                    st2_boxes = st2_boxes + 1;
                }
                setSetting('ce_st2_boxes', st2_boxes);
                document.getElementById('ce_st2_boxes').innerHTML = st2_boxes;
                setSetting('ce_st2_operations', st2_operations);
                document.getElementById('ce_st2_operations').innerHTML = st2_operations;
            },
            function (event) {
                let st2_boxes = parseInt(settings['ce_st2_boxes']);
                let st2_operations = parseInt(settings['ce_st2_operations']);
                let st2_min_max_operations = toIntOrIntRange(settings['ce_st2_min_max_operations']);
                let st2_min_operations = st2_min_max_operations[0];
                let st2_max_operations = st2_min_max_operations.length == 2 ? st2_min_max_operations[1] : st2_min_operations;
                if (st2_operations > st2_min_operations) {
                    st2_operations -= 1;
                }
                else if (st2_boxes > 2) {
                    st2_operations = st2_max_operations;
                    st2_boxes = st2_boxes - 1;
                }
                setSetting('ce_st2_boxes', st2_boxes);
                document.getElementById('ce_st2_boxes').innerHTML = st2_boxes;
                setSetting('ce_st2_operations', st2_operations);
                document.getElementById('ce_st2_operations').innerHTML = st2_operations;
            },
        ],
        ["ce_st2_auto_mode", "<b>Auto mode</b><br>Move to the next level every N successfully completed iterations<br>[0:disable|1-100]", "integer", function (xv) {
            return xv === 0 || 1 <= xv && xv <= 100;
        }],
        ["ce_st2_boxes", "<b>Auto mode</b><br>Number of boxes [2-25]", "integer", function (xv) {
            return 2 <= xv && xv <= 25;
        }],
        ["ce_st2_operations", "<b>Auto mode</b><br>Number of operations [1-5]", "integer", function (xv) {
            return 1 <= xv && xv <= 5;
        }],
        ["ce_st2_min_max_operations", "Min-Max operations [1-5]", "range", function (xv) {
            return xv != null &&
                1 <= xv[0] && xv[0] <= 5 &&
                (xv.length === 1 || 1 <= xv[1] && xv[1] <= 5);
        }],
        ["ce_st2_min_max_number", "Min-Max number of item to add/subtract [1-10]", "range", function (xv) {
            return xv != null &&
                1 <= xv[0] && xv[0] <= 10 &&
                (xv.length === 1 || 1 <= xv[1] && xv[1] <= 10);
        }],
        [
            "Default settings", "Clear score", "buttons",
            function (event) {
                if (confirm('Are you sure you want to set the default settings?')) {
                    stateN_defaults('ce_st2');
                    state2();
                }
            },
            function (event) {
                if (confirm('Are you sure you want to clear the scores?')) {
                    stateN_clear_score('ce_st2');
                    state2();
                }
            },
        ],
    ]));
}

function state2_back() {
    state0();
}

function state2_start() {
    clearWidgets();
    addWidget(createCaption(statesToNames.st2));
    let task = createInputElems();
    let taskDiv = task[0];
    let taskArea = task[1];
    addWidget(taskDiv);
    let exButtons = {};
    exButtons['Retry'] = () => { currentGenerator.next('-RETRY-') };
    exButtons['Answer'] = () => { currentGenerator.next('-ANSWER-') };
    exButtons['Values'] = () => { currentGenerator.next('-VALUES-') };
    addWidget(createKeyboard(numbersPanelSymbols, state2, exButtons,
        ['3', '6', '9'], Array.from(numbersPanelSymbols).reduce((a, v) => ({ ...a, [v]: ['w30'] }), {})));
    currentGenerator = state2_generator(taskArea);
    currentGenerator.next();
}

function formatSt2(dict) {
    let lst = [];
    for (const key in dict) {
        lst.push(key + ' of ' + dict[key][1] + ': ' + dict[key][0]);
    }
    return lst.sort().join('\n');
}

function* state2_generator(taskArea) {
    let st2_auto_mode = parseInt(settings['ce_st2_auto_mode']);
    let st2_boxes = parseInt(settings['ce_st2_boxes']);
    let st2_operations = parseInt(settings['ce_st2_operations']);
    let st2_min_max_operations = toIntOrIntRange(settings['ce_st2_min_max_operations']);
    let st2_min_max_number = toIntOrIntRange(settings['ce_st2_min_max_number']);
    let st2_min_operations = st2_min_max_operations[0];
    let st2_max_operations = st2_min_max_operations.length == 2 ? st2_min_max_operations[1] : st2_min_operations;
    let st2_min_number = st2_min_max_number[0];
    let st2_max_number = st2_min_max_number.length == 2 ? st2_min_max_number[1] : st2_min_number;
    st2_operations = Math.min(Math.max(st2_operations, st2_min_operations), st2_max_operations);
    let clearBefore = true, first = true;
    let words = [
        "apples", "apricots", "avocados", "bananas", "blueberries", "broccolis", "cabbages",
        "carrots", "cauliflowers", "cherries", "corns", "cucumbers", "grapefruits", "grapes",
        "juices", "kiwis", "lemons", "lettuces", "limes", "mangos", "onions", "oranges", "papayas",
        "peaches", "pears", "peas", "peppers", "pineapples", "plums", "pomegranates", "potatoes",
        "pumpkins", "radishes", "raspberries", "strawberries", "teas", "tomatoes", "watermelons"
    ];
    let words_generator = wordsGetter(words);
    let dict = new Object();
    let queue = [], iteration = 0;
    for (let i = 1; i <= st2_boxes; ++i) {
        queue.push('Box #' + i);
    }
    let originalQueue = queue.slice();
    appendText(taskArea, "[New] " + st2_boxes + ' boxes, ' + st2_operations + ' operation' + (st2_operations > 1 ? 's' : '') + '\n', clearBefore);
    while (true) {
        let string_elem = queue.pop(0);
        queue.push(string_elem);
        if (dict[string_elem] == undefined) {
            dict[string_elem] = [0, words_generator.next().value];
        }
        appendText(taskArea, string_elem + ' of ' + dict[string_elem][1] + '\n');
        for (let i = 0; i < st2_operations; ++i) {
            let diffNumber = randomInt(st2_min_number, st2_max_number);
            if (dict[string_elem][0] - diffNumber >= 0 && randomInt(1, 6) === 1) {
                appendText(taskArea, '> Remove ' + diffNumber + '\n');
                dict[string_elem][0] -= diffNumber;
            }
            else {
                appendText(taskArea, '> Add ' + diffNumber + '\n');
                dict[string_elem][0] += diffNumber;
            }
        }
        if (first) {
            addHistoryItem([formatSt2(dict)]);
            first = false;
        }
        else {
            updateLastHistoryItem([formatSt2(dict)]);
        }
        let expected = '' + dict[string_elem][0];
        let sequenceModeMistake = false;
        let tries = 1, mistake = false;
        while (true) {
            appendText(taskArea, "Number> ");
            let actual = (yield).toUpperCase();
            appendText(taskArea, actual + '\n');
            if (actual === '-ANSWER-') {
                appendText(taskArea, "Expected: " + expected + '\n');
                continue;
            }
            if (actual === '-VALUES-') {
                appendText(taskArea, formatSt2(dict) + '\n');
                continue;
            }
            if (actual === "-RETRY-") {
                actual = expected;
                sequenceModeMistake = true;
            }
            let status = actual === expected;
            if (status) {
                if (tries <= 1 && sequenceModeMistake === false) {
                    if (mistake === false && string_elem == 'Box #' + st2_boxes) {
                        iteration += 1;
                        addScore('ce_st2', st2_boxes - 1 + st2_operations - 1);
                    }
                    if (st2_auto_mode !== 0 && iteration >= st2_auto_mode) {
                        iteration = 0;
                        if (st2_operations < st2_max_operations) {
                            st2_operations += 1;
                        }
                        else if (st2_boxes < 30) {
                            st2_operations = st2_min_operations;
                            st2_boxes = st2_boxes + 1;
                        }
                        setSetting('ce_st2_boxes', st2_boxes);
                        setSetting('ce_st2_operations', st2_operations);
                        yield* state2_generator(taskArea);
                        return;
                    }
                    break;
                }
                if (sequenceModeMistake === true) {
                    mistake = true;
                    sequenceModeMistake = false;
                    tries = queue.length;
                    queue = originalQueue.slice();
                    appendText(taskArea, "Retry all\n", clearBefore);
                }
                else {
                    --tries;
                }
                string_elem = queue.pop(0);
                queue.push(string_elem);
                if (dict[string_elem] == undefined) {
                    break;
                }
                appendText(taskArea, string_elem + ' of ' + dict[string_elem][1] + '\n');
                expected = '' + dict[string_elem][0];
            }
            else {
                appendText(taskArea, 'No, retry\n');
                sequenceModeMistake = true;
            }
        }
        appendText(taskArea, '', clearBefore);
    }
}

function arrayProduct(...arrays) {
    return arrays.reduce((prevAccumulator, currentArray) => {
        let newAccumulator = [];
        prevAccumulator.forEach(prevAccumulatorArray => {
            currentArray.forEach(currentValue => {
                newAccumulator.push(prevAccumulatorArray.concat([currentValue]));
            });
        });
        return newAccumulator;
    }, [[]]);
}

function arrayRepeat(array, n) {
    let r = [];
    for (let i = 0; i < n; ++i) {
        r.push(array.slice());
    }
    return r;
}

function generateRecursiveRiddle(number_of_statements, level = 8, max_solutions = 1) {
    if (number_of_statements <= 2) {
        return null;
    }
    if (level <= 0 || level >= 8) {
        return null;
    }
    if (max_solutions <= 0) {
        return null;
    }
    let false_true_arg = 1;
    let number_of_stmt_arg = 2;
    let even_odd_arg = 3;
    let stmt_index_arg = 4;
    let first_condition = [[
        `This is a numbered list of ${number_of_statements} statements.`,
        [],
        function (stmt, i, args) {
            return true;
        }
    ]];
    let check_for_exclusive = function (stmt, i, slc) {
        let lst = [];
        for (let i = 0; i < stmt.length; ++i) {
            lst.push([i, stmt[i]]);
        }
        lst = lst.sliceExt(...slc);
        for (let [x, _] of lst) {
            if (x === i) {
                return false;
            }
        }
        return true;
    }
    let first_level = [
        // "Exactly X of the previous/next statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(null, i);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the previous statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i + 1);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the next statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "Exactly X of the first/last/previous/next Y statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(null, args[2]);
                if (slice.length == args[2] && args[2] > args[1] && args[2] > 1 && check_for_exclusive(stmt, i, [null, args[2]])) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the first ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(-args[2]);
                if (slice.length == args[2] && args[2] > args[1] && args[2] > 1 && check_for_exclusive(stmt, i, [-args[2], null])) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the last ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i - args[2], i);
                if (slice.length == args[2] && args[2] > args[1] && args[2] > 1) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the previous ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i + 1, i + 1 + args[2]);
                if (slice.length == args[2] && args[2] > args[1] && args[2] > 1) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the next ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "Exactly X of the even/odd statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(0 + args[2], null, 2);
                if (slice.length >= args[1] && check_for_exclusive(stmt, i, [0 + args[2], null, 2])) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "Exactly X of the previous/next even/odd statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(0 + args[2], i, 2);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the previous ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i + 1 + ((i % 2) == args[2]), null, 2);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the next ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "Exactly W of the statements X, Y and Z is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, stmt_index_arg, stmt_index_arg, stmt_index_arg],
            function (stmt, i, args) {
                let slice = args.sliceExt(2);
                let set = new Set();
                set.add(i);
                set.add(args[2]);
                set.add(args[3]);
                set.add(args[4]);
                if (set.size === 4 && args[1] <= 3) {
                    let x1 = stmt[i];
                    let x2 = slice.map((k) => stmt[k] == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the statements ${args[2] + 1}, ${args[3] + 1} and ${args[4] + 1} ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
    ];
    let second_level = [
        // "Either statement X or statement Y is true/false, but not both."
        [
            [stmt_index_arg, stmt_index_arg, false_true_arg],
            function (stmt, i, args) {
                if (i != args[0] && i != args[1] && args[0] != args[1]) {
                    let x1 = stmt[i];
                    let x2 = ((stmt[args[0]] == args[2]) ^ (stmt[args[1]] == args[2]));
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Either statement ${args[0] + 1} or statement ${args[1] + 1} is ${args[2] ? 'true' : 'false'}, but not both.`;
            }
        ],
        // "Either statement X or statement Y is true/false, or both."
        [
            [stmt_index_arg, stmt_index_arg, false_true_arg],
            function (stmt, i, args) {
                if (i != args[0] && i != args[1] && args[0] != args[1]) {
                    let x1 = stmt[i];
                    let x2 = ((stmt[args[0]] == args[2]) || (stmt[args[1]] == args[2]));
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Either statement ${args[0] + 1} or statement ${args[1] + 1} is ${args[2] ? 'true' : 'false'}, or both.`;
            }
        ],
        // "Statements X and Y are either both true or both false."
        [
            [stmt_index_arg, stmt_index_arg],
            function (stmt, i, args) {
                if (i != args[0] && i != args[1] && args[0] != args[1]) {
                    let x1 = stmt[i];
                    let x2 = stmt[args[0]] == stmt[args[1]];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Statements ${args[0] + 1} and ${args[1] + 1} are either both true or both false.`;
            }
        ],
    ];
    let third_level = [
        // "At least X or more of the previous/next statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(null, i);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the previous statements ${args[2] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i + 1);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the next statements ${args[2] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "At most X or fewer of the previous/next statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(null, i);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the previous statements ${args[2] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i + 1);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the next statements ${args[2] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "At least X or more of the first/last/previous/next Y statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(null, args[2]);
                if (slice.length === args[2] && args[2] > args[1] && args[2] > 1 && check_for_exclusive(stmt, i, [null, args[2]])) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the first ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(-args[2]);
                if (slice.length === args[2] && args[2] > args[1] && args[2] > 1 && check_for_exclusive(stmt, i, [-args[2], null])) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the last ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i - args[2], i);
                if (slice.length === args[2] && args[2] > args[1] && args[2] > 1) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the previous ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i + 1, i + 1 + args[2]);
                if (slice.length === args[2] && args[2] > args[1] && args[2] > 1) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the next ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "At most X or fewer of the first/last/previous/next Y statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(null, args[2]);
                if (slice.length === args[2] && args[2] > args[1] && args[2] > 1 && check_for_exclusive(stmt, i, [null, args[2]])) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the first ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(-args[2]);
                if (slice.length === args[2] && args[2] > args[1] && args[2] > 1 && check_for_exclusive(stmt, i, [-args[2], null])) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the last ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i - args[2], i);
                if (slice.length === args[2] && args[2] > args[1] && args[2] > 1) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the previous ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, number_of_stmt_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i + 1, i + 1 + args[2]);
                if (slice.length === args[2] && args[2] > args[1] && args[2] > 1) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the next ${args[2]} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "At least X or more of the even/odd statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(args[2], null, 2);
                if (slice.length >= args[1] && check_for_exclusive(stmt, i, [args[2], null, 2])) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "At most X or fewer of the even/odd statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(args[2], null, 2);
                if (slice.length >= args[1] && check_for_exclusive(stmt, i, [args[2], null, 2])) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "At least X or more of the previous/next even/odd statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(args[2], i, 2);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the previous ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i + 1 + ((i % 2) == args[2]), null, 2);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the next ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "At most X or fewer of the previous/next even/odd statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(args[2], i, 2);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the previous ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = stmt.sliceExt(i + 1 + ((i % 2) == args[2]), null, 2);
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the next ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
    ];
    let fourth_level = [
        // "Exactly X of the previous/next or even/odd or previous/next even/odd statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = [];
                let false_condition = false;
                for (let k = 0; k < stmt.length; ++k) {
                    if (k < i || k % 2 === 0 && args[2] == false || k % 2 !== 0 && args[2] == true) {
                        slice.push(stmt[k]);
                        if (k === i) {
                            false_condition = true;
                            break;
                        }
                    }
                }
                if (false_condition) {
                    return false;
                }
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the previous or ${args[2] ? 'even' : 'odd'} or previous ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = [];
                let false_condition = false;
                for (let k = 0; k < stmt.length; ++k) {
                    if (k > i || k % 2 === 0 && args[2] == false || k % 2 !== 0 && args[2] == true) {
                        slice.push(stmt[k]);
                        if (k === i) {
                            false_condition = true;
                            break;
                        }
                    }
                }
                if (false_condition) {
                    return false;
                }
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() == args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `Exactly ${args[1]} of the next or ${args[2] ? 'even' : 'odd'} or next ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "At least X or more of the previous/next or even/odd or previous/next even/odd statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = [];
                let false_condition = false;
                for (let k = 0; k < stmt.length; ++k) {
                    if (k < i || k % 2 === 0 && args[2] == false || k % 2 !== 0 && args[2] == true) {
                        slice.push(stmt[k]);
                        if (k === i) {
                            false_condition = true;
                            break;
                        }
                    }
                }
                if (false_condition) {
                    return false;
                }
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the previous or ${args[2] ? 'even' : 'odd'} or previous ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = [];
                let false_condition = false;
                for (let k = 0; k < stmt.length; ++k) {
                    if (k > i || k % 2 === 0 && args[2] == false || k % 2 !== 0 && args[2] == true) {
                        slice.push(stmt[k]);
                        if (k === i) {
                            false_condition = true;
                            break;
                        }
                    }
                }
                if (false_condition) {
                    return false;
                }
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() >= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At least ${args[1]} or more of the next or ${args[2] ? 'even' : 'odd'} or next ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        // "At most X or fewer of the previous/next or even/odd or previous/next even/odd statements is/are true/false."
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = [];
                let false_condition = false;
                for (let k = 0; k < stmt.length; ++k) {
                    if (k < i || k % 2 === 0 && args[2] == false || k % 2 !== 0 && args[2] == true) {
                        slice.push(stmt[k]);
                        if (k === i) {
                            false_condition = true;
                            break;
                        }
                    }
                }
                if (false_condition) {
                    return false;
                }
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the previous or ${args[2] ? 'even' : 'odd'} or previous ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
        [
            [false_true_arg, number_of_stmt_arg, even_odd_arg],
            function (stmt, i, args) {
                let slice = [];
                let false_condition = false;
                for (let k = 0; k < stmt.length; ++k) {
                    if (k > i || k % 2 === 0 && args[2] == false || k % 2 !== 0 && args[2] == true) {
                        slice.push(stmt[k]);
                        if (k === i) {
                            false_condition = true;
                            break;
                        }
                    }
                }
                if (false_condition) {
                    return false;
                }
                if (slice.length > args[1]) {
                    let x1 = stmt[i];
                    let x2 = slice.map((x) => x == args[0]).sum() <= args[1];
                    let s = x1 + x2;
                    return s === 0 || s === 2;
                }
                return false;
            },
            function (stmt, i, args) {
                return `At most ${args[1]} or fewer of the next or ${args[2] ? 'even' : 'odd'} or next ${args[2] ? 'even' : 'odd'} statements ${args[1] > 1 ? 'are' : 'is'} ${args[0] ? 'true' : 'false'}.`;
            }
        ],
    ];
    let stmt_conditions = [...first_level];
    if (level >= 2) {
        stmt_conditions.push(...second_level);
    }
    if (level >= 3) {
        stmt_conditions.push(...third_level);
    }
    if (level >= 4) {
        stmt_conditions.push(...fourth_level);
    }
    if (level >= 5) {
        stmt_conditions = stmt_conditions.slice(first_level.length);
    }
    if (level >= 6) {
        stmt_conditions = stmt_conditions.slice(second_level.length);
    }
    if (level >= 7) {
        stmt_conditions = stmt_conditions.slice(third_level.length);
    }
    let products = arrayProduct(...arrayRepeat([false, true], number_of_statements));
    let args_list = [];
    for (let [args, check_function, format_function] of stmt_conditions) {
        let all_args = [];
        for (let arg of args) {
            if (arg == false_true_arg || arg == even_odd_arg) {
                let new_all_args = [];
                if (all_args.length > 0) {
                    for (let x of all_args) {
                        for (let y of [false, true]) {
                            new_all_args.push(x.concat([y]));
                        }
                    }
                }
                else {
                    new_all_args = [[false], [true]];
                }
                all_args = new_all_args;
            }
            else if (arg == number_of_stmt_arg || arg == stmt_index_arg) {
                let k = 0 + (arg == number_of_stmt_arg);
                let new_all_args = [];
                if (all_args.length > 0) {
                    for (let x of all_args) {
                        for (let y of range(k, number_of_statements)) {
                            new_all_args.push(x.concat([y]));
                        }
                    }
                }
                else {
                    for (let y of range(k, number_of_statements)) {
                        new_all_args.push([y]);
                    }
                }
                all_args = new_all_args;
            }
        }
        if (all_args.length === 0) {
            all_args = [[]];
        }
        all_args = randomShuffle(all_args);
        args_list.push([all_args.sliceExt(0, 100), check_function, format_function]);
    }
    let stmt_values = [];
    let statements = [];
    let fail = true;
    while (fail) {
        let statements_values = [];
        while (statements_values.length === 0) {
            statements_values = [];
            for (let _ of range(1, number_of_statements)) {
                statements_values.push(randomChoice([false, true]));
            }
        }
        statements_values = [true].concat(statements_values);
        let stmt_variants = [first_condition];
        for (let i of range(1, number_of_statements)) {
            let variants = [];
            for (let [all_args, check_function, format_function] of args_list) {
                for (let args of all_args) {
                    let r = check_function(statements_values, i, args);
                    if (r === true) {
                        variants.push([format_function(statements_values, i, args), args, check_function]);
                    }
                }
            }
            if (variants.length > 0) {
                variants = randomShuffle(variants);
                stmt_variants.push(variants.sliceExt(0, 2));
                continue;
            }
            stmt_variants = [];
            break;
        }
        if (stmt_variants.length === 0) {
            continue;
        }
        let d = new Map();
        for (let [stmt_index, variants] of stmt_variants.entries()) {
            for (let [string, args, check_function] of variants) {
                let products_indices = [];
                for (let [i, prod] of products.entries()) {
                    let r = check_function(prod, stmt_index, args);
                    if (r === true) {
                        products_indices.push(i);
                    }
                }
                if (products_indices.length > 0) {
                    if (d.has(stmt_index) === false) {
                        d.set(stmt_index, new Map());
                    }
                    if (d.get(stmt_index).has(string) === false) {
                        d.get(stmt_index).set(string, new Set());
                    }
                    let tmp = d.get(stmt_index).get(string);
                    for (let x of products_indices) {
                        tmp.add(x);
                    }
                }
            }
            if (d.has(stmt_index) === false) {
                break;
            }
        }
        if (d.size < number_of_statements) {
            continue;
        }
        let tmp_list = [];
        for (let spi of d.values()) {
            tmp_list.push([...spi.entries()]);
        }
        let products_spi = arrayProduct(...tmp_list);
        for (let product_spi of products_spi) {
            let product_pis = new Set(product_spi[0][1]);
            for (let [_, p_pi] of product_spi.sliceExt(1)) {
                product_pis = setIntersection(product_pis, p_pi);
                if (product_pis.size === 0) {
                    break;
                }
            }
            if (product_pis.size === 0 || product_pis.size > max_solutions) {
                continue;
            }
            stmt_values = [];
            let false_check = false;
            for (let pis of product_pis) {
                let item = products[pis];
                stmt_values.push(item);
                if (item[0] === false) {
                    false_check = true;
                    break;
                }
            }
            if (false_check) {
                continue;
            }
            fail = false;
            statements = [];
            for (let t of product_spi) {
                statements.push(t[0]);
            }
            break;
        }
    }
    return [stmt_values, statements];
}

function state3() {
    clearInterval(st3_show_puzzle_interval);
    clearInterval(st3_answer_puzzle_interval);
    choose_template('3', null);
    currentGenerator = null;
    state = 3;
    clearWidgets();
    addWidget(createCaption(statesToNames.st3));
    addWidget(createParameters([
        [
            "Save & Start", "Back", "buttons",
            function (event) {
                save_template('3');
                state3_start();
            },
            function (event) {
                state3_back();
            },
        ],
        [
            "ce_st3_template_choose", "ce_st3_template_new", "template_choose_new",
            function (event) {
                choose_template('3', event.target.value);
                state3();
            },
            function (event) {
                new_template('3');
                state3();
            },
        ],
        [
            "ce_st3_template_save", "ce_st3_template_delete", "template_save_delete",
            function (event) {
                save_template('3');
            },
            function (event) {
                if (confirm('Are you sure you want to delete the template?')) {
                    delete_template('3');
                    state3();
                }
            },
        ],
        ["", "", "hr"],
        [
            "Increase level", "Decrease", "buttons",
            function (event) {
                let st3_stn = parseInt(settings['ce_st3_current_number_of_statements']);
                let st3_current_level = parseInt(settings['ce_st3_current_level']);
                let st3_minmax_stmts = toIntOrIntRange(settings['ce_st3_min_max_number_of_statements']);
                let st3_minmax_level = toIntOrIntRange(settings['ce_st3_min_max_level']);
                let stmts_min = st3_minmax_stmts[0];
                let stmts_max = st3_minmax_stmts.length === 2 ? st3_minmax_stmts[1] : stmts_min;
                let level_min = st3_minmax_level[0];
                let level_max = st3_minmax_level.length === 2 ? st3_minmax_level[1] : level_min;
                let n_statements = Math.max(4, Math.min(stmts_max, Math.max(stmts_min, st3_stn)));
                let level = Math.min(7, Math.min(level_max, Math.max(level_min, st3_current_level)));
                if (level >= level_max && n_statements < stmts_max) {
                    n_statements += 1;
                    level = level_min;
                }
                else if (level < level_max) {
                    level += 1;
                }
                setSetting('ce_st3_current_number_of_statements', n_statements);
                document.getElementById('ce_st3_current_number_of_statements').innerHTML = n_statements;
                setSetting('ce_st3_current_level', level);
                document.getElementById('ce_st3_current_level').innerHTML = level;
            },
            function (event) {
                let st3_stn = parseInt(settings['ce_st3_current_number_of_statements']);
                let st3_current_level = parseInt(settings['ce_st3_current_level']);
                let st3_minmax_stmts = toIntOrIntRange(settings['ce_st3_min_max_number_of_statements']);
                let st3_minmax_level = toIntOrIntRange(settings['ce_st3_min_max_level']);
                let stmts_min = st3_minmax_stmts[0];
                let stmts_max = st3_minmax_stmts.length === 2 ? st3_minmax_stmts[1] : stmts_min;
                let level_min = st3_minmax_level[0];
                let level_max = st3_minmax_level.length === 2 ? st3_minmax_level[1] : level_min;
                let n_statements = Math.max(4, Math.min(stmts_max, Math.max(stmts_min, st3_stn)));
                let level = Math.min(7, Math.min(level_max, Math.max(level_min, st3_current_level)));
                if (level <= level_min && n_statements > stmts_min) {
                    n_statements -= 1;
                    level = level_max;
                }
                else if (level > level_min) {
                    level -= 1;
                }
                setSetting('ce_st3_current_number_of_statements', n_statements);
                document.getElementById('ce_st3_current_number_of_statements').innerHTML = n_statements;
                setSetting('ce_st3_current_level', level);
                document.getElementById('ce_st3_current_level').innerHTML = level;
            },
        ],
        ["ce_st3_auto_mode", "<b>Auto mode</b><br>Move to the next level every N successfully solved puzzles<br>[0:disable|1-100]", "integer", function (xv) {
            return xv === 0 || 1 <= xv && xv <= 100;
        }],
        ["ce_st3_current_number_of_statements", "<b>Auto mode</b><br>Current number of statements [4-12]", "integer", function (xv) {
            return 4 <= xv && xv <= 12;
        }],
        ["ce_st3_current_level", "<b>Auto mode</b><br>Current level [1-7]", "integer", function (xv) {
            return 1 <= xv && xv <= 7;
        }],
        ["", "", "hr"],
        ["ce_st3_min_max_number_of_statements", "Min-Max number of statements [4-12]", "range", function (xv) {
            return xv != null &&
                4 <= xv[0] && xv[0] <= 12 &&
                (xv.length === 1 || 4 <= xv[1] && xv[1] <= 12);
        }],
        ["ce_st3_min_max_level", "Min-Max level [1-7]", "range", function (xv) {
            return xv != null &&
                1 <= xv[0] && xv[0] <= 7 &&
                (xv.length === 1 || 1 <= xv[1] && xv[1] <= 7);
        }],
        ["ce_st3_max_solutions", "Max solutions [1-10]", "integer", function (xv) {
            return 1 <= xv && xv <= 10;
        }],
        ["ce_st3_show_puzzle_time_limit", "Show puzzle time limit<br>(in seconds)<br>[0:disable|1-86400]", "float", function (xv) {
            return xv === 0 || 0.1 <= xv && xv <= 86400;
        }],
        ["ce_st3_answer_puzzle_time_limit", "Answer puzzle time limit<br>(in seconds)<br>[0:disable|1-86400]", "float", function (xv) {
            return xv === 0 || 0.1 <= xv && xv <= 86400;
        }],
        ["", "", "hr"],
        ["ce_state3_wrap", "Wrap text", "combobox", Object.values(combo_enable_disable)],
        [
            "Default settings", "Clear score", "buttons",
            function (event) {
                if (confirm('Are you sure you want to set the default settings for the current template?')) {
                    stateN_defaults('ce_st3');
                    state3();
                }
            },
            function (event) {
                if (confirm('Are you sure you want to clear the scores?')) {
                    stateN_clear_score('ce_st3');
                    state3();
                }
            },
        ],
    ]));
    refill_templates('3');
    addWidget(document.createElement('br'));
    addWidget(document.createElement('br'));
    let link = document.createElement('a');
    link.href = 'https://github.com/quint-t/Recursive-Puzzle-Generator';
    link.target = '_blank';
    link.innerHTML = 'quint-t / Recursive-Puzzle-Generator';
    addWidget(link);
    addWidget(document.createElement('br'));
    addWidget(document.createElement('br'));
}

function state3_back() {
    state0();
}

function state3_start() {
    clearWidgets();
    addWidget(createCaption(statesToNames.st3));
    let task = createInputElems(settings['ce_state3_wrap'] == combo_enable_disable.Enable);
    let taskDiv = task[0];
    let taskArea = task[1];
    let fs = parseInt(settings['ce_state3_font_size']);
    taskArea.style.fontSize = isFinite(fs) ? fs + 'px' : '16px';
    addWidget(taskDiv);
    addWidget(createTableOfSelects(state3, {
        'Skip': () => {
            taskArea.innerHTML = 'Generating...\n';
            setTimeout(function () {
                updateTableOfSelects(currentGenerator.next('-SKIP-').value);
            }, 50);
        },
        'Answer': () => { currentGenerator.next('-ANSWER-') },
        '+': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(7, fs + 1));
            setSetting('ce_state3_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
            appendText(taskArea, '', false, 0);
        },
        '-': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(7, fs - 1));
            setSetting('ce_state3_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
            appendText(taskArea, '', false, 0);
        },
    }));
    taskArea.innerHTML = 'Generating...\n';
    setTimeout(function () {
        currentGenerator = state3_generator(taskArea);
        updateTableOfSelects(currentGenerator.next().value);
    }, 50);
}

function* state3_generator(taskArea) {
    let st3_auto_mode = parseInt(settings['ce_st3_auto_mode']);
    let st3_stn = parseInt(settings['ce_st3_current_number_of_statements']);
    let st3_current_level = parseInt(settings['ce_st3_current_level']);
    let st3_minmax_stmts = toIntOrIntRange(settings['ce_st3_min_max_number_of_statements']);
    let st3_minmax_level = toIntOrIntRange(settings['ce_st3_min_max_level']);
    let st3_max_solutions = parseInt(settings['ce_st3_max_solutions']);
    let stmts_min = st3_minmax_stmts[0];
    let stmts_max = st3_minmax_stmts.length === 2 ? st3_minmax_stmts[1] : stmts_min;
    let level_min = st3_minmax_level[0];
    let level_max = st3_minmax_level.length === 2 ? st3_minmax_level[1] : level_min;
    let clearBefore = true;
    let n_statements = Math.max(4, Math.min(stmts_max, Math.max(stmts_min, st3_stn)));
    let level = Math.min(7, Math.min(level_max, Math.max(level_min, st3_current_level)));
    setSetting('ce_st3_current_number_of_statements', n_statements);
    setSetting('ce_st3_current_level', level);
    save_template('3');
    let showPuzzleTimerP = document.getElementById('showPuzzleTimerP');
    let answerPuzzleTimerP = document.getElementById('answerPuzzleTimerP');
    var show_puzzle_timer_var = 0;
    var answer_puzzle_timer_var = 0;
    let st3_show_puzzle_time_limit = parseInt(settings['ce_st3_show_puzzle_time_limit']);
    let st3_answer_puzzle_time_limit = parseInt(settings['ce_st3_answer_puzzle_time_limit']);
    let auto_increase_counter = 0;
    while (true) {
        let [solutions, statements] = generateRecursiveRiddle(n_statements, level, st3_max_solutions);
        let header = [''].concat(range(2, n_statements + 1).map(x => '' + x));
        let htmlTable = [header, ['Value']];
        for (let _ of header.slice(1)) {
            htmlTable[1].push(['True', 'False']);
        }
        let solutions_strings = [];
        let expected_array = [];
        solutions.forEach((x) => {
            item = x.slice(1).join('_');
            let sol = [];
            x.slice(1).forEach((sol_item, index) => {
                sol.push(((index + 2) + '-').concat(sol_item === true ? 'True' : 'False'));
            });
            solutions_strings.push(sol.join(', '));
            expected_array.push([false, item]);
        });
        let answer = solutions_strings.join('\n');
        let puzzle_text = '.:: Puzzle statements=' + n_statements + ' level=' + level + ' (' + solutions.length + ' solution' + (solutions.length > 1 ? 's' : '') + ') ::.\n';
        let pad = ('' + statements.length).length;
        statements.forEach((statement, index) => {
            let i = ('' + (index + 1)).padStart(pad);
            puzzle_text = puzzle_text.concat(i + '. ' + statement + '\n');
        });
        appendText(taskArea, puzzle_text + '\n', clearBefore);
        addHistoryItem([puzzle_text + '\n' + "Answer:\n" + answer]);
        taskArea.scrollTop = 0;
        taskArea.scrollLeft = 0;
        let first = true;
        let mistake = false, cnt = 1;

        show_puzzle_timer_var = st3_show_puzzle_time_limit;
        if (show_puzzle_timer_var > 0) {
            showPuzzleTimerP.innerHTML = '' + show_puzzle_timer_var;
            st3_show_puzzle_interval = setInterval(function () {
                show_puzzle_timer_var -= 0.1;
                if (show_puzzle_timer_var <= 0) {
                    appendText(taskArea, "Time limit!\n", clearBefore);
                    showPuzzleTimerP.innerHTML = '&nbsp;';
                    clearInterval(st3_show_puzzle_interval);
                    return;
                }
                else {
                    showPuzzleTimerP.innerHTML = toFloatString(show_puzzle_timer_var, 1, 1);
                }
            }, 100);
        }
        else {
            showPuzzleTimerP.innerHTML = '&nbsp;';
            showPuzzleTimerP.style.display = 'none';
        }

        answer_puzzle_timer_var = st3_answer_puzzle_time_limit;
        if (answer_puzzle_timer_var > 0) {
            answer_puzzle_timer_var += st3_show_puzzle_time_limit;
            answerPuzzleTimerP.innerHTML = '' + answer_puzzle_timer_var;
            st3_answer_puzzle_interval = setInterval(function () {
                answer_puzzle_timer_var -= 0.1;
                if (answer_puzzle_timer_var <= 0) {
                    clearInterval(st3_show_puzzle_interval);
                    clearInterval(st3_answer_puzzle_interval);
                    answerPuzzleTimerP.innerHTML = '&nbsp;';
                    setTimeout(function () {
                        currentGenerator.next('-NO-ANSWER-');
                    }, 0);
                    return;
                }
                else {
                    answerPuzzleTimerP.innerHTML = toFloatString(answer_puzzle_timer_var, 1, 1);
                }
            }, 100);
        }
        else {
            answerPuzzleTimerP.innerHTML = '&nbsp;';
            answerPuzzleTimerP.style.display = 'none';
        }

        while (true) {
            let actual = '';
            if (first) {
                actual = yield htmlTable;
                first = false;
            }
            else {
                actual = yield;
            }
            actual = actual.toUpperCase();
            if (actual === '-SKIP-') {
                appendText(taskArea, '', clearBefore);
                break;
            }
            if (actual == '-NO-ANSWER-') {
                appendText(taskArea, '', clearBefore);
                mistake = true;
                break;
            }
            if (actual === '-ANSWER-') {
                appendText(taskArea, "Answer (" + (solutions.length === 1 ? '1 solution' : solutions.length + ' solutions') + "):\n" + answer + '\n');
                continue;
            }
            let solution_found = false;
            for (let i = 0, n = expected_array.length; i < n; ++i) {
                let [sol_status, solution] = expected_array[i];
                solution = solution.toUpperCase();
                if (actual === solution) {
                    solution_found = true;
                    if (sol_status === true) {
                        appendText(taskArea, 'This solution has already been accepted before. Please enter a different one.\n');
                    }
                    else {
                        expected_array[i][0] = true;
                        addScore('ce_st3', n_statements - 1 + Math.floor(level / 3));
                        auto_increase_counter += cnt;
                        cnt = 0;
                        appendText(taskArea, 'Solution accept.\n');
                    }
                    break;
                }
            }
            if (solution_found === false) {
                appendText(taskArea, 'No, retry\n');
                mistake = true;
            }
            let break_condition = true;
            for (let i = 0, n = expected_array.length; i < n; ++i) {
                let [sol_status, solution] = expected_array[i];
                if (sol_status === false) {
                    break_condition = false;
                    break;
                }
            }
            if (break_condition) {
                break;
            }
        }
        if (mistake === false && st3_auto_mode >= 1 && auto_increase_counter >= st3_auto_mode) {
            if (level >= level_max && n_statements < stmts_max) {
                n_statements += 1;
                level = level_min;
            }
            else if (level < level_max) {
                level += 1;
            }
            auto_increase_counter = 0;
            setSetting('ce_st3_current_number_of_statements', n_statements);
            setSetting('ce_st3_current_level', level);
            save_template('3');
        }
        else if (st3_auto_mode === 0) {
            n_statements = randomInt(stmts_min, stmts_max);
            level = randomInt(level_min, level_max);
        }
        else if (mistake === true) {
            auto_increase_counter = Math.max(0, auto_increase_counter - 1);
        }
    }
}

function state4() {
    clearInterval(st4_show_puzzle_interval);
    clearInterval(st4_answer_puzzle_interval);
    choose_template('4', null);
    currentGenerator = null;
    state = 4;
    clearWidgets();
    addWidget(createCaption(statesToNames.st4));
    addWidget(createParameters([
        [
            "Save & Start", "Back", "buttons",
            function (event) {
                save_template('4');
                state4_start();
            },
            function (event) {
                state4_back();
            },
        ],
        [
            "ce_st4_template_choose", "ce_st4_template_new", "template_choose_new",
            function (event) {
                choose_template('4', event.target.value);
                state4();
            },
            function (event) {
                new_template('4');
                state4();
            },
        ],
        [
            "ce_st4_template_save", "ce_st4_template_delete", "template_save_delete",
            function (event) {
                save_template('4');
            },
            function (event) {
                if (confirm('Are you sure you want to delete the template?')) {
                    delete_template('4');
                    state4();
                }
            },
        ],
        ["", "", "hr"],
        [
            "Increase level", "Decrease", "buttons",
            function (event) {
                let st4_current_attributes = parseInt(settings['ce_st4_current_attributes']);
                let st4_current_objects = parseInt(settings['ce_st4_current_objects']);
                let st4_current_level = parseInt(settings['ce_st4_current_level']);
                let st4_minmax_attributes = toIntOrIntRange(settings['ce_st4_min_max_attributes']);
                let st4_minmax_objects = toIntOrIntRange(settings['ce_st4_min_max_objects']);
                let st4_minmax_level = toIntOrIntRange(settings['ce_st4_min_max_level']);
                let st4_min_attributes = st4_minmax_attributes[0];
                let st4_max_attributes = st4_minmax_attributes.length === 2 ? st4_minmax_attributes[1] : st4_min_attributes;
                let st4_min_objects = st4_minmax_objects[0];
                let st4_max_objects = st4_minmax_objects.length === 2 ? st4_minmax_objects[1] : st4_min_objects;
                let st4_min_level = st4_minmax_level[0];
                let st4_max_level = st4_minmax_level.length === 2 ? st4_minmax_level[1] : st4_min_level;
                let n_attributes = Math.min(st4_max_attributes, Math.max(st4_min_attributes, st4_current_attributes));
                let m_objects = Math.min(st4_max_objects, Math.max(st4_min_objects, st4_current_objects));
                let level = Math.min(st4_max_level, Math.max(st4_min_level, st4_current_level));
                let h = n_attributes * m_objects;
                if (m_objects <= 2 && level >= 19 || st4_max_objects <= 2 && st4_min_level >= 19) {
                    alert('Max number of objects must be > 2 or Min Level must be < 19!\n');
                    return;
                }
                let auto_mode_arr = [];
                for (let i = st4_min_attributes; i <= st4_max_attributes; ++i) {
                    for (let j = st4_min_objects; j <= st4_max_objects; ++j) {
                        for (let k = st4_min_level; k <= st4_max_level; ++k) {
                            if (k >= 19 && j <= 2) {
                                continue;
                            }
                            auto_mode_arr.push([i * j, k, j, i]);
                        }
                    }
                }
                if (auto_mode_arr.length === 0) {
                    return;
                }
                auto_mode_arr.sort(function (a, b) {
                    if (a[0] === b[0]) {
                        return a[1] - b[1];
                    }
                    return a[0] - b[0];
                });
                for (let i = 0, n = auto_mode_arr.length; i < n; ++i) {
                    let [h_2, level_2, m_objects_2, n_attributes_2] = auto_mode_arr[i];
                    if (h === h_2 && level === level_2 && m_objects == m_objects_2 && n_attributes === n_attributes_2) {
                        if (i + 1 < n) {
                            [h, level, m_objects, n_attributes] = auto_mode_arr[i + 1];
                        }
                        break;
                    }
                }
                setSetting('ce_st4_current_attributes', n_attributes);
                document.getElementById('ce_st4_current_attributes').innerHTML = n_attributes;
                setSetting('ce_st4_current_objects', m_objects);
                document.getElementById('ce_st4_current_objects').innerHTML = m_objects;
                setSetting('ce_st4_current_level', level);
                document.getElementById('ce_st4_current_level').innerHTML = level;
            },
            function (event) {
                let st4_current_attributes = parseInt(settings['ce_st4_current_attributes']);
                let st4_current_objects = parseInt(settings['ce_st4_current_objects']);
                let st4_current_level = parseInt(settings['ce_st4_current_level']);
                let st4_minmax_attributes = toIntOrIntRange(settings['ce_st4_min_max_attributes']);
                let st4_minmax_objects = toIntOrIntRange(settings['ce_st4_min_max_objects']);
                let st4_minmax_level = toIntOrIntRange(settings['ce_st4_min_max_level']);
                let st4_min_attributes = st4_minmax_attributes[0];
                let st4_max_attributes = st4_minmax_attributes.length === 2 ? st4_minmax_attributes[1] : st4_min_attributes;
                let st4_min_objects = st4_minmax_objects[0];
                let st4_max_objects = st4_minmax_objects.length === 2 ? st4_minmax_objects[1] : st4_min_objects;
                let st4_min_level = st4_minmax_level[0];
                let st4_max_level = st4_minmax_level.length === 2 ? st4_minmax_level[1] : st4_min_level;
                let n_attributes = Math.min(st4_max_attributes, Math.max(st4_min_attributes, st4_current_attributes));
                let m_objects = Math.min(st4_max_objects, Math.max(st4_min_objects, st4_current_objects));
                let level = Math.min(st4_max_level, Math.max(st4_min_level, st4_current_level));
                let h = n_attributes * m_objects;
                if (m_objects <= 2 && level >= 19 || st4_max_objects <= 2 && st4_min_level >= 19) {
                    alert('Max number of objects must be > 2 or Min Level must be < 19!\n');
                    return;
                }
                let auto_mode_arr = [];
                for (let i = st4_min_attributes; i <= st4_max_attributes; ++i) {
                    for (let j = st4_min_objects; j <= st4_max_objects; ++j) {
                        for (let k = st4_min_level; k <= st4_max_level; ++k) {
                            if (k >= 19 && j <= 2) {
                                continue;
                            }
                            auto_mode_arr.push([i * j, k, j, i]);
                        }
                    }
                }
                if (auto_mode_arr.length === 0) {
                    return;
                }
                auto_mode_arr.sort(function (a, b) {
                    if (a[0] === b[0]) {
                        return a[1] - b[1];
                    }
                    return a[0] - b[0];
                });
                for (let i = 0, n = auto_mode_arr.length; i < n; ++i) {
                    let [h_2, level_2, m_objects_2, n_attributes_2] = auto_mode_arr[i];
                    if (h === h_2 && level === level_2 && m_objects == m_objects_2 && n_attributes === n_attributes_2) {
                        if (i - 1 >= 0) {
                            [h, level, m_objects, n_attributes] = auto_mode_arr[i - 1];
                        }
                        break;
                    }
                }
                setSetting('ce_st4_current_attributes', n_attributes);
                document.getElementById('ce_st4_current_attributes').innerHTML = n_attributes;
                setSetting('ce_st4_current_objects', m_objects);
                document.getElementById('ce_st4_current_objects').innerHTML = m_objects;
                setSetting('ce_st4_current_level', level);
                document.getElementById('ce_st4_current_level').innerHTML = level;
            },
        ],
        ["ce_st4_auto_mode", "<b>Auto mode</b><br>Move to the next level every N successfully solved puzzles<br>[0:disable|1-100]", "integer", function (xv) {
            return xv === 0 || 1 <= xv && xv <= 100;
        }],
        ["ce_st4_current_attributes", "<b>Auto mode</b><br>Current attributes [2-5]", "integer", function (xv) {
            return 2 <= xv && xv <= 5;
        }],
        ["ce_st4_current_objects", "<b>Auto mode</b><br>Current objects [2-5]", "integer", function (xv) {
            return 2 <= xv && xv <= 5;
        }],
        ["ce_st4_current_level", "<b>Auto mode</b><br>Current level [1-20]", "integer", function (xv) {
            return 1 <= xv && xv <= 20;
        }],
        ["", "", "hr"],
        ["ce_st4_min_max_attributes", "Min-Max attributes [2-5]", "range", function (xv) {
            return xv != null &&
                2 <= xv[0] && xv[0] <= 5 &&
                (xv.length === 1 || 2 <= xv[1] && xv[1] <= 5);
        }],
        ["ce_st4_min_max_objects", "Min-Max objects [2-5]", "range", function (xv) {
            return xv != null &&
                2 <= xv[0] && xv[0] <= 5 &&
                (xv.length === 1 || 2 <= xv[1] && xv[1] <= 5);
        }],
        ["ce_st4_min_max_level", "Min-Max level [1-20]", "range", function (xv) {
            return xv != null &&
                1 <= xv[0] && xv[0] <= 20 &&
                (xv.length === 1 || 1 <= xv[1] && xv[1] <= 20);
        }],
        ["ce_st4_hard_mode", "Hard mode", "combobox", Object.values(combo_enable_disable)],
        ["ce_st4_max_seconds_to_wait", "Max seconds to wait for generation [0-600]", "integer", function (xv) {
            return 0 <= xv && xv <= 600;
        }],
        ["ce_st4_max_solutions", "Max solutions [1-10]", "integer", function (xv) {
            return 1 <= xv && xv <= 10;
        }],
        ["ce_st4_show_puzzle_time_limit", "Show puzzle time limit<br>(in seconds)<br>[0:disable|1-86400]", "float", function (xv) {
            return xv === 0 || 0.1 <= xv && xv <= 86400;
        }],
        ["ce_st4_answer_puzzle_time_limit", "Answer puzzle time limit<br>(in seconds)<br>[0:disable|1-86400]", "float", function (xv) {
            return xv === 0 || 0.1 <= xv && xv <= 86400;
        }],
        ["", "", "hr"],
        ["ce_state4_wrap", "Wrap text", "combobox", Object.values(combo_enable_disable)],
        [
            "Default settings", "Clear score", "buttons",
            function (event) {
                if (confirm('Are you sure you want to set the default settings for the current template?')) {
                    stateN_defaults('ce_st4');
                    state4();
                }
            },
            function (event) {
                if (confirm('Are you sure you want to clear the scores?')) {
                    stateN_clear_score('ce_st4');
                    state4();
                }
            },
        ],
    ]));
    refill_templates('4');
    addWidget(document.createElement('br'));
    addWidget(document.createElement('br'));
    let link = document.createElement('a');
    link.href = 'https://github.com/quint-t/Puzzle-Generator-and-Solver';
    link.target = '_blank';
    link.innerHTML = 'quint-t / Puzzle-Generator-and-Solver';
    addWidget(link);
    addWidget(document.createElement('br'));
    addWidget(document.createElement('br'));
}

function state4_back() {
    state0();
}

function state4_start() {
    clearWidgets();
    addWidget(createCaption(statesToNames.st4));
    let task = createInputElems(settings['ce_state4_wrap'] == combo_enable_disable.Enable);
    let taskDiv = task[0];
    let taskArea = task[1];
    let fs = parseInt(settings['ce_state4_font_size']);
    taskArea.style.fontSize = isFinite(fs) ? fs + 'px' : '16px';
    addWidget(taskDiv);
    addWidget(createTableOfSelects(state4, {
        'Skip': () => {
            taskArea.innerHTML = 'Generating...\n';
            setTimeout(function () {
                updateTableOfSelects(currentGenerator.next('-SKIP-').value);
            }, 50);
        },
        'Answer': () => { currentGenerator.next('-ANSWER-') },
        '+': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(7, fs + 1));
            setSetting('ce_state4_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
            appendText(taskArea, '', false, 0);
        },
        '-': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(7, fs - 1));
            setSetting('ce_state4_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
            appendText(taskArea, '', false, 0);
        },
    }));
    taskArea.innerHTML = 'Generating...\n';
    setTimeout(function () {
        currentGenerator = state4_generator(taskArea);
        updateTableOfSelects(currentGenerator.next().value);
    }, 50);
}

function setIntersection(setA, setB) {
    let _intersection = new Set();
    for (const elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

function setDifference(setA, setB) {
    let _difference = new Set(setA);
    for (const elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}

function isDeepEqualLLS(list_of_lists_of_sets_1, list_of_lists_of_sets_2) {
    let equals = true;
    for (let i = 0, n = list_of_lists_of_sets_1.length; i < n && equals; ++i) {
        let list_of_sets_1 = list_of_lists_of_sets_1[i];
        let list_of_sets_2 = list_of_lists_of_sets_2[i];
        for (let j = 0, m = list_of_sets_1.length; j < m && equals; ++j) {
            let set_1 = list_of_sets_1[j];
            let set_2 = list_of_sets_2[j];
            for (let x of set_1) {
                if (set_2.has(x) === false) {
                    equals = false;
                    break;
                }
            }
        }
    }
    return equals;
}

function deepCloneLLS(list_of_lists_of_sets) {
    let r_list_of_lists_of_sets = [];
    for (let list_of_sets of list_of_lists_of_sets) {
        let r_list_of_sets = [];
        for (let set of list_of_sets) {
            let r_set = new Set();
            for (let x of set) {
                r_set.add(x);
            }
            r_list_of_sets.push(r_set);
        }
        r_list_of_lists_of_sets.push(r_list_of_sets);
    }
    return r_list_of_lists_of_sets;
}

function updateRange(wns, rns, cmp) {
    let changed = false;
    rns.forEach(rn => {
        let classified_words = new Set();
        rn.forEach((set_of_words) => {
            if (set_of_words.size === 1) {
                classified_words.add(set_of_words.keys().next().value);
            }
        });
        let word_to_cols = {};
        rn.forEach((set_of_words, n_col) => {
            if (set_of_words.size !== 1) {
                let prev_length = set_of_words.size;
                set_of_words = setDifference(set_of_words, classified_words);
                rn[n_col] = set_of_words;
                changed |= prev_length != set_of_words.size;
                set_of_words.forEach(word => {
                    if (word_to_cols[word] == undefined) {
                        word_to_cols[word] = new Set();
                    }
                    word_to_cols[word].add(n_col);
                });
            }
        });
        for (const word in word_to_cols) {
            let cols = word_to_cols[word];
            if (cols.size === 1) {
                x = rn[cols.keys().next().value];
                if (x.size != 1) {
                    x.clear();
                    x.add(word);
                    changed = true;
                }
            }
        }
    });
    let new_rns = [];
    for (let i = 0, n = wns.length; i < n; ++i) {
        let wn = wns[i];
        let rn = rns[i];
        let new_rn = [];
        for (let xs of rn) {
            new_set = new Set();
            for (let x of xs) {
                if (x != wn) {
                    new_set.add(x);
                }
            }
            new_rn.push(new_set);
        }
        new_rns.push(new_rn);
    }

    let pairs = [];
    for (let i = 0, n = wns.length; i < n; ++i) {
        let wn = wns[i];
        let rn = rns[i];
        let new_pairs = [];
        let break_condition = true;
        rn.forEach((setn, cn) => {
            if (setn.has(wn)) {
                break_condition = false;
                if (pairs.length === 0) {
                    pairs = [[]];
                }
                pairs.forEach(v => {
                    new_pairs.push([...v, cn]);
                });
            }
        });
        pairs = new_pairs;
        if (break_condition) {
            break;
        }
    }
    pairs.forEach(pair => {
        if (cmp(...pair)) {
            for (let i = 0, n = new_rns.length; i < n; ++i) {
                let nrn = new_rns[i];
                let cn = pair[i];
                let wn = wns[i];
                nrn[cn].add(wn);
            }
        }
    });
    for (let i = 0, n = rns.length; i < n; ++i) {
        let rn = rns[i];
        let new_rn = new_rns[i];
        for (let j = 0, m = rn.length; j < m; ++j) {
            let prev_length = rn[j].size;
            rn[j] = setIntersection(rn[j], new_rn[j]);
            changed |= prev_length != rn[j].size;
        }
    }
    return changed;
}

function updateRanges(relations, ranges) {
    let changed = false;
    relations.forEach(relation => {
        let [ins, wns, callable_object, _] = relation;
        changed |= updateRange(
            wns,
            ins.map(i => ranges[i]),
            callable_object);
    });
    return changed;
}

function formatPremise(list_for_format, string_format) {
    let i = 0;
    while (true) {
        let substr = '{' + i + '}';
        let index = string_format.indexOf(substr);
        if (index >= 0) {
            string_format = string_format.replaceAll(substr, list_for_format[i]);
        }
        else {
            if (++i >= list_for_format.length) {
                break;
            }
        }
    }
    return string_format;
}

function generateRiddle(
    table,
    level,
    minimal_conditions = false,
    max_seconds_for_minimizing = 0,
    tries = 10,
    max_solutions = 1) {
    if (level < 1 || level > 20) {
        return null;
    }
    let table_wo_left = table.map(row => row.slice(1, row.length));
    let n_attributes = table_wo_left.length;
    let m_objects = table_wo_left[0].length;
    if (level >= 19 && m_objects === 2) {
        return null;
    }
    else if (m_objects <= 1 || n_attributes <= 0 || tries <= 0) {
        return null;
    }
    let max_milliseconds_for_minimizing = max_seconds_for_minimizing * 1000;
    let center = Math.floor(m_objects / 2);
    let except_flag = true;
    let rules_for_relations = [
        [2, (j1, j2) => j1 === j2, ['{0}:{1} == {2}:{3}', '{2}:{3} == {0}:{1}']],
        [2, (j1, j2) => j1 === j2, ['{0}:{1} == {2}:{3}', '{2}:{3} == {0}:{1}']],
        [2, (j1, j2) => j1 === j2 - 1, ['{0}:{1} is on the left of {2}:{3}']],
        [2, (j1, j2) => j1 === j2 + 1, ['{0}:{1} is on the right of {2}:{3}']],
        [1, (j1) => j1 === 0, ['{0}:{1} is on the far left']],
        [1, (j1, last_index = m_objects - 1) => j1 === last_index,
            ['{0}:{1} is on the far right']],
    ];
    if (m_objects % 2 !== 0) {
        rules_for_relations.push(...[
            [1, (j1, mid = center) => j1 === mid, ['{0}:{1} is in the middle']]
        ]);
    }
    if (level >= 2) {
        rules_for_relations.push(...[
            [3, (j1, j2, j3) => j2 + 1 === j1 && j1 === j3 - 1 || j3 + 1 === j1 && j1 === j2 - 1,
                ['{0}:{1} is between {2}:{3} and {4}:{5}', '{0}:{1} is between {4}:{5} and {2}:{3}']],
        ]);
    }
    if (level >= 3) {
        rules_for_relations.push(...[
            [2, (j1, j2) => j1 === j2 - 1 || j1 === j2 + 1,
                ['{0}:{1} is on the left or right of {2}:{3}']],
            [1, (j1, last_index = m_objects - 1) => j1 === 0 || j1 === last_index,
                ['{0}:{1} is on the far left or far right']],
        ]);
    }
    if (level >= 4) {
        rules_for_relations.push(...[
            [1, (j1) => (j1 + 1) % 2 !== 0, ['{0}:{1} is in an odd position']],
            [1, (j1) => (j1 + 1) % 2 === 0, ['{0}:{1} is in an even position']],
        ]);
    }
    if (level >= 5) {
        rules_for_relations.push(...[
            [2, (j1, j2) => j1 < j2, ['{0}:{1} is somewhere to the left of {2}:{3}']],
            [2, (j1, j2) => j1 > j2, ['{0}:{1} is somewhere to the right of {2}:{3}']],
        ]);
    }
    if (level >= 6) {
        rules_for_relations.push(...[
            [2, (j1, j2) => j1 !== j2, ['{0}:{1} != {2}:{3}', '{2}:{3} != {0}:{1}'], except_flag],
        ]);
    }
    if (level >= 7) {
        rules_for_relations.push(...[
            [3, (j1, j2, j3) => j2 < j1 && j1 < j3 || j3 < j1 && j1 < j2,
                ['{0}:{1} is somewhere between {2}:{3} and {4}:{5}',
                    '{0}:{1} is somewhere between {4}:{5} and {2}:{3}']],
        ]);
    }
    if (level >= 8) {
        rules_for_relations.push(...[
            [2, (j1, j2) => j1 >= j2, ['{0}:{1} is not to the left of {2}:{3}']],
            [2, (j1, j2) => j1 <= j2, ['{0}:{1} is not to the right of {2}:{3}']],
        ]);
    }
    if (level >= 9) {
        rules_for_relations.push(...[
            [2, (j1, j2) => j1 % 2 !== j2 % 2,
                ['{0}:{1} and {2}:{3} have different parity positions',
                    '{2}:{3} and {0}:{1} have different parity positions'], except_flag],
            [2, (j1, j2) => j1 % 2 === j2 % 2,
                ['{0}:{1} and {2}:{3} have the same parity positions',
                    '{2}:{3} and {0}:{1} have the same parity positions'], except_flag],
        ]);
    }
    if (level >= 10) {
        rules_for_relations.push(...[
            [3, (j1, j2, j3) => (j1 === j2 && j1 !== j3) || (j1 !== j2 && j1 === j3),
                ['{0}:{1} == {2}:{3} or {0}:{1} == {4}:{5}, but not both',
                    '{0}:{1} == {4}:{5} or {0}:{1} == {2}:{3}, but not both'], except_flag],
            [3, (j1, j2, j3) => (j1 === j2 && j2 !== j3) || (j1 !== j2 && j2 === j3),
                ['{0}:{1} == {2}:{3} or {2}:{3} == {4}:{5}, but not both',
                    '{2}:{3} == {4}:{5} or {0}:{1} == {2}:{3}, but not both'], except_flag],
        ]);
    }
    if (level >= 11) {
        rules_for_relations.push(...[
            [3, (j1, j2, j3) => j1 === j2 || j1 === j3,
                ['{0}:{1} == {2}:{3} or {0}:{1} == {4}:{5} or both',
                    '{0}:{1} == {4}:{5} or {0}:{1} == {2}:{3} or both'], except_flag],
            [3, (j1, j2, j3) => j1 === j2 || j2 === j3,
                ['{0}:{1} == {2}:{3} or {2}:{3} == {4}:{5} or both',
                    '{2}:{3} == {4}:{5} or {0}:{1} == {2}:{3} or both'], except_flag],
        ]);
    }
    if (level >= 12) {
        rules_for_relations.push(...[
            [3, (j1, j2, j3) => j1 !== j2 || j1 !== j3,
                ['{0}:{1} != {2}:{3} or {0}:{1} != {4}:{5} or both',
                    '{0}:{1} != {4}:{5} or {0}:{1} != {2}:{3} or both'], except_flag],
            [3, (j1, j2, j3) => j1 !== j2 || j2 !== j3,
                ['{0}:{1} != {2}:{3} or {2}:{3} != {4}:{5} or both',
                    '{2}:{3} != {4}:{5} or {0}:{1} != {2}:{3} or both'], except_flag],
        ]);
    }
    if (level >= 13) {
        rules_for_relations.pop(0); // pop '=='
    }
    if (level >= 14) {
        rules_for_relations.pop(0); // pop 'is on the left of'
        rules_for_relations.pop(0); // pop 'is on the right of'
    }
    if (level >= 15) {
        rules_for_relations.pop(0); // pop 'is on the far left'
        rules_for_relations.pop(0); // pop 'is on the far right'
        if (m_objects % 2 !== 0) {
            rules_for_relations.pop(0); // pop 'is in the middle'
        }
    }
    if (level >= 16) {
        rules_for_relations.pop(0); // pop 'is between'
    } if (level >= 17) {
        rules_for_relations.pop(0); // pop 'is on the left or right of'
        rules_for_relations.pop(0); // pop 'is on the far left or far right'
    } if (level >= 18) {
        rules_for_relations.pop(0); // pop 'is in an odd position'
        rules_for_relations.pop(0); // pop 'is in an even position'
    } if (level >= 19) {
        rules_for_relations.pop(0); // pop 'is somewhere to the left of'
        rules_for_relations.pop(0); // pop 'is somewhere to the right of'
    } if (level >= 20) {
        rules_for_relations.pop(0); // pop '!='
    }
    let is_minimized = false;
    let time_elapsed = false;
    let min_solutions = [];
    let min_relations = null;
    let relations = [];
    let solutions = [];
    while (true) {
        let ranges = [];
        table_wo_left.forEach(item => {
            let rng = [];
            item.forEach(_ => {
                rng.push(new Set(item));
            });
            ranges.push(rng);
        });
        relations = [];
        solutions = [];
        let fail = false;
        while (fail === false) {
            let needs_clarification = [];
            let no_solutions = false;
            let solved = true;
            for (let i = 0, n = ranges.length; i < n; ++i) {
                let rng = ranges[i];
                for (let j = 0, m = rng.length; j < m; ++j) {
                    let rs = rng[j];
                    if (rs.size === 0) {
                        no_solutions = true;
                        solved = false;
                        break;
                    }
                    else if (rs.size > 1) {
                        solved = false;
                        needs_clarification.push([i, j]);
                    }
                }
                if (no_solutions) {
                    break;
                }
            }
            solutions = [ranges];
            if (solved || min_relations != null && relations.length >= min_relations.length) {
                tries -= 1;
                if (min_relations == null || relations.length < min_relations.length) {
                    min_relations = relations;
                    min_solutions = solutions;
                }
                if (tries > 0) {
                    fail = true;
                    continue;
                }
            }
            if (tries <= 0) {
                relations = min_relations;
                solutions = min_solutions;
                if (minimal_conditions === false) {
                    break;
                }
                let number_of_relations_min = relations.length;
                let number_of_relations_before = relations.length;
                var start_time = window.performance.now();
                let main_q = [relations];
                while (main_q.length > 0) {
                    let current_relations = main_q.pop();
                    for (let k = 0, n = current_relations.length;
                        k < n; ++k) {
                        let new_ranges = [];
                        table_wo_left.forEach(item => {
                            let rng = [];
                            item.forEach(_ => {
                                rng.push(new Set(item));
                            });
                            new_ranges.push(rng);
                        });
                        let new_relations = current_relations.slice();
                        new_relations.pop(k);
                        let changed = true;
                        while (changed) {
                            changed = updateRanges(new_relations, new_ranges);
                        }
                        let possible_solutions = [];
                        let q = [new_ranges];
                        while (q.length > 0) {
                            let current_ranges = q.pop();
                            no_solutions = false;
                            solved = true;
                            for (let i = 0, n = current_ranges.length; i < n; ++i) {
                                let rng = current_ranges[i];
                                for (let j = 0, m = rng.length; j < m; ++j) {
                                    let rs = rng[j];
                                    if (rs.size === 0) {
                                        no_solutions = true;
                                        solved = false;
                                        break;
                                    }
                                    else if (rs.size > 1) {
                                        solved = false;
                                    }
                                }
                                if (no_solutions) {
                                    break;
                                }
                            }
                            if (no_solutions) {
                                continue;
                            }
                            if (solved) {
                                if (possible_solutions.findIndex(x => isDeepEqualLLS(x, current_ranges)) === -1) {
                                    possible_solutions.push(deepCloneLLS(current_ranges));
                                    if (possible_solutions.length > max_solutions) {
                                        break;
                                    }
                                }
                                continue;
                            }
                            for (let i = 0, n = current_ranges.length; i < n; ++i) {
                                let founded = false;
                                let rng = current_ranges[i];
                                for (let j = 0, m = rng.length; j < m; ++j) {
                                    let rs = rng[j];
                                    if (rs.size > 1) {
                                        founded = true;
                                        rs.forEach(r => {
                                            let new_ranges = deepCloneLLS(current_ranges);
                                            new_ranges[i][j] = new Set([r]);
                                            changed = true;
                                            while (changed) {
                                                changed = updateRanges(new_relations, new_ranges);
                                            }
                                            q.push(new_ranges);
                                        });
                                        break;
                                    }
                                }
                                if (founded) {
                                    break;
                                }
                            }
                        }
                        if (1 <= possible_solutions.length && possible_solutions.length <= max_solutions) {
                            let number_of_relations_after = new_relations.length;
                            if (number_of_relations_min > number_of_relations_after) {
                                number_of_relations_min = number_of_relations_after;
                                relations = new_relations;
                                solutions = possible_solutions;
                                main_q.push(new_relations);
                            }
                        }
                        var finish_time = window.performance.now();
                        if (max_milliseconds_for_minimizing != null &&
                            finish_time >= start_time + max_milliseconds_for_minimizing) {
                            time_elapsed = true;
                            break;
                        }
                    }
                    if (time_elapsed) {
                        break;
                    }
                }
                is_minimized = number_of_relations_min < number_of_relations_before ||
                    time_elapsed === false;
                break;
            }
            if (no_solutions || needs_clarification.length === 0) {
                fail = true;
                continue;
            }
            let itemIndex = randomInt(0, needs_clarification.length - 1);
            let item = needs_clarification.pop(itemIndex);
            let i = item[0], j = item[1];
            let next2_i = null, next2_j = null;
            if (level >= 2 && needs_clarification.length > 0) {
                let next2_item = randomChoice(needs_clarification);
                next2_i = next2_item[0];
                next2_j = next2_item[1];
            }
            let neighbours = [];
            let right_neighbours = [];
            for (let dj = -1; dj <= 1; ++dj) {
                if (j + dj < 0 || j + dj >= m_objects) {
                    continue;
                }
                for (let new_i = 0; new_i < n_attributes; ++new_i) {
                    if (new_i === i && dj === 0) {
                        continue;
                    }
                    let new_item = [new_i, j + dj];
                    neighbours.push(new_item);
                    if (level >= 2 && dj === 1) {
                        right_neighbours.push(new_item);
                    }
                }
            }
            if (neighbours.length === 0) {
                continue;
            }
            let next_item = randomChoice(neighbours);
            let next_i = next_item[0];
            let next_j = next_item[1];
            if (level >= 2 && next2_i == null && right_neighbours.length > 0) {
                let next2_item = randomChoice(right_neighbours);
                next2_i = next2_item[0];
                next2_j = next2_item[1];
            }
            let permutations3 = next2_i != null ? [
                [[i, j], [next_i, next_j], [next2_i, next2_j]], [[i, j], [next2_i, next2_j], [next_i, next_j]],
                [[next_i, next_j], [i, j], [next2_i, next2_j]], [[next_i, next_j], [next2_i, next2_j], [i, j]],
                [[next2_i, next2_j], [i, j], [next_i, next_j]], [[next2_i, next2_j], [next_i, next_j], [i, j]]
            ] : [];
            let permutations2 = next2_i != null ? [
                [[i, j], [next_i, next_j]], [[next_i, next_j], [next2_i, next2_j]], [[i, j], [next2_i, next2_j]],
                [[next_i, next_j], [i, j]], [[next2_i, next2_j], [next_i, next_j]], [[next2_i, next2_j], [i, j]],
            ] : [
                [[i, j], [next_i, next_j]], [[next_i, next_j], [i, j]]
            ];
            let possible_variants = [];
            rules_for_relations.forEach(arg => {
                let n_args = arg[0];
                let cmp_function = arg[1];
                let str_variants = arg[2];
                let except_flag = arg.length >= 4 ? arg[3] : null;
                if (n_args === 3) {
                    permutations3.forEach(items => {
                        let ti = items[0][0];
                        let tj = items[0][1];
                        let t_next_i = items[1][0];
                        let t_next_j = items[1][1];
                        let t_next2_i = items[2][0];
                        let t_next2_j = items[2][1];
                        if (except_flag === true &&
                            (ti === t_next_i ||
                                ti === t_next2_i ||
                                t_next_i === t_next2_i)) {
                            return;
                        }
                        if (cmp_function(tj, t_next_j, t_next2_j)) {
                            possible_variants.push([items, cmp_function, randomChoice(str_variants)]);
                        }
                    });
                }
                else if (n_args === 2) {
                    permutations2.forEach(items => {
                        let ti = items[0][0];
                        let tj = items[0][1];
                        let t_next_i = items[1][0];
                        let t_next_j = items[1][1];
                        if (except_flag === true && ti === t_next_i) {
                            return;
                        }
                        if (cmp_function(tj, t_next_j)) {
                            possible_variants.push([items, cmp_function, randomChoice(str_variants)]);
                        }
                    });
                }
                else if (n_args === 1 && cmp_function(j)) {
                    possible_variants.push([[[i, j]], cmp_function, randomChoice(str_variants)]);
                }
            });
            if (possible_variants.length === 0) {
                continue;
            }
            let variant = randomChoice(possible_variants);
            let list_of_ij = variant[0];
            let cmp_function = variant[1];
            let string_format = variant[2];
            let list_for_format = [], ins = [], wns = [];
            list_of_ij.forEach(ij => {
                let i = ij[0], j = ij[1];
                list_for_format.push(table[i][0]);
                list_for_format.push(table_wo_left[i][j]);
                ins.push(i);
                wns.push(table_wo_left[i][j]);
            });
            relations.push([ins, wns, cmp_function, formatPremise(list_for_format, string_format)]);
            changed = true;
            while (changed) {
                changed = updateRanges(relations, ranges);
            }
        }
        if (!fail) {
            if (minimal_conditions && is_minimized === false && time_elapsed === false) {
                continue;
            }
            break;
        }
    }
    let premises = relations.map(t => t[t.length - 1]);
    randomShuffle(premises);
    return [solutions, premises];
}

function padCenter(str, width) {
    let padding = width - str.length;
    if (padding <= 0) {
        return str;
    }
    let leftPadding = Math.floor(padding / 2);
    let rightPadding = padding - leftPadding;
    return ' '.repeat(leftPadding) + str + ' '.repeat(rightPadding);
}

function formatTable(header, table) {
    let maxCellWidths = [];
    for (let i = 0; i < header.length; i++) {
        let maxCellWidth = header[i].length;
        for (let j = 0; j < table.length; j++) {
            let cell = table[j][i];
            if (cell.length > maxCellWidth) {
                maxCellWidth = cell.length;
            }
        }
        maxCellWidths.push(maxCellWidth);
    }
    let headerRow = '|' + maxCellWidths.map((w, i) => ' ' + padCenter(header[i], w) + ' ').join('|') + '|\n';
    let dataRows = '';
    for (let i = 0; i < table.length; i++) {
        dataRows += '|' + maxCellWidths.map((w, j) => ' ' + table[i][j].padEnd(w, ' ') + ' ').join('|') + '|\n';
    }
    return headerRow + dataRows;
}

function* state4_generator(taskArea) {
    let st4_auto_mode = parseInt(settings['ce_st4_auto_mode']);
    let st4_current_attributes = parseInt(settings['ce_st4_current_attributes']);
    let st4_current_objects = parseInt(settings['ce_st4_current_objects']);
    let st4_current_level = parseInt(settings['ce_st4_current_level']);
    let st4_minmax_attributes = toIntOrIntRange(settings['ce_st4_min_max_attributes']);
    let st4_minmax_objects = toIntOrIntRange(settings['ce_st4_min_max_objects']);
    let st4_minmax_level = toIntOrIntRange(settings['ce_st4_min_max_level']);
    let st4_hard_mode = settings['ce_st4_hard_mode'];
    let st4_max_seconds = parseInt(settings['ce_st4_max_seconds_to_wait']);
    let st4_max_solutions = parseInt(settings['ce_st4_max_solutions']);
    let hard_mode = st4_hard_mode === combo_enable_disable.Enable;
    let st4_min_attributes = st4_minmax_attributes[0];
    let st4_max_attributes = st4_minmax_attributes.length === 2 ? st4_minmax_attributes[1] : st4_min_attributes;
    let st4_min_objects = st4_minmax_objects[0];
    let st4_max_objects = st4_minmax_objects.length === 2 ? st4_minmax_objects[1] : st4_min_objects;
    let st4_min_level = st4_minmax_level[0];
    let st4_max_level = st4_minmax_level.length === 2 ? st4_minmax_level[1] : st4_min_level;
    let clearBefore = true;
    let kinds_dict = {
        "Nationality": [
            "american", "argentine", "australian", "brazilian", "british",
            "canadian", "chinese", "colombian", "dutch", "egyptian",
            "french", "german", "indian", "indonesian", "italian",
            "japanese", "malaysian", "mexican", "nigerian", "pakistani",
            "polish", "russian", "spanish", "thai", "turkish",
        ],
        "Food": [
            "apple", "apricot", "artichoke", "asparagus", "avocado",
            "banana", "blueberry", "broccoli", "cabbage", "carrot",
            "cauliflower", "cherry", "corn", "cranberry", "cucumber",
            "eggplant", "garlic", "grapefruit", "grapes", "kale",
            "kiwi", "lemon", "lettuce", "lime", "mango",
            "nectarine", "onion", "orange", "papaya", "peach",
            "pear", "peas", "pepper", "pineapple", "plum",
            "pomegranate", "potato", "pumpkin", "radish", "raspberry",
            "spinach", "strawberry", "tomato", "watermelon", "zucchini",
        ],
        "Pet": [
            "bird", "cat", "chinchilla", "dog", "ferret",
            "fish", "frog", "goat", "goldfish", "guinea-pig",
            "hamster", "hedgehog", "horse", "lizard", "mouse",
            "pony", "rabbit", "rat", "snake", "turtle",
        ],
        "Job": [
            "accountant", "analyst", "architect", "bartender", "chef",
            "coach", "dancer", "designer", "doctor", "dressmaker",
            "electrician", "engineer", "entrepreneur", "firefighter", "fisherman",
            "freelancer", "journalist", "lawyer", "librarian", "manager",
            "mechanic", "musician", "nurse", "paramedic", "photographer",
            "pilot", "police-officer", "project-manager", "scientist", "security-guard",
            "social-worker", "software-developer", "teacher", "videographer", "writer",
        ],
        "Beverage": [
            "7up", "almond-milk", "coffee", "cola", "fanta",
            "hot-chocolate", "iced-tea", "juice", "lemonade", "milk",
            "mirinda", "soy-milk", "sprite", "tea", "water",
        ],
        "Transport": [
            "airplane", "bike", "boat", "bus", "car",
            "helicopter", "jet-ski", "motorbike", "quad-bike", "roller",
            "scooter", "ship", "skateboard", "snowmobile",
            "subway", "taxi", "train", "tram", "trike", "van",
        ],
        "Music-Genre": [
            "ambient", "blues", "classical", "country", "d&b",
            "disco", "dubstep", "electronic", "folk", "funk",
            "gospel", "hip-hop", "house", "indie", "jazz",
            "metal", "pop", "punk", "r&b", "reggae",
            "rock", "salsa", "soul", "techno", "trance",
        ],
        "Movie-Genre": [
            "action", "adventure", "animation", "comedy", "crime",
            "disaster", "documentary", "drama", "epic", "family",
            "fantasy", "horror", "martial-arts", "musical", "mystery",
            "romance", "satire", "scientific", "sports", "spy",
            "superhero", "thriller", "time-travel", "western", "zombie",
        ],
        "Sport": [
            "badminton", "baseball", "basketball", "biathlon", "climbing",
            "cricket", "cycling", "golf", "handball", "ice-hockey",
            "lacrosse", "parkour", "rowing", "rugby", "sailing",
            "skateboarding", "skiing", "snowboarding", "soccer", "surfing",
            "swimming", "tennis", "volleyball", "water-polo", "weightlifting",
        ],
        "Hobby": [
            "baking", "board-games", "camping", "card-games", "chess",
            "collecting", "cooking", "dancing", "drawing", "filmmaking",
            "fishing", "gardening", "hiking", "magic-tricks", "photography",
            "puzzles", "reading", "rock-climbing", "singing", "skydiving",
            "sudoku", "traveling", "video-games", "woodworking", "writing",
        ]
    };
    let kinds = Array.from(Object.keys(kinds_dict));
    let n_attributes = Math.min(st4_max_attributes, Math.max(st4_min_attributes, st4_current_attributes));
    let m_objects = Math.min(st4_max_objects, Math.max(st4_min_objects, st4_current_objects));
    let level = Math.min(st4_max_level, Math.max(st4_min_level, st4_current_level));
    if (m_objects <= 2 && level >= 19 || st4_max_objects <= 2 && st4_min_level >= 19) {
        appendText(taskArea, 'Max number of objects must be > 2 or Min Level must be < 19!\n', clearBefore);
        return;
    }
    setSetting('ce_st4_current_attributes', n_attributes);
    setSetting('ce_st4_current_objects', m_objects);
    setSetting('ce_st4_current_level', level);
    save_template('4');
    let auto_increase_counter = 0;
    let h = n_attributes * m_objects;
    let auto_mode_arr = [];
    for (let i = st4_min_attributes; i <= st4_max_attributes; ++i) {
        for (let j = st4_min_objects; j <= st4_max_objects; ++j) {
            for (let k = st4_min_level; k <= st4_max_level; ++k) {
                if (k >= 19 && j <= 2) {
                    continue;
                }
                auto_mode_arr.push([i * j, k, j, i]);
            }
        }
    }
    if (auto_mode_arr.length === 0) {
        return;
    }
    auto_mode_arr.sort(function (a, b) {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    let showPuzzleTimerP = document.getElementById('showPuzzleTimerP');
    let answerPuzzleTimerP = document.getElementById('answerPuzzleTimerP');
    var show_puzzle_timer_var = 0;
    var answer_puzzle_timer_var = 0;
    let st4_show_puzzle_time_limit = parseInt(settings['ce_st4_show_puzzle_time_limit']);
    let st4_answer_puzzle_time_limit = parseInt(settings['ce_st4_answer_puzzle_time_limit']);
    while (true) {
        clearInterval(st4_show_puzzle_interval);
        clearInterval(st4_answer_puzzle_interval);
        let header = [''].concat(range(1, m_objects + 1).map(x => '' + x));
        let chosenKinds = randomShuffle(kinds).slice(0, n_attributes).sort();
        let table = [], htmlTable = [header];
        chosenKinds.forEach(kind => {
            let first = [kind];
            let other = randomShuffle(kinds_dict[kind]).slice(0, m_objects);
            let row = [kind], sortedVars = other.slice().sort();
            for (let i = 0; i < m_objects; ++i) {
                row.push(sortedVars);
            }
            htmlTable.push(row);
            table.push(first.concat(other));
        });
        let best_solutions = null;
        let best_premises = null;
        let timestamp = window.performance.now();
        for (let i = 0, n = hard_mode ? 10 : 1; i < n; ++i) {
            let [solutions, premises] = generateRiddle(table, level, st4_max_seconds > 0, st4_max_seconds,
                hard_mode ? 1 : 20, st4_max_solutions);
            if (best_premises == null || (hard_mode ? best_premises.length < premises.length : best_premises.length > premises.length)) {
                best_premises = premises;
                best_solutions = solutions;
            }
            if (timestamp + st4_max_seconds * 1000 < window.performance.now()) {
                break;
            }
        }
        let solutions = best_solutions;
        let solutions_strings = [];
        let expected_array = [];
        header = [''].concat(range(1, table[0].length).map(i => '' + i));
        solutions.forEach((solution) => {
            let tmp_table = [];
            let i = 0;
            let tmp_expected = [];
            for (let row of solution) {
                let tmp_row = [table[i][0]];
                for (let set_of_item of row) {
                    let item = [...set_of_item][0];
                    tmp_row.push(item);
                    tmp_expected.push(item);
                }
                tmp_table.push(tmp_row);
                i += 1;
            }
            expected_array.push([false, tmp_expected.join('_')]);
            solutions_strings.push(formatTable(header, tmp_table));
        });
        let answer = solutions_strings.join('\n');
        let puzzle_text = '.:: Puzzle ' + n_attributes + 'x' + m_objects + ' level=' + level + ' (' + solutions.length + ' solution' + (solutions.length > 1 ? 's' : '') + ') ::.\n';
        table.forEach(row => {
            puzzle_text = puzzle_text.concat(row[0] + ': ' +
                row.slice(1, row.length).sort().join(', ') + '.\n');
        });
        puzzle_text += '\n';
        let premises = best_premises;
        let pad = ('' + premises.length).length;
        premises.forEach((premise, index) => {
            let i = ('' + (index + 1)).padStart(pad);
            puzzle_text = puzzle_text.concat(i + '. ' + premise + '.\n');
        });
        appendText(taskArea, puzzle_text + '\n', clearBefore);
        addHistoryItem([puzzle_text + '\n' + "Answer:\n" + answer]);
        taskArea.scrollTop = 0;
        taskArea.scrollLeft = 0;

        show_puzzle_timer_var = st4_show_puzzle_time_limit;
        if (show_puzzle_timer_var > 0) {
            showPuzzleTimerP.innerHTML = '' + show_puzzle_timer_var;
            st4_show_puzzle_interval = setInterval(function () {
                show_puzzle_timer_var -= 0.1;
                if (show_puzzle_timer_var <= 0) {
                    appendText(taskArea, "Time limit!\n", clearBefore);
                    showPuzzleTimerP.innerHTML = '&nbsp;';
                    clearInterval(st4_show_puzzle_interval);
                    return;
                }
                else {
                    showPuzzleTimerP.innerHTML = toFloatString(show_puzzle_timer_var, 1, 1);
                }
            }, 100);
        }
        else {
            showPuzzleTimerP.innerHTML = '&nbsp;';
            showPuzzleTimerP.style.display = 'none';
        }

        answer_puzzle_timer_var = st4_answer_puzzle_time_limit;
        if (answer_puzzle_timer_var > 0) {
            answer_puzzle_timer_var += st4_show_puzzle_time_limit;
            answerPuzzleTimerP.innerHTML = '' + answer_puzzle_timer_var;
            st4_answer_puzzle_interval = setInterval(function () {
                answer_puzzle_timer_var -= 0.1;
                if (answer_puzzle_timer_var <= 0) {
                    clearInterval(st4_show_puzzle_interval);
                    clearInterval(st4_answer_puzzle_interval);
                    answerPuzzleTimerP.innerHTML = '&nbsp;';
                    setTimeout(function () {
                        currentGenerator.next('-NO-ANSWER-');
                    }, 0);
                    return;
                }
                else {
                    answerPuzzleTimerP.innerHTML = toFloatString(answer_puzzle_timer_var, 1, 1);
                }
            }, 100);
        }
        else {
            answerPuzzleTimerP.innerHTML = '&nbsp;';
            answerPuzzleTimerP.style.display = 'none';
        }

        let first = true;
        let mistake = false, cnt = 1;
        while (true) {
            let actual = '';
            if (first) {
                actual = yield htmlTable;
                first = false;
            }
            else {
                actual = yield;
            }
            actual = actual.toUpperCase();
            if (actual === '-SKIP-') {
                appendText(taskArea, '', clearBefore);
                break;
            }
            if (actual == '-NO-ANSWER-') {
                mistake = true;
                appendText(taskArea, '', clearBefore);
                break;
            }
            if (actual === '-ANSWER-') {
                appendText(taskArea, "Answer (" + (solutions.length === 1 ? '1 solution' : solutions.length + ' solutions') + "):\n" + answer + '\n');
                continue;
            }
            let solution_found = false;
            for (let i = 0, n = expected_array.length; i < n; ++i) {
                let [sol_status, solution] = expected_array[i];
                solution = solution.toUpperCase();
                if (actual === solution) {
                    solution_found = true;
                    if (sol_status === true) {
                        appendText(taskArea, 'This solution has already been accepted before. Please enter a different one.\n');
                    }
                    else {
                        expected_array[i][0] = true;
                        addScore('ce_st4', n_attributes * m_objects + Math.floor(level / 4));
                        auto_increase_counter += cnt;
                        cnt = 0;
                        appendText(taskArea, 'Solution accept.\n');
                    }
                    break;
                }
            }
            if (solution_found === false) {
                appendText(taskArea, 'No, retry\n');
                mistake = true;
            }
            let break_condition = true;
            for (let i = 0, n = expected_array.length; i < n; ++i) {
                let [sol_status, solution] = expected_array[i];
                if (sol_status === false) {
                    break_condition = false;
                    break;
                }
            }
            if (break_condition) {
                break;
            }
        }
        if (mistake === false && st4_auto_mode >= 1 && auto_increase_counter >= st4_auto_mode) {
            auto_increase_counter = 0;
            if (auto_mode_arr.length > 0) {
                for (let i = 0, n = auto_mode_arr.length; i < n; ++i) {
                    let [h_2, level_2, m_objects_2, n_attributes_2] = auto_mode_arr[i];
                    if (h === h_2 && level === level_2 && m_objects == m_objects_2 && n_attributes === n_attributes_2) {
                        if (i + 1 < n) {
                            [h, level, m_objects, n_attributes] = auto_mode_arr[i + 1];
                        }
                        break;
                    }
                }
                setSetting('ce_st4_current_attributes', n_attributes);
                setSetting('ce_st4_current_objects', m_objects);
                setSetting('ce_st4_current_level', level);
                save_template('4');
            }
        }
        else if (st4_auto_mode === 0) {
            while (true) {
                n_attributes = randomInt(st4_min_attributes, st4_max_attributes);
                m_objects = randomInt(st4_min_objects, st4_max_objects);
                level = randomInt(st4_min_level, st4_max_level);
                if (level >= 19 && m_objects <= 2) {
                    continue;
                }
                break;
            }
        }
        else if (mistake === true) {
            auto_increase_counter = Math.max(0, auto_increase_counter - 1);
        }
    }
}

function loadScript(url, head_or_body = 'head') {
    var script = document.createElement("script");
    if (url.slice(-3) == '.js') {
        url = url + '?version=' + version;
    }
    else {
        url = url + '&version=' + version;
    }
    script.src = url;
    if (head_or_body == 'head') {
        document.head.appendChild(script);
    }
    else {
        document.body.appendChild(script);
    }
}

function checkVersion() {
    var scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
        if (script.src.includes('script.js')) {
            let xs = script.src.slice(script.src.indexOf('?') + 1).split('&');
            for (let x of xs) {
                let kv = x.split('=');
                if (kv.length === 2 && kv[0] == 'version') {
                    version = kv[1];
                }
            }
        }
    }
    let last_version = parseFloat(localStorage.getItem('CE_VERSION'));
    localStorage.setItem('CE_VERSION', version);
    if (last_version < 6.00) {
        resetAllSettings();
    }
}

let state = -1;
let currentGenerator = null;

let numbersPanelSymbols = '123456789-0_';
let statesToNames = {
    st1: 'Multi N-Back',
    st2: 'Boxes',
    st3: 'Recursive-Solving',
    st4: 'Puzzle-Solving'
};
let combo_st1_options = {
    "2": "2",
    "4": "4",
    "6": "6",
    "8": "8",
    "12": "12"
};
let combo_enable_disable = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_enable_somewhat_disable = {
    Enable: "Enable",
    Somewhat: "Somewhat",
    Disable: "Disable"
};
let combo_enable_only_disable = {
    Enable: "Enable",
    Only: "Only",
    Disable: "Disable"
};
let combo_state1_words_dictionary = {
    Wordsmyth: "Wordsmyth",
    WordsmythPro: "Wordsmyth Pro",
    MerriamWebster: "Merriam-Webster",
    MerriamWebsterPro: "Merriam-Webster Pro",
};
let settings = loadSettings();
let scores = loadScores();
let ce_history = loadHistory();
let version = localStorage.getItem('CE_VERSION');

let st1_show_trial_interval = null;
let st1_answer_trial_interval = null;
let state1_audio_mp3 = {};
let state1_voice_title_to_filename = {};
let state1_voice_mp3 = {};

let st3_show_puzzle_interval = null;
let st3_answer_puzzle_interval = null;
let st4_show_puzzle_interval = null;
let st4_answer_puzzle_interval = null;

let state1_images = {};
let state1_audios_for_images = {};
let state1_audios_all = {};
let state1_words = {};

let state1_check_for_dict = function (dictionary, category1, category2, title) {
    if (dictionary[category1] && dictionary[category1][category2]) {
        let items_for_subcategory = dictionary[category1][category2];
        for (let item of items_for_subcategory) {
            let item_file_name = item, item_name = item;
            if (Array.isArray(item_file_name)) {
                item_name = item_file_name[1];
                item_file_name = item_file_name[0];
            }
            if (title == item_name) {
                return true;
            }
        }
    }
    return false;
};

let state1_image_examples = [];
let state1_audio_examples = [];

let state1_statistics_images = '';
let state1_statistics_images_categories = '';
let state1_statistics_audio_files = '';
let state1_statistics_voice_files = '';

let state1_dictionary_source = '';
let state1_statistics_unique_words = '';
let state1_statistics_words_with_meaning = '';
let state1_statistics_words_definitions = '';
let state1_statistics_synonyms = '';
let state1_statistics_antonyms = '';
let state1_statistics_similar_words = '';

getVoices();
loadScript('images.js');
loadScript('audios.js');

state1_dictionary_source = settings['ce_state1_words_dictionary'];
if (state1_dictionary_source == null) {
    state1_dictionary_source = combo_state1_words_dictionary.Wordsmyth;
    setSetting('ce_state1_words_dictionary', state1_dictionary_source);
}
if (state1_dictionary_source == combo_state1_words_dictionary.Wordsmyth) {
    loadScript('dictionaries/wordsmyth.js');
}
else if (state1_dictionary_source == combo_state1_words_dictionary.WordsmythPro) {
    loadScript('dictionaries/wordsmyth_pro.js');
}
else if (state1_dictionary_source == combo_state1_words_dictionary.MerriamWebster) {
    loadScript('dictionaries/merriam_webster.js');
}
else if (state1_dictionary_source == combo_state1_words_dictionary.MerriamWebsterPro) {
    loadScript('dictionaries/merriam_webster_pro.js');
}
else {
    var getWords = () => {
        return {};
    };
}

window.addEventListener('load', () => {
    state1_images = getImages();
    state1_audios_all = getAudios();
    state1_words = getWords();

    state1_statistics_images = 0;
    state1_statistics_images_categories = 0;
    state1_statistics_voice_files = 0;
    let voice_files_set = new Set();
    for (const [category1, val1] of Object.entries(state1_images)) {
        state1_statistics_images_categories += 1;
        for (const [category2, val2] of Object.entries(val1)) {
            state1_statistics_images_categories += 1;
            for (const image of val2) {
                state1_statistics_images += 1;
                let image_file_name = image, image_name = image;
                if (Array.isArray(image_file_name)) {
                    image_name = image_file_name[1];
                    image_file_name = image_file_name[0];
                }
                voice_files_set.add(image_name);
                state1_voice_title_to_filename[image_name] = image_file_name;
                state1_voice_title_to_filename[image_name.toLowerCase()] = image_file_name;
                state1_voice_title_to_filename[image_file_name] = image_file_name;
                state1_voice_title_to_filename[image_file_name.toLowerCase()] = image_file_name;
                let image_full_path = `${category1}/${category2}/${image_file_name}.jpg`;
                let image_full_name = `${category1}/${category2}/${image_name}`;
                state1_image_examples.push([
                    image_full_path,
                    image_full_name
                ]);
            }
        }
    }

    state1_statistics_audio_files = 0;
    for (const [category1, val1] of Object.entries(state1_audios_all)) {
        for (const [category2, val2] of Object.entries(val1)) {
            for (const audio of val2) {
                state1_statistics_audio_files += 1;
                let audio_file_name = audio, audio_name = audio;
                if (Array.isArray(audio_file_name)) {
                    audio_name = audio_file_name[1];
                    audio_file_name = audio_file_name[0];
                }
                let found = state1_check_for_dict(state1_images, category1, category2, audio_name);
                if (found) {
                    if (!state1_audios_for_images.hasOwnProperty(category1)) {
                        state1_audios_for_images[category1] = {};
                    }
                    if (!state1_audios_for_images[category1].hasOwnProperty(category2)) {
                        state1_audios_for_images[category1][category2] = [];
                    }
                    state1_audios_for_images[category1][category2].push(audio);
                }
                let audio_full_path = `${category1}/${category2}/${audio_file_name}.mp3`;
                let audio_full_name = `${category1}/${category2}/${audio_name}`;
                state1_audio_examples.push([
                    audio_full_path,
                    audio_full_name
                ]);
                if (!found) {
                    console.log(`[NO-ERROR] Image not found for existing audio: ${audio_full_name}`);
                }
            }
        }
    }
    state1_voice_title_to_filename['Hello'] = 'Hello';
    state1_voice_title_to_filename['hello'] = 'Hello';
    state1_statistics_voice_files = voice_files_set.size;

    state1_statistics_words_with_meaning = 0;
    state1_statistics_words_definitions = 0;
    state1_statistics_unique_words = 0;
    state1_statistics_synonyms = 0;
    state1_statistics_antonyms = 0;
    state1_statistics_similar_words = 0;
    let synonyms_set = new Set();
    let antonyms_set = new Set();
    let similar_words_set = new Set();
    let words_set = new Set();
    for (const [word, definitions] of Object.entries(state1_words)) {
        words_set.add(word);
        state1_statistics_words_with_meaning += (definitions.length > 0 ? 1 : 0);
        for (const definition of definitions) {
            state1_statistics_words_definitions += 1;
            for (let syn of definition[3]) {
                words_set.add(syn);
                synonyms_set.add(syn);
            }
            for (let ant of definition[4]) {
                words_set.add(ant);
                antonyms_set.add(ant);
            }
            for (let sim of definition[5]) {
                words_set.add(sim);
                similar_words_set.add(sim);
            }
        }
    }
    state1_statistics_unique_words = words_set.size;
    state1_statistics_synonyms = synonyms_set.size;
    state1_statistics_antonyms = antonyms_set.size;
    state1_statistics_similar_words = similar_words_set.size;
});
