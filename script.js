Array.prototype.insert = function (index, ...items) {
    this.splice(index, 0, ...items);
};

Array.prototype.pop = function (index = -1) {
    return this.splice(index < 0 ? this.length + index : index, 1)[0];
};

Array.prototype.sum = function () {
    return this.reduce(function (a, b) { return a + b; }, 0);
};

Array.prototype.slice_ext = function (start = null, end = null, step = null) {
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
    return string[0].toUpperCase() + string.slice(1);
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
        "st1": 0,
        "st2": 0,
        "st3": 0,
        "st4": 0
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
    let history = localStorage.getItem('exHistory');
    if (history == null) {
        return [];
    }
    return JSON.parse(history);
}

function loadSettings() {
    let defParameters = {
        "st1_auto_mode": 20,
        "st1_n": 0,
        "st1_image_mode": combo_st1_image_mode.Enable,
        "st1_word_to_image": combo_st1_word_to_image.Enable,
        "st1_voice_to_image": combo_st1_voice_to_image.Enable,
        "st1_word_mode": combo_st1_word_mode.Enable,
        "st1_word_mode_just_word": combo_st1_word_mode_just_word.Enable,
        "st1_word_mode_meaning": combo_st1_word_mode_meaning.Enable,
        "st1_word_mode_synonyms": combo_st1_word_mode_synonyms.Enable,
        "st1_word_mode_antonyms": combo_st1_word_mode_antonyms.Enable,
        "st1_word_mode_random": combo_st1_word_mode_random.Disable,
        "st1_voice_index": -2,
        "st1_options": 4,
        "st1_word_to_category": combo_st1_word_to_category.Disable,
        "st1_hard_mode": combo_st1_hard_mode.Disable,
        "st1_show_trial_time_limit": '0.0',
        "st1_answer_trial_time_limit": '0.0',
        "st1_insects_category": combo_st1_insects_category.Enable,
        "st1_halloween_category": combo_st1_halloween_category.Enable,
        "st1_family_members_category": combo_st1_family_members_category.Enable,
        "st1_baby_category": combo_st1_baby_category.Enable,
        "st1_font_size": 16,
        "st2_auto_mode": 5,
        "st2_boxes": 2,
        "st2_operations": 1,
        "st2_minmax_operations": "1-5",
        "st2_minmax_number": "1-5",
        "st3_auto_mode": 3,
        "st3_stn": 4,
        "st3_current_level": 1,
        "st3_minmax_stmts": "4-12",
        "st3_minmax_level": "1-7",
        "st3_max_solutions": 1,
        "st3_font_size": 16,
        "st4_auto_mode": 2,
        "st4_current_attributes": 2,
        "st4_current_objects": 3,
        "st4_current_level": 1,
        "st4_minmax_attributes": "2-5",
        "st4_minmax_objects": "3-5",
        "st4_minmax_level": "1-20",
        "st4_hard_mode": combo_st4_hard_mode.Disable,
        "st4_max_seconds": 10,
        "st4_max_solutions": 1,
        "st4_font_size": 16,
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
        let score = scores['st' + st];
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
    return str.replace(/(<([^>]+)>)+/ig, replace_string);
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
        state0();
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
                let real_filename = "images/" + category1 + '/' + category2 + '/' + filename + ".jpg";
                list.push([category1, category2, real_filename, title, [[title, real_filename]]]);
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
                    w1[w1.length - 1].push([w2[3], w2[2]]);
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
                w1[w1.length - 1].push([w2[3], w2[2]]);
            }
        }
    }
    for (let w of randomShuffle(list)) {
        yield (w);
    }
    return null;
}

function text_to_lines(text, n_symbols_per_line, indent=0, pre_indent = true, preserve_endlines = true) {
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
        result = result.replace(/^\s+/, '');
    }
    return result;
}

