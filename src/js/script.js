(() => {
    fetch('puzzle.json')
        .then((response) => response.json())
        .then((data) => initPuzzle(data));
})();

function initPuzzle(puzzle) {
    layoutPuzzle(puzzle.layout);
    setupKeyboard(puzzle.layout);
    setupClues(puzzle.clues);
}

function layoutPuzzle(layout) {
    let template = '';
    let i = 1;
    for (let j = 0; j < layout.length; j++) {
        for (let k = 0; k < layout[j].length; k++) {
            template += '<div class="square">';
            if (layout[j].charAt(k) == '.') {
                if (j == 0 || layout[j - 1][k] == ' ' ||
                    k == 0 || layout[j][k - 1] == ' ') {
                    template += `<div class="num" id="${i}">${i}</div>`;
                    i++;
                }
                template += `<input id="${j}:${k}" maxlength="1">`;
            } else {
                template += `<input id="${j}:${k}" disabled>`;
            }
            template += `</div>`;
        }
    }
    document.querySelector('.puzzle').innerHTML = template;
}

function setupKeyboard(layout) {
    document.querySelectorAll('input').forEach((el) => {
        el.addEventListener('keydown', (evt) => {
            const index = evt.target.id.split(':');
            const j = parseInt(index[0] || 0, 10);
            const k = parseInt(index[1] || 0, 10);
            const jPrev = (j == 0 || layout[j - 1][k] == ' ') ? j : j - 1;
            const kPrev = (k == 0 || layout[j][k - 1] == ' ') ? k : k - 1;
            const jNext = (j == layout.length - 1 || layout[j + 1][k] == ' ') ? j : j + 1;
            const kNext = (k == layout[j].length - 1 || layout[j][k + 1] == ' ') ? k : k + 1;

            const curr = `${j}:${k}`;
            const hPrev = `${j}:${kPrev}`;
            const hNext = `${j}:${kNext}`;
            const vPrev = `${jPrev}:${k}`;
            const vNext = `${jNext}:${k}`;

            if (' AaBbCcĈĉDdEeFfGgĜĝHhĤĥIiJjĴjKkLlMmNnOoPpRrSsŜŝTtUuŬŭVvZz'.indexOf(evt.key) > -1) {
                document.getElementById(curr).value = evt.key;
                return;
            }

            switch (evt.key) {
                case 'X':
                case 'x':
                    switch(document.getElementById(curr).value) {
                        case 'C':
                        case 'c':
                            document.getElementById(curr).value = 'Ĉ';
                            break;

                        case 'G':
                        case 'g':
                            document.getElementById(curr).value = 'Ĝ';
                            break;

                        case 'H':
                        case 'h':
                            document.getElementById(curr).value = 'Ĥ';
                            break;

                        case 'J':
                        case 'j':
                            document.getElementById(curr).value = 'Ĵ';
                            break;

                        case 'S':
                        case 's':
                            document.getElementById(curr).value = 'Ŝ';
                            break;

                        case 'U':
                        case 'u':
                            document.getElementById(curr).value = 'Ŭ';
                            break;
                    }
                    break;

                case 'Delete':
                case 'Backspace':
                    document.getElementById(curr).value = '';
                    break;

                case 'ArrowUp':
                    document.getElementById(vPrev).focus();
                    break;

                case 'ArrowDown':
                    document.getElementById(vNext).focus();
                    break;

                case 'ArrowLeft':
                    document.getElementById(hPrev).focus();
                    break;

                case 'ArrowRight':
                    document.getElementById(hNext).focus();
                    break;
            }
            evt.preventDefault();

        });
    });

    k = 0;
    while (layout[0][k] == ' ') {
        k++;
    }
    document.getElementById(`0:${k}`).focus();
}

function setupClues(clues) {
    ['across', 'down'].forEach((dir) => {
        let template = '';
        clues[dir].forEach((clue) => {
            template += `<li value="${clue.num}">${clue.clue}</li>`;
        });
        document.querySelector(`.${dir}-clues`).innerHTML = template;
    });
}