function* wordGetter(dictionary, options, hard_mode) {
    let list = [];
    for (const [word, params] of Object.entries(dictionary)) {
        list.push([word, params[0], params[1], params[2], params[3]]);
    }
    list = randomShuffle(list);
    let task_type = '', skip = false;
    for (let x of list) {
        let another_word_flag = false;
        while (true) {
            let task1 = '', task2 = '', expected = '', explanation = '', options_list = [];
            let word = x[0];
            let meaning = x[1];
            let example = x[2];
            let synonyms = x[3];
            let antonyms = x[4];
            let r = [];
            if (skip == false) {
                task_type = (yield 'task');
                if (Array.isArray(task_type)) {
                    let obj = task_type;
                    task_type = obj[0];
                    word = obj[1].toLowerCase();
                    meaning = dictionary[word][0];
                    example = dictionary[word][1];
                    synonyms = dictionary[word][2];
                    antonyms = dictionary[word][3];
                    another_word_flag = true;
                }
                else {
                    another_word_flag = false;
                }
            }
            else {
                skip = false;
            }
            let all_synonyms = new Map();
            let all_antonyms = new Map();
            let q = [[word, false, 0]];
            while (q.length > 0) {
                let [w, is_antonym, depth] = q.pop();
                if (is_antonym) {
                    if (all_antonyms.has(w)) {
                        continue;
                    }
                    all_antonyms.set(w, depth);
                }
                else {
                    if (all_synonyms.has(w)) {
                        continue;
                    }
                    all_synonyms.set(w, depth);
                }
                let synonyms_of_x = dictionary[w] ? dictionary[w][2] : [];
                for (let syn of synonyms_of_x) {
                    q.push([syn, is_antonym, depth + 1]);
                }
                let antonyms_of_x = dictionary[w] ? dictionary[w][3] : [];
                for (let ant of antonyms_of_x) {
                    q.push([ant, !is_antonym, depth + 1]);
                }
            }
            all_synonyms.delete(word);
            if (task_type == 'word-just-one') {
                task1 = 'Next word: ' + capitalize(word) + '\nMeaning of the word:\n ' + meaning;
                task2 = 'Word:';
                expected = word;
                let sd_list = [];
                for (let [synonym, depth] of all_synonyms.entries()) {
                    if (depth != 0) {
                        sd_list.push([synonym, depth]);
                    }
                }
                sd_list = randomShuffle(sd_list);
                sd_list.sort((a, b) => -a[1] + b[1]);
                for (let [synonym, depth] of sd_list) {
                    options_list.push(synonym);
                }
                for (let x of list) {
                    if (options_list.length >= options) {
                        break;
                    }
                    if (x[0] != word && all_antonyms.has(x[0]) == false) {
                        options_list.push(x[0]);
                    }
                }
            }
            else if (task_type == 'word-meaning') {
                task1 = 'Next meaning of the word:\n ' + meaning;
                task2 = 'Word:';
                expected = word;
                explanation = example;
                let ad_list = [];
                for (let [antonym, depth] of all_antonyms.entries()) {
                    if (depth != 0) {
                        ad_list.push([antonym, depth]);
                    }
                }
                ad_list = randomShuffle(ad_list);
                ad_list.sort((a, b) => -a[1] + b[1]);
                for (let [antonym, depth] of ad_list) {
                    options_list.push(antonym);
                }
                for (let x of list) {
                    if (options_list.length >= options) {
                        break;
                    }
                    if (x[0] != word && all_synonyms.has(x[0]) == false) {
                        options_list.push(x[0]);
                    }
                }
            }
            else if (task_type == 'word-synonyms' && synonyms.length > 0) {
                expected = randomChoice(synonyms);
                task1 = 'Next word: ' + capitalize(word) + '\nMeaning of the word:\n ' + meaning;
                task2 = 'Choose synonym of the word:';
                let sd_list = [];
                for (let [synonym, depth] of all_synonyms.entries()) {
                    if (depth != 0) {
                        sd_list.push([synonym, depth]);
                    }
                }
                sd_list = randomShuffle(sd_list);
                sd_list.sort((a, b) => -a[1] + b[1]);
                if (hard_mode) {
                    sd_list = sd_list.slice(0, Math.max(options, sd_list.length / 2));
                    sd_list = randomShuffle(sd_list);
                }
                else {
                    sd_list = sd_list.slice(Math.min(sd_list.length - options, sd_list.length / 2));
                    sd_list = randomShuffle(sd_list);
                }
                for (let [synonym, depth] of sd_list) {
                    expected = synonym;
                    break;
                }
                let ad_list = [];
                for (let [antonym, depth] of all_antonyms.entries()) {
                    ad_list.push([antonym, depth]);
                }
                ad_list = randomShuffle(ad_list);
                ad_list.sort((a, b) => -a[1] + b[1]);
                if (hard_mode) {
                    ad_list = ad_list.slice(0, Math.max(options, ad_list.length / 2));
                    ad_list = randomShuffle(ad_list);
                }
                else {
                    ad_list = ad_list.slice(Math.min(ad_list.length - options, ad_list.length / 2));
                    ad_list = randomShuffle(ad_list);
                }
                for (let [antonym, depth] of ad_list) {
                    options_list.push(antonym);
                }
                for (let x of list) {
                    if (options_list.length >= options) {
                        break;
                    }
                    if (x[0] != word && all_synonyms.has(x[0]) == false) {
                        options_list.push(x[0]);
                    }
                }
                explanation = capitalize(word) + ' - ' + meaning;
            }
            else if (task_type == 'word-antonyms' && antonyms.length > 0) {
                expected = randomChoice(antonyms);
                task1 = 'Next word: ' + capitalize(word) + '\nMeaning of the word:\n ' + meaning;
                task2 = 'Choose antonym of the word:';
                let ad_list = [];
                for (let [antonym, depth] of all_antonyms.entries()) {
                    if (depth != 0) {
                        ad_list.push([antonym, depth]);
                    }
                }
                ad_list = randomShuffle(ad_list);
                ad_list.sort((a, b) => -a[1] + b[1]);
                if (hard_mode) {
                    ad_list = ad_list.slice(0, Math.max(options, ad_list.length / 2));
                    ad_list = randomShuffle(ad_list);
                }
                else {
                    ad_list = ad_list.slice(Math.min(ad_list.length - options, ad_list.length / 2));
                    ad_list = randomShuffle(ad_list);
                }
                for (let [antonym, depth] of ad_list) {
                    expected = antonym;
                    break;
                }
                let sd_list = [];
                for (let [synonym, depth] of all_synonyms.entries()) {
                    if (depth != 0) {
                        sd_list.push([synonym, depth]);
                    }
                }
                sd_list = randomShuffle(sd_list);
                sd_list.sort((a, b) => -a[1] + b[1]);
                if (hard_mode) {
                    sd_list = sd_list.slice(0, Math.max(options, sd_list.length / 2));
                    sd_list = randomShuffle(sd_list);
                }
                else {
                    sd_list = sd_list.slice(Math.min(sd_list.length - options, sd_list.length / 2));
                    sd_list = randomShuffle(sd_list);
                }
                for (let [synonym, depth] of sd_list) {
                    options_list.push(synonym);
                }
                for (let x of list) {
                    if (options_list.length >= options) {
                        break;
                    }
                    if (x[0] != word && all_antonyms.has(x[0]) == false) {
                        options_list.push(x[0]);
                    }
                }
                explanation = capitalize(word) + ' - ' + meaning;
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
                    continue;
                }
                skip = true;
                console.log(`${word} skipped`);
                break;
            }
            r.push(capitalize(word));
            r.push(task1);
            r.push(task2);
            r.push(capitalize(expected));
            r.push(explanation);
            r.push(options_list);
            yield (r); // word, task1, task2, expected, explanation, options
            if (another_word_flag == false) {
                break;
            }
        }
    }
    return null;
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

function appendText(taskArea, text, clearBefore = false) {
    if (clearBefore) {
        taskArea.innerHTML = '';
    }
    taskArea.innerHTML += text;
    taskArea.scrollTop = taskArea.scrollHeight;
}

function addScore(st, n = 1) {
    localStorage.setItem(st, scores[st] += n);
}

function createInputElems() {
    let taskDiv = document.createElement("div");
    taskDiv.id = "taskDiv";
    let taskArea = document.createElement("textarea");
    taskArea.id = "taskArea";
    taskArea.readOnly = true;
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
        checkAnswer(event.target.innerHTML);
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
                if (k < options.length) {
                    children[i].style.color = '#ffffff00';
                    children[i].style.background = 'url("' + options[k][1] + '")';
                    children[i].style.backgroundSize = 'contain';
                    children[i].style.backgroundRepeat = 'no-repeat';
                    children[i].style.backgroundPosition = 'center center';
                    children[i].innerHTML = options[k][0];
                    children[i].style.width = '170px';
                    children[i].style.height = '170px';
                }
                else {
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
    inputDiv.appendChild(tableDiv);
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
                break;
            }
            case "st1_voice_combobox": {
                firstElement = document.createElement("p");
                firstElement.innerHTML = item[1];
                secondElement = createVoiceCombobox(item[0], function (value) {
                    let voice_index = parseInt(value);
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
                secondElement = document.createElement("hr");
                secondElement.style.borderColor = 'hsl(45, 100%, 50%)';
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
            event.innerHTML = Number(parsed).toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1});
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
    select.onchange = function (event) {
        event = event.target;
        setSetting(param_id, event.value);
        if (onchangeFunc != null) {
            onchangeFunc(event.value);
        }
    }
    return select;
}

function createVoiceCombobox(param_id, onchangeFunc = null, add_voice_std_option = false) {
    let select = document.createElement("select");
    let empty_option = document.createElement("option");
    empty_option.value = -1;
    empty_option.innerHTML = "-";
    select.appendChild(empty_option);
    if (add_voice_std_option) {
        let voice_std_option = document.createElement("option");
        voice_std_option.value = -2;
        voice_std_option.innerHTML = "[Online] Nate (Wi-Fi only)";
        select.appendChild(voice_std_option);
    }
    let options = getVoices();
    options.forEach(optionValue => {
        let option = document.createElement("option");
        option.value = optionValue[0];
        option.innerHTML = '[Offline] ' + optionValue[2];
        select.appendChild(option);
    });
    select.value = empty_option.value;
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

function st1_speak(text, voice_index) {
    if (voice_index >= 0) {
        speak(text, voice_index);
        return;
    }
    if (!Object.hasOwn(state1_voice_mp3, text)) {
        state1_voice_mp3[text] = new Audio('voice/' + text + '.mp3');
    }
    state1_voice_mp3[text].play().then(null, function () {
        speak(text, getVoices()[0][0]);
    });
}

function createMenuButton(text, onmouseup) {
    let button = document.createElement("button");
    button.classList.add("amberButton");
    button.innerHTML = text;
    button.onmouseup = onmouseup;
    return button;
}

function createParameterActionButton(param_id, onmouseup) {
    let button = document.createElement("button");
    button.classList.add("amberButton");
    button.innerHTML = param_id;
    button.id = param_id;
    button.onmouseup = onmouseup;
    return button;
}

function createCaption(text) {
    let caption = document.createElement('h1');
    caption.innerHTML = text;
    return caption;
}

function state0() {
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

    let clearScoresButton = createActionButton('Clear scores', () => {
        if (confirm('Are you sure you want to clear the scores?')) {
            stateN_clear_score(['st1', 'st2', 'st3', 'st4']);
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
    link.innerHTML = 'v.' + version;
    addWidget(link);
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
            localStorage.removeItem('exHistory');
            exHistory = loadHistory();
            state0();
        }
    });
    clearButton.classList.add('blackButton');
    clearButton.classList.add('w100');
    addWidget(clearButton);
    exHistory.forEach(historyElem => {
        let task = createInputElems();
        let taskDiv = task[0];
        let taskArea = task[1];
        taskArea.innerHTML = historyElem;
        addWidget(taskDiv);
        taskArea.style.height = 'auto';
        taskArea.style.height = (taskArea.scrollHeight + 20) + 'px';
    });
}

function getStrDateTime() {
    return new Date().toLocaleString();
}

function formatHistoryElem(historyElem) {
    let stateName = statesToNames['st' + state];
    return getStrDateTime() + '. ' + stateName + '\n' + historyElem;
}

function addHistoryItem(historyElem) {
    historyElem = historyElem.join('\n');
    exHistory.unshift(formatHistoryElem(historyElem));
    if (exHistory.length > 25) {
        exHistory = exHistory.slice(0, 25);
    }
    localStorage.setItem('exHistory', JSON.stringify(exHistory));
}

function updateLastHistoryItem(historyElem) {
    historyElem = historyElem.join('\n');
    exHistory[0] = formatHistoryElem(historyElem);
    localStorage.setItem('exHistory', JSON.stringify(exHistory));
}

function state1() {
    clearInterval(st1_show_trial_interval);
    clearInterval(st1_answer_trial_interval);
    currentGenerator = null;
    state = 1;
    clearWidgets();
    addWidget(createCaption(statesToNames.st1));
    addWidget(createParameters([
        [
            "Start", "Back", "buttons",
            function (event) {
                state1_start();
            },
            function (event) {
                state1_back();
            },
        ],
        [
            "Increase level", "Decrease", "buttons",
            function (event) {
                let st1_n = toIntOrIntRange(settings['st1_n']);
                let st1_n_min = st1_n[0];
                let st1_n_max = st1_n.length == 2 ? st1_n[1] : st1_n_min;
                let was_diff = (st1_n.length == 2);
                if (was_diff === false) {
                    st1_n_min = Math.min(Math.max(st1_n_min + 1, 0), 100);
                }
                st1_n_max = Math.min(Math.max(st1_n_max + 1, 0), 100);
                st1_n_min = Math.min(st1_n_min, st1_n_max);
                if (was_diff == false) {
                    st1_n_string = st1_n_min;
                }
                else {
                    st1_n_string = st1_n_min + '-' + st1_n_max;
                }
                st1_n = st1_n_min;
                setSetting('st1_n', st1_n_string);
                state1();
            },
            function (event) {
                let st1_n = toIntOrIntRange(settings['st1_n']);
                let st1_n_min = st1_n[0];
                let st1_n_max = st1_n.length == 2 ? st1_n[1] : st1_n_min;
                let was_diff = (st1_n.length == 2);
                if (was_diff === false) {
                    st1_n_min = Math.min(Math.max(st1_n_min - 1, 0), 100);
                }
                st1_n_max = Math.min(Math.max(st1_n_max - 1, 0), 100);
                st1_n_min = Math.min(st1_n_min, st1_n_max);
                if (was_diff == false) {
                    st1_n_string = st1_n_min;
                }
                else {
                    st1_n_string = st1_n_min + '-' + st1_n_max;
                }
                st1_n = st1_n_min;
                setSetting('st1_n', st1_n_string);
                state1();
            },
        ],
        ["st1_auto_mode", "<b>Auto mode</b><br>Move to the next level every N successful trials<br>[0:disable|1-1000]", "integer", function (xv) {
            return xv === 0 || 1 <= xv && xv <= 1000;
        }],
        ["st1_n", "<b>Auto mode</b><br>Min-Max N<br>[0:disable|1-100]", "range", function (xv) {
            return xv != null &&
                   0 <= xv[0] && xv[0] <= 100 &&
                   (xv.length === 1 || 0 <= xv[1] && xv[1] <= 100);
        }],
        ["", "", "hr"],
        ["st1_image_mode", "<u>Image mode</u>", "combobox", Object.values(combo_st1_image_mode)],
        ["st1_word_to_image", "Word → Image", "combobox", Object.values(combo_st1_word_to_image)],
        ["", "", "hr1"],
        ["st1_voice_index", "<u>Voice mode</u>", "st1_voice_combobox"],
        ["st1_voice_to_image", "Voice → Image", "combobox", Object.values(combo_st1_voice_to_image)],
        ["", "", "hr1"],
        ["st1_word_to_category", "Word → Category", "combobox", Object.values(combo_st1_word_to_category)],
        ["st1_insects_category", "Category 'Insects'", "combobox", Object.values(combo_st1_insects_category)],
        ["st1_halloween_category", "Category 'Halloween'", "combobox", Object.values(combo_st1_halloween_category)],
        ["st1_family_members_category", "Category 'Family members'", "combobox", Object.values(combo_st1_family_members_category)],
        ["st1_baby_category", "Category 'Baby'", "combobox", Object.values(combo_st1_baby_category)],
        ["", "", "hr"],
        ["st1_word_mode", "<u>Word mode</u>", "combobox", Object.values(combo_st1_word_mode)],
        ["st1_word_mode_just_word", "Just a word", "combobox", Object.values(combo_st1_word_mode_just_word)],
        ["st1_word_mode_meaning", "Meaning", "combobox", Object.values(combo_st1_word_mode_meaning)],
        ["st1_word_mode_synonyms", "Synonyms", "combobox", Object.values(combo_st1_word_mode_synonyms)],
        ["st1_word_mode_antonyms", "Antonyms", "combobox", Object.values(combo_st1_word_mode_antonyms)],
        ["st1_word_mode_random", "Random task each time<br>for one word", "combobox", Object.values(combo_st1_word_mode_random)],
        ["", "", "hr"],
        ["st1_show_trial_time_limit", "Show trial time limit<br>(in seconds)<br>[0:disable|1-60]", "float", function (xv) {
            return xv === 0 || 1 <= xv && xv <= 60;
        }],
        ["st1_answer_trial_time_limit", "Answer trial time limit<br>(in seconds)<br>[0:disable|2-60]", "float", function (xv) {
            return xv === 0 || 2 <= xv && xv <= 60;
        }],
        ["st1_options", "Options", "combobox", Object.values(combo_st1_options)],
        ["st1_hard_mode", "Hard mode", "combobox", Object.values(combo_st1_hard_mode)],
        [
            "Default settings", "Clear score", "buttons",
            function (event) {
                if (confirm('Are you sure you want to set the default settings?')) {
                    stateN_defaults('st1');
                }
            },
            function (event) {
                if (confirm('Are you sure you want to clear the scores?')) {
                    stateN_clear_score('st1');
                }
            },
        ],
    ]));
}

function state1_back() {
    state0();
}

function state1_start() {
    clearWidgets();
    let task = createInputElems();
    let taskDiv = task[0];
    let taskArea = task[1];
    taskDiv.style.height = '150px';
    taskArea.style.height = '155px';
    let st1_options = parseInt(settings['st1_options']);
    let fs = parseInt(settings['st1_font_size']);
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
        'Answer': () => { currentGenerator.next('-ANSWER-') },
        '+': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(9, fs + 1));
            setSetting('st1_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
        },
        '-': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(9, fs - 1));
            setSetting('st1_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
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
    let st1_auto_mode = parseInt(settings['st1_auto_mode']);
    let st1_n = toIntOrIntRange(settings['st1_n']);
    let st1_n_min = st1_n[0];
    let st1_n_max = st1_n.length == 2 ? st1_n[1] : st1_n_min;
    let was_diff = (st1_n.length == 2);
    st1_n = st1_n_min;
    let st1_options = parseInt(settings['st1_options']);
    let st1_word_to_category = settings['st1_word_to_category'];
    let st1_word_to_image = settings['st1_word_to_image'];
    let st1_voice_to_image = settings['st1_voice_to_image'];
    let st1_hard_mode = settings['st1_hard_mode'];
    let st1_show_trial_time_limit = parseFloat(settings['st1_show_trial_time_limit']);
    let st1_answer_trial_time_limit = parseFloat(settings['st1_answer_trial_time_limit']);
    let st1_image_mode = settings['st1_image_mode'];
    let st1_word_mode = settings['st1_word_mode'];
    let st1_word_mode_just_word = settings['st1_word_mode_just_word'];
    let st1_word_mode_meaning = settings['st1_word_mode_meaning'];
    let st1_word_mode_synonyms = settings['st1_word_mode_synonyms'];
    let st1_word_mode_antonyms = settings['st1_word_mode_antonyms'];
    let st1_word_mode_random = settings['st1_word_mode_random'] == combo_st1_word_mode_random.Enable;
    let random_tasks_types = [];
    if (st1_word_mode_random && st1_word_mode_just_word == combo_st1_word_mode_just_word.Enable) {
        random_tasks_types.push('word-just-one');
    }
    if (st1_word_mode_random && st1_word_mode_meaning == combo_st1_word_mode_meaning.Enable) {
        random_tasks_types.push('word-meaning');
    }
    if (st1_word_mode_random && st1_word_mode_synonyms == combo_st1_word_mode_synonyms.Enable) {
        random_tasks_types.push('word-synonyms');
    }
    if (st1_word_mode_random && st1_word_mode_antonyms == combo_st1_word_mode_antonyms.Enable) {
        random_tasks_types.push('word-antonyms');
    }
    st1_word_mode_random = random_tasks_types;
    let st1_voice_index = parseInt(settings['st1_voice_index']);
    let st1_insects_category = settings['st1_insects_category'];
    let st1_halloween_category = settings['st1_halloween_category'];
    let st1_family_members_category = settings['st1_family_members_category'];
    let st1_baby_category = settings['st1_baby_category'];
    let hard_mode = st1_hard_mode === combo_st1_hard_mode.Enable;
    let auto_increase_counter = 0;
    let clearBefore = true;
    let not_item_checker = function (category1, category2, title) {
        if (st1_insects_category == combo_st1_insects_category.Disable && (category2 == 'Insects' || title == 'Spider')) {
            return true;
        }
        if (st1_halloween_category == combo_st1_halloween_category.Disable && category2 == 'Halloween') {
            return true;
        }
        if (st1_family_members_category == combo_st1_family_members_category.Disable && (
            category2 == 'Family members' || category2 == 'Mothers day' ||
            category2 == 'Valentines day' || category2 == 'Stages')) {
            return true;
        }
        if (st1_baby_category == combo_st1_baby_category.Disable && category1 == 'Baby') {
            return true;
        }
        if (st1_word_to_category == combo_st1_word_to_category.Only && (
            category1 == 'Adjectives' || category1 == 'Baby' || category1 == 'Bedroom' ||
            category1 == 'Holidays' || category1 == 'Verbs' || category2 == 'Stages')) {
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
                x = x.toLowerCase().replace(/\W/g, '');
                y = y.toLowerCase().replace(/\W/g, '');
                if (x.includes(y) || y.includes(x)) {
                    return true;
                }
            }
        }
        return false;
    };
    let images_generator = imageGetter(state1_images, st1_options, hard_mode, not_item_checker, not_variants_checker);
    let word_generator = wordGetter(state1_words, st1_options, hard_mode);
    let task_list = [];
    let mistakeFlag = false, skip_mode = true, lines = [];
    st1_auto_mode = st1_auto_mode > 0 ? Math.max(st1_auto_mode, st1_n_max) : 0;
    let imageDiv = document.getElementById('imageDiv');
    let voiceDiv = document.getElementById('voiceDiv');
    let voiceButton = document.getElementById('voiceButton');
    let showTrialTimerImg = document.getElementById('showTrialTimerImg');
    let showTrialTimerP = document.getElementById('showTrialTimerP');
    let answerTrialTimerP = document.getElementById('answerTrialTimerP');
    var show_trial_timer_var = st1_show_trial_time_limit;
    var answer_trial_timer_var = st1_answer_trial_time_limit;
    let skip_plug = [];
    for (let i = 0; i < st1_options; ++i) {
        skip_plug.push('skip');
    }
    let st1_n_string = '';
    if (st1_n_min == st1_n_max) {
        st1_n_string = st1_n_min;
        setSetting('st1_n', st1_n_string);
    }
    else {
        st1_n_string = st1_n_min + '-' + st1_n_max;
        setSetting('st1_n', st1_n_string);
    }
    appendText(taskArea, "N = " + st1_n_string + "!\n", clearBefore);
    addHistoryItem([statesToNames.st1]);
    while (true) {
        clearInterval(st1_show_trial_interval);
        clearInterval(st1_answer_trial_interval);
        imageDiv.style.display = 'none';
        voiceDiv.style.display = 'none';
        showTrialTimerImg.style.display = 'none';
        if (mistakeFlag === false && st1_auto_mode !== 0 && auto_increase_counter >= st1_auto_mode) {
            if (was_diff === false) {
                st1_n_min = Math.min(Math.max(st1_n_min + 1, 0), 100);
            }
            st1_n_max = Math.min(Math.max(st1_n_max + 1, 0), 100);
            st1_n_min = Math.min(st1_n_min, st1_n_max);
            if (was_diff == false) {
                st1_n_string = st1_n_min;
            }
            else {
                st1_n_string = st1_n_min + '-' + st1_n_max;
            }
            setSetting('st1_n', st1_n_string);
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
        let variants = [];
        if (st1_image_mode == combo_st1_image_mode.Enable) {
            variants.push('image');
        }
        if (st1_word_mode == combo_st1_word_mode.Enable) {
            if (st1_word_mode_just_word == combo_st1_word_mode_just_word.Enable) {
                variants.push('word-just-one');
            }
            if (st1_word_mode_meaning == combo_st1_word_mode_meaning.Enable) {
                variants.push('word-meaning');
            }
            if (st1_word_mode_synonyms == combo_st1_word_mode_synonyms.Enable) {
                variants.push('word-synonyms');
            }
            if (st1_word_mode_antonyms == combo_st1_word_mode_antonyms.Enable) {
                variants.push('word-antonyms');
            }
        }
        if (st1_voice_index >= 0 || st1_voice_index === -2) {
            variants.push('voice');
        }
        let variant = randomChoice(variants);
        let gen_next = null;
        if (variant == 'image' || variant == 'voice') {
            gen_next = images_generator.next();
            if (gen_next.done) {
                images_generator = imageGetter(state1_images, st1_options, hard_mode, not_item_checker, not_variants_checker);
                gen_next = images_generator.next();
            }
            gen_next = gen_next.value;
            if (variant == 'image') {
                if (st1_word_to_image == combo_st1_word_to_image.Enable) {
                    gen_next.push(randomChoice(['word', 'image']));
                }
                else if (st1_word_to_image == combo_st1_word_to_image.Only) {
                    gen_next.push('word');
                }
                else {
                    gen_next.push('image');
                }
            }
            else {
                if (st1_voice_to_image == combo_st1_voice_to_image.Enable) {
                    gen_next.push(randomChoice(['word', 'voice']));
                }
                else if (st1_voice_to_image == combo_st1_voice_to_image.Only) {
                    gen_next.push('word');
                }
                else {
                    gen_next.push('voice');
                }
            }
            // [category 1, category 2, filename, title, variants, task_type]
        }
        else if (variant == 'word-just-one' || variant == 'word-meaning' || variant == 'word-synonyms' || variant == 'word-antonyms') {
            word_generator.next();
            gen_next = word_generator.next(variant);
            if (gen_next.done ?? true) {
                word_generator = wordGetter(state1_words, st1_options, hard_mode);
                word_generator.next();
                gen_next = word_generator.next(variant);
            }
            gen_next = gen_next.value;
            // [word, task1, task2, expected, explanation, options]
        }
        task_list.push([variant, gen_next]);
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
        let category_element_mode_active = 0;
        if (st1_word_to_category == combo_st1_word_to_category.Only) {
            category_element_mode_active = randomChoice([1, 2]);
        }
        else if (st1_word_to_category == combo_st1_word_to_category.Enable) {
            category_element_mode_active = randomChoice([0, 1, 2]);
        }
        if (skip_mode === true) {
            expected = 'skip';
            updateChooser(skip_plug);
        }
        if (n_prev_task[0] == 'image' || n_prev_task[0] == 'voice') {
            let image_struct = n_prev_task[1];
            let task_type = image_struct[5];
            if (task_type == 'word') {
                category_element_mode_active = 0;
            }
            if (category_element_mode_active && (image_struct[0] == 'Adjectives' ||
                image_struct[0] == 'Baby' ||
                image_struct[0] == 'Bedroom' ||
                image_struct[0] == 'Holidays' ||
                image_struct[0] == 'Verbs' ||
                image_struct[1] == 'Stages') &&
                st1_word_to_category != combo_st1_word_to_category.Only) {
                category_element_mode_active = 0;
            }
            if (hard_mode) {
                text += prev_n + "-Back [" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + "]\n";
            }
            else if (category_element_mode_active) {
                let element_name = '***';
                if (n_prev_task[0] == 'image' || st1_n === 0) {
                    element_name = image_struct[3];
                }
                text += prev_n + '-Back element: ';
                text += element_name + " (" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ")\n";
            }
            else {
                text += prev_n + '-Back category: ';
                text += image_struct[1] + " (" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ")\n";
            }
            explanation = image_struct[0] + " > " + image_struct[1] + " > " + image_struct[3];
            if (skip_mode === false) {
                let choose_text = '';
                let options = image_struct[4];
                if (category_element_mode_active == 0) {
                    expected = image_struct[3];
                    choose_text = "Choose element:\n";
                }
                else if (category_element_mode_active == 1) {
                    expected = image_struct[0];
                    let i = 0;
                    for (let x of options) {
                        if (x[0] == image_struct[3]) {
                            options[i][0] = expected;
                            options[i][1] = '';
                        }
                        ++i;
                    }
                    choose_text = "Choose category:\n";
                }
                else if (category_element_mode_active == 2) {
                    expected = image_struct[1];
                    let i = 0;
                    for (let x of options) {
                        if (x[0] == image_struct[3]) {
                            options[i][0] = expected;
                            options[i][1] = '';
                        }
                        ++i;
                    }
                    choose_text = "Choose category:\n";
                }
                options = randomShuffle(options);
                let options_by_first = [];
                let i = 0;
                for (let x of options) {
                    if (x[0] == expected) {
                        explanation = '[' + (i + 1) + '] ' + explanation;
                    }
                    options_by_first.push([x[0]]);
                    i += 1;
                }
                if (task_type == 'image' || task_type == 'voice') {
                    options = options_by_first;
                    text += choose_text;
                    text += convertOptionsToString(options_by_first);
                }
                else if (task_type == 'word') {
                    text += choose_text.slice(0, -2) + '\n';
                }
                updateChooser(options, task_type == 'word');
            }
        }
        else if (n_prev_task[0] == 'word-just-one' || n_prev_task[0] == 'word-meaning' || n_prev_task[0] == 'word-synonyms' || n_prev_task[0] == 'word-antonyms') {
            if (hard_mode) {
                text += prev_n + "-Back [" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + "]\n";
            }
            else {
                text += prev_n + "-Back (" + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ")\n";
            }
            if (skip_mode === false) {
                if (n_prev_task != current_task && st1_word_mode_random.length > 0 &&
                    (n_prev_task[0] == 'word-just-one' || n_prev_task[0] == 'word-synonyms' || n_prev_task[0] == 'word-antonyms')) {
                    task_type = randomChoice(st1_word_mode_random);
                    word_generator.next();
                    gen_next = word_generator.next([task_type, n_prev_task[1][0]]);  // [task_type, word]
                    if (!(gen_next.done ?? true)) {
                        n_prev_task = [task_type, gen_next.value];
                    }
                }
                expected = n_prev_task[1][3]; // [word, task1, task2, expected, explanation, options]
                explanation = n_prev_task[1][4] ? ('\n' + n_prev_task[1][4]) : '';
                let options = n_prev_task[1][5];
                options = randomShuffle(options);
                updateChooser(options);
                if (n_prev_task == current_task) {
                    text += n_prev_task[1][1] + '\n';
                }
                text += n_prev_task[1][2] + '\n' + text_to_lines(convertOptionsToString(options), 100, 1, true) + '\n';
            }
        }
        if (current_task[0] == 'image') {
            let image_struct = current_task[1];
            let task_type = image_struct[5];
            if (task_type == 'word') {
                let word = image_struct[3];
                text += '\nNext word: ' + word + '\n';
            }
            else if (task_type == 'image') {
                let image_path = image_struct[2];
                let img = imageDiv?.firstChild;
                img.src = image_path;
                img.alt = image_path;
                imageDiv.style.display = '';
            }
            lines.push("N=" + prev_n + ", " + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ": " +
                capitalize(current_task[0]) + ': ' + image_struct[0] + " > " + image_struct[1] + " > " + image_struct[3]);
        }
        else if (current_task[0] == 'voice') {
            let voice_struct = current_task[1];
            voiceButton.voice_text = voice_struct[3];
            voiceButton.voice_index = st1_voice_index;
            voiceButton?.onmouseup();
            lines.push("N=" + prev_n + ", " + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ": " +
                capitalize(current_task[0]) + ': ' + voice_struct[0] + " > " + voice_struct[1] + " > " + voice_struct[2]);
            voiceDiv.style.display = '';
        }
        else if (current_task[0] == 'word-just-one' || current_task[0] == 'word-meaning' || current_task[0] == 'word-synonyms' || current_task[0] == 'word-antonyms') {
            if (current_task != n_prev_task || skip_mode) {
                text += '\n' + current_task[1][1] + '\n';
            }
            let line = "N=" + prev_n + ", " + (auto_increase_counter + 1) + (st1_auto_mode > 0 ? "/" + st1_auto_mode : "") + ": ";
            if (current_task[0] == 'word-just-one') {
                line += capitalize(current_task[0].replace('-', ' ')) + ': ' + current_task[1][0];
            }
            else if (current_task[0] == 'word-meaning') {
                let meaning = state1_words[current_task[1][0].toLowerCase()][0];
                meaning = meaning ? (' - ' + meaning) : '';
                line += capitalize(current_task[0].replace('-', ' ')) + ': ' + current_task[1][0] + meaning;
            }
            else {
                line += capitalize(current_task[0].replace('-', ' ')) + ': ' + current_task[1][0] + ' -> ' + current_task[1][3];
            }
            lines.push(line);
        }
        updateLastHistoryItem([lines.join("\n")]);

        show_trial_timer_var = st1_show_trial_time_limit;
        if (st1_show_trial_time_limit > 0) {
            showTrialTimerP.innerHTML = '' + show_trial_timer_var;
            st1_show_trial_interval = setInterval(function () {
                show_trial_timer_var -= 0.1;
                if (show_trial_timer_var <= 0) {
                    appendText(taskArea, "\n", clearBefore);
                    showTrialTimerP.innerHTML = '&nbsp;';
                    showTrialTimerImg.style.display = '';
                    imageDiv.style.display = 'none';
                    voiceDiv.style.display = 'none';
                    clearInterval(st1_show_trial_interval);
                    return;
                }
                else {
                    showTrialTimerP.innerHTML = '' + Number(show_trial_timer_var).toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                }
            }, 100);
        }
        else {
            showTrialTimerP.innerHTML = '&nbsp;';
        }

        answer_trial_timer_var = st1_answer_trial_time_limit;
        if (st1_answer_trial_time_limit > 0) {
            answerTrialTimerP.innerHTML = '' + answer_trial_timer_var;
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
                    answerTrialTimerP.innerHTML = '' + Number(answer_trial_timer_var).toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                }
            }, 100);
        }
        else {
            answerTrialTimerP.innerHTML = '&nbsp;';
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
                images_generator = imageGetter(state1_images, st1_options, hard_mode, not_item_checker, not_variants_checker);
                word_generator = wordGetter(state1_words, st1_options, hard_mode);
                appendText(taskArea, '', clearBefore);
                break;
            }
            appendText(taskArea, actual + ' - ');
            let status = actual === expected;
            if (status) {
                if (skip_mode === false) {
                    auto_increase_counter += 1;
                    addScore('st1', st1_n + 1);
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
                let st2_boxes = parseInt(settings['st2_boxes']);
                let st2_operations = parseInt(settings['st2_operations']);
                let st2_minmax_operations = toIntOrIntRange(settings['st2_minmax_operations']);
                let st2_min_operations = st2_minmax_operations[0];
                let st2_max_operations = st2_minmax_operations.length == 2 ? st2_minmax_operations[1] : st2_min_operations;
                if (st2_operations < st2_max_operations) {
                    st2_operations += 1;
                }
                else if (st2_boxes < 30) {
                    st2_operations = st2_min_operations;
                    st2_boxes = st2_boxes + 1;
                }
                setSetting('st2_boxes', st2_boxes);
                setSetting('st2_operations', st2_operations);
                state2();
            },
            function (event) {
                let st2_boxes = parseInt(settings['st2_boxes']);
                let st2_operations = parseInt(settings['st2_operations']);
                let st2_minmax_operations = toIntOrIntRange(settings['st2_minmax_operations']);
                let st2_min_operations = st2_minmax_operations[0];
                let st2_max_operations = st2_minmax_operations.length == 2 ? st2_minmax_operations[1] : st2_min_operations;
                if (st2_operations > st2_min_operations) {
                    st2_operations -= 1;
                }
                else if (st2_boxes > 2) {
                    st2_operations = st2_max_operations;
                    st2_boxes = st2_boxes - 1;
                }
                setSetting('st2_boxes', st2_boxes);
                setSetting('st2_operations', st2_operations);
                state2();
            },
        ],
        ["st2_auto_mode", "<b>Auto mode</b><br>Move to the next level every N successfully completed iterations<br>[0:disable|1-100]", "integer", function (xv) {
            return xv === 0 || 1 <= xv && xv <= 100;
        }],
        ["st2_boxes", "<b>Auto mode</b><br>Number of boxes [2-25]", "integer", function (xv) {
            return 2 <= xv && xv <= 25;
        }],
        ["st2_operations", "<b>Auto mode</b><br>Number of operations [1-5]", "integer", function (xv) {
            return 1 <= xv && xv <= 5;
        }],
        ["st2_minmax_operations", "Min-Max operations [1-5]", "range", function (xv) {
            return xv != null &&
                1 <= xv[0] && xv[0] <= 5 &&
                (xv.length === 1 || 1 <= xv[1] && xv[1] <= 5);
        }],
        ["st2_minmax_number", "Min-Max number of item to add/subtract [1-10]", "range", function (xv) {
            return xv != null &&
                1 <= xv[0] && xv[0] <= 10 &&
                (xv.length === 1 || 1 <= xv[1] && xv[1] <= 10);
        }],
        [
            "Default settings", "Clear score", "buttons",
            function (event) {
                if (confirm('Are you sure you want to set the default settings?')) {
                    stateN_defaults('st2');
                }
            },
            function (event) {
                if (confirm('Are you sure you want to clear the scores?')) {
                    stateN_clear_score('st2');
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
    addWidget(createKeyboard(asciiDigits, state2, exButtons,
        ['3', '6', '9'], Array.from(asciiDigits).reduce((a, v) => ({ ...a, [v]: ['w30'] }), {})));
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
    let st2_auto_mode = parseInt(settings['st2_auto_mode']);
    let st2_boxes = parseInt(settings['st2_boxes']);
    let st2_operations = parseInt(settings['st2_operations']);
    let st2_minmax_operations = toIntOrIntRange(settings['st2_minmax_operations']);
    let st2_minmax_number = toIntOrIntRange(settings['st2_minmax_number']);
    let st2_min_operations = st2_minmax_operations[0];
    let st2_max_operations = st2_minmax_operations.length == 2 ? st2_minmax_operations[1] : st2_min_operations;
    let st2_min_number = st2_minmax_number[0];
    let st2_max_number = st2_minmax_number.length == 2 ? st2_minmax_number[1] : st2_min_number;
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
                        addScore('st2', st2_boxes - 1 + st2_operations - 1);
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
                        setSetting('st2_boxes', st2_boxes);
                        setSetting('st2_operations', st2_operations);
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
        lst = lst.slice_ext(...slc);
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
                let slice = stmt.slice_ext(null, i);
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
                let slice = stmt.slice_ext(i + 1);
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
                let slice = stmt.slice_ext(null, args[2]);
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
                let slice = stmt.slice_ext(-args[2]);
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
                let slice = stmt.slice_ext(i - args[2], i);
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
                let slice = stmt.slice_ext(i + 1, i + 1 + args[2]);
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
                let slice = stmt.slice_ext(0 + args[2], null, 2);
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
                let slice = stmt.slice_ext(0 + args[2], i, 2);
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
                let slice = stmt.slice_ext(i + 1 + ((i % 2) == args[2]), null, 2);
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
                let slice = args.slice_ext(2);
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
                let slice = stmt.slice_ext(null, i);
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
                let slice = stmt.slice_ext(i + 1);
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
                let slice = stmt.slice_ext(null, i);
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
                let slice = stmt.slice_ext(i + 1);
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
                let slice = stmt.slice_ext(null, args[2]);
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
                let slice = stmt.slice_ext(-args[2]);
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
                let slice = stmt.slice_ext(i - args[2], i);
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
                let slice = stmt.slice_ext(i + 1, i + 1 + args[2]);
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
                let slice = stmt.slice_ext(null, args[2]);
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
                let slice = stmt.slice_ext(-args[2]);
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
                let slice = stmt.slice_ext(i - args[2], i);
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
                let slice = stmt.slice_ext(i + 1, i + 1 + args[2]);
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
                let slice = stmt.slice_ext(args[2], null, 2);
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
                let slice = stmt.slice_ext(args[2], null, 2);
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
                let slice = stmt.slice_ext(args[2], i, 2);
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
                let slice = stmt.slice_ext(i + 1 + ((i % 2) == args[2]), null, 2);
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
                let slice = stmt.slice_ext(args[2], i, 2);
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
                let slice = stmt.slice_ext(i + 1 + ((i % 2) == args[2]), null, 2);
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
        args_list.push([all_args.slice_ext(0, 100), check_function, format_function]);
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
                stmt_variants.push(variants.slice_ext(0, 2));
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
            for (let [_, p_pi] of product_spi.slice_ext(1)) {
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
    currentGenerator = null;
    state = 3;
    clearWidgets();
    addWidget(createCaption(statesToNames.st3));
    addWidget(createParameters([
        [
            "Start", "Back", "buttons",
            function (event) {
                state3_start();
            },
            function (event) {
                state3_back();
            },
        ],
        [
            "Increase level", "Decrease", "buttons",
            function (event) {
                let st3_stn = parseInt(settings['st3_stn']);
                let st3_current_level = parseInt(settings['st3_current_level']);
                let st3_minmax_stmts = toIntOrIntRange(settings['st3_minmax_stmts']);
                let st3_minmax_level = toIntOrIntRange(settings['st3_minmax_level']);
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
                setSetting('st3_stn', n_statements);
                setSetting('st3_current_level', level);
                state3();
            },
            function (event) {
                let st3_stn = parseInt(settings['st3_stn']);
                let st3_current_level = parseInt(settings['st3_current_level']);
                let st3_minmax_stmts = toIntOrIntRange(settings['st3_minmax_stmts']);
                let st3_minmax_level = toIntOrIntRange(settings['st3_minmax_level']);
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
                setSetting('st3_stn', n_statements);
                setSetting('st3_current_level', level);
                state3();
            },
        ],
        ["st3_auto_mode", "<b>Auto mode</b><br>Move to the next level every N successfully solved puzzles<br>[0:disable|1-100]", "integer", function (xv) {
            return xv === 0 || 1 <= xv && xv <= 100;
        }],
        ["st3_stn", "<b>Auto mode</b><br>Current number of statements [4-12]", "integer", function (xv) {
            return 4 <= xv && xv <= 12;
        }],
        ["st3_current_level", "<b>Auto mode</b><br>Current level [1-7]", "integer", function (xv) {
            return 1 <= xv && xv <= 7;
        }],
        ["st3_minmax_stmts", "Min-Max number of statements [4-12]", "range", function (xv) {
            return xv != null &&
                4 <= xv[0] && xv[0] <= 12 &&
                (xv.length === 1 || 4 <= xv[1] && xv[1] <= 12);
        }],
        ["st3_minmax_level", "Min-Max level [1-7]", "range", function (xv) {
            return xv != null &&
                1 <= xv[0] && xv[0] <= 7 &&
                (xv.length === 1 || 1 <= xv[1] && xv[1] <= 7);
        }],
        ["st3_max_solutions", "Max solutions [1-10]", "integer", function (xv) {
            return 1 <= xv && xv <= 10;
        }],
        [
            "Default settings", "Clear score", "buttons",
            function (event) {
                if (confirm('Are you sure you want to set the default settings?')) {
                    stateN_defaults('st3');
                }
            },
            function (event) {
                if (confirm('Are you sure you want to clear the scores?')) {
                    stateN_clear_score('st3');
                }
            },
        ],
    ]));
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
    let task = createInputElems();
    let taskDiv = task[0];
    let taskArea = task[1];
    let fs = parseInt(settings['st3_font_size']);
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
            let newValue = Math.min(20, Math.max(9, fs + 1));
            setSetting('st3_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
        },
        '-': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(9, fs - 1));
            setSetting('st3_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
        },
    }));
    taskArea.innerHTML = 'Generating...\n';
    setTimeout(function () {
        currentGenerator = state3_generator(taskArea);
        updateTableOfSelects(currentGenerator.next().value);
    }, 50);
}

function* state3_generator(taskArea) {
    let st3_auto_mode = parseInt(settings['st3_auto_mode']);
    let st3_stn = parseInt(settings['st3_stn']);
    let st3_current_level = parseInt(settings['st3_current_level']);
    let st3_minmax_stmts = toIntOrIntRange(settings['st3_minmax_stmts']);
    let st3_minmax_level = toIntOrIntRange(settings['st3_minmax_level']);
    let st3_max_solutions = parseInt(settings['st3_max_solutions']);
    let stmts_min = st3_minmax_stmts[0];
    let stmts_max = st3_minmax_stmts.length === 2 ? st3_minmax_stmts[1] : stmts_min;
    let level_min = st3_minmax_level[0];
    let level_max = st3_minmax_level.length === 2 ? st3_minmax_level[1] : level_min;
    let clearBefore = true;
    let n_statements = Math.max(4, Math.min(stmts_max, Math.max(stmts_min, st3_stn)));
    let level = Math.min(7, Math.min(level_max, Math.max(level_min, st3_current_level)));
    let auto_increase_counter = 0;
    while (true) {
        let [solutions, statements] = generateRecursiveRiddle(n_statements, level, st3_max_solutions);
        let header = [''].concat(range(2, n_statements + 1).map(x => '' + x));
        let htmlTable = [header, ['Value']];
        for (let _ of header.slice(1)) {
            htmlTable[1].push(['False', 'True']);
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
                        addScore('st3', n_statements - 1 + Math.floor(level / 3));
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
            setSetting('st3_stn', n_statements);
            setSetting('st3_current_level', level);
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
    currentGenerator = null;
    state = 4;
    clearWidgets();
    addWidget(createCaption(statesToNames.st4));
    addWidget(createParameters([
        [
            "Start", "Back", "buttons",
            function (event) {
                state4_start();
            },
            function (event) {
                state4_back();
            },
        ],
        [
            "Increase level", "Decrease", "buttons",
            function (event) {
                let st4_current_attributes = parseInt(settings['st4_current_attributes']);
                let st4_current_objects = parseInt(settings['st4_current_objects']);
                let st4_current_level = parseInt(settings['st4_current_level']);
                let st4_minmax_attributes = toIntOrIntRange(settings['st4_minmax_attributes']);
                let st4_minmax_objects = toIntOrIntRange(settings['st4_minmax_objects']);
                let st4_minmax_level = toIntOrIntRange(settings['st4_minmax_level']);
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
                setSetting('st4_current_attributes', n_attributes);
                setSetting('st4_current_objects', m_objects);
                setSetting('st4_current_level', level);
                state4();
            },
            function (event) {
                let st4_current_attributes = parseInt(settings['st4_current_attributes']);
                let st4_current_objects = parseInt(settings['st4_current_objects']);
                let st4_current_level = parseInt(settings['st4_current_level']);
                let st4_minmax_attributes = toIntOrIntRange(settings['st4_minmax_attributes']);
                let st4_minmax_objects = toIntOrIntRange(settings['st4_minmax_objects']);
                let st4_minmax_level = toIntOrIntRange(settings['st4_minmax_level']);
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
                setSetting('st4_current_attributes', n_attributes);
                setSetting('st4_current_objects', m_objects);
                setSetting('st4_current_level', level);
                state4();
            },
        ],
        ["st4_auto_mode", "<b>Auto mode</b><br>Move to the next level every N successfully solved puzzles<br>[0:disable|1-100]", "integer", function (xv) {
            return xv === 0 || 1 <= xv && xv <= 100;
        }],
        ["st4_current_attributes", "<b>Auto mode</b><br>Current attributes [2-5]", "integer", function (xv) {
            return 2 <= xv && xv <= 5;
        }],
        ["st4_current_objects", "<b>Auto mode</b><br>Current objects [2-5]", "integer", function (xv) {
            return 2 <= xv && xv <= 5;
        }],
        ["st4_current_level", "<b>Auto mode</b><br>Current level [1-20]", "integer", function (xv) {
            return 1 <= xv && xv <= 20;
        }],
        ["st4_minmax_attributes", "Min-Max attributes [2-5]", "range", function (xv) {
            return xv != null &&
                2 <= xv[0] && xv[0] <= 5 &&
                (xv.length === 1 || 2 <= xv[1] && xv[1] <= 5);
        }],
        ["st4_minmax_objects", "Min-Max objects [2-5]", "range", function (xv) {
            return xv != null &&
                2 <= xv[0] && xv[0] <= 5 &&
                (xv.length === 1 || 2 <= xv[1] && xv[1] <= 5);
        }],
        ["st4_minmax_level", "Min-Max level [1-20]", "range", function (xv) {
            return xv != null &&
                1 <= xv[0] && xv[0] <= 20 &&
                (xv.length === 1 || 1 <= xv[1] && xv[1] <= 20);
        }],
        ["st4_hard_mode", "Hard mode", "combobox", Object.values(combo_st4_hard_mode)],
        ["st4_max_seconds", "Max seconds to wait for generation [0-600]", "integer", function (xv) {
            return 0 <= xv && xv <= 600;
        }],
        ["st4_max_solutions", "Max solutions [1-10]", "integer", function (xv) {
            return 1 <= xv && xv <= 10;
        }],
        [
            "Default settings", "Clear score", "buttons",
            function (event) {
                if (confirm('Are you sure you want to set the default settings?')) {
                    stateN_defaults('st4');
                }
            },
            function (event) {
                if (confirm('Are you sure you want to clear the scores?')) {
                    stateN_clear_score('st4');
                }
            },
        ],
    ]));
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
    let task = createInputElems();
    let taskDiv = task[0];
    let taskArea = task[1];
    let fs = parseInt(settings['st4_font_size']);
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
            let newValue = Math.min(20, Math.max(9, fs + 1));
            setSetting('st4_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
        },
        '-': () => {
            let fs = parseInt(taskArea.style.fontSize);
            fs = isFinite(fs) ? fs : 16;
            let newValue = Math.min(20, Math.max(9, fs - 1));
            setSetting('st4_font_size', newValue);
            taskArea.style.fontSize = newValue + 'px';
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
            string_format = string_format.replace(substr, list_for_format[i]);
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
    let st4_auto_mode = parseInt(settings['st4_auto_mode']);
    let st4_current_attributes = parseInt(settings['st4_current_attributes']);
    let st4_current_objects = parseInt(settings['st4_current_objects']);
    let st4_current_level = parseInt(settings['st4_current_level']);
    let st4_minmax_attributes = toIntOrIntRange(settings['st4_minmax_attributes']);
    let st4_minmax_objects = toIntOrIntRange(settings['st4_minmax_objects']);
    let st4_minmax_level = toIntOrIntRange(settings['st4_minmax_level']);
    let st4_hard_mode = settings['st4_hard_mode'];
    let st4_max_seconds = parseInt(settings['st4_max_seconds']);
    let st4_max_solutions = parseInt(settings['st4_max_solutions']);
    let hard_mode = st4_hard_mode === combo_st4_hard_mode.Enable;
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
    while (true) {
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
                        addScore('st4', n_attributes * m_objects + Math.floor(level / 4));
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
                setSetting('st4_current_attributes', n_attributes);
                setSetting('st4_current_objects', m_objects);
                setSetting('st4_current_level', level);
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

function addEvent(element, eventName, fn) {
    if (element.addEventListener) {
        element.addEventListener(eventName, fn, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + eventName, fn);
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
    let last_version = parseFloat(localStorage.getItem('VERSION'));
    if (last_version < 5.00) {
        stateN_defaults('st1');
        stateN_clear_score('st1');
        stateN_defaults('st2');
        stateN_clear_score('st2');
        stateN_defaults('st3');
        stateN_clear_score('st3');
        stateN_defaults('st4');
        stateN_clear_score('st4');
    }
    localStorage.setItem('VERSION', version);
}

let state = -1;
let currentGenerator = null;

let asciiDigits = '123456789-0_';
let statesToNames = {
    st1: 'Multi N-Back',
    st2: 'Boxes',
    st3: 'Recursive-Solving',
    st4: 'Puzzle-Solving'
};
let combo_st1_image_mode = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_word_mode = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_word_mode_just_word = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_word_mode_meaning = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_word_mode_synonyms = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_word_mode_antonyms = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_word_mode_random = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_options = {
    "2": "2",
    "4": "4",
    "6": "6",
    "8": "8",
    "12": "12"
};
let combo_st1_word_to_category = {
    Enable: "Enable",
    Only: "Only",
    Disable: "Disable"
};
let combo_st1_word_to_image = {
    Enable: "Enable",
    Only: "Only",
    Disable: "Disable"
};
let combo_st1_voice_to_image = {
    Enable: "Enable",
    Only: "Only",
    Disable: "Disable"
};
let combo_st1_hard_mode = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_baby_category = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_family_members_category = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_halloween_category = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st1_insects_category = {
    Enable: "Enable",
    Disable: "Disable"
};
let combo_st4_hard_mode = {
    Enable: "Enable",
    Disable: "Disable"
};
let settings = loadSettings();
let scores = loadScores();
let exHistory = loadHistory();
let version = localStorage.getItem('VERSION');

let st1_show_trial_interval = null;
let st1_answer_trial_interval = null;
let state1_voice_mp3 = {};

let state1_images = {};
let state1_words = {};

getVoices();
loadScript('images.js');
loadScript('words.js');
addEvent(window, 'load', () => {
    state1_images = getImages();
    state1_words = getWords();
});
