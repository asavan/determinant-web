import {delay} from "netutils";

export default async function draw(presenter, box, digits) {
    for (let i = 0; i < presenter.matrix_result.length; i++) {
        const tile = box.childNodes[i];
        const val = presenter.matrix_result[i];

        if (presenter.isLastMove(i)) {
            tile.classList.add("last");
        } else {
            tile.classList.remove("last");
        }

        if (tile.classList.contains("disabled")) {
            continue;
        }

        if (presenter.isBestPosition(i)) {
            tile.classList.add("best");
        } else {
            tile.classList.remove("best");
        }

        if (val) {
            tile.classList.remove("hole");
            tile.textContent = val.toString();
            tile.classList.add("disabled");
            tile.classList.remove("active");
            tile.classList.remove("best");
        }

        if (presenter.getActivePosition() === i) {
            tile.classList.add("active");
            if (presenter.isCurrentRed()) {
                tile.classList.add("comp");
            } else {
                tile.classList.add("player");
            }
        } else {
            tile.classList.remove("active");
            tile.classList.remove("comp");
            tile.classList.remove("player");
        }
        if (presenter.comp_moves[i]) {
            tile.classList.add("comp");
        }
        if (presenter.player_moves[i]) {
            tile.classList.add("player");
        }
    }

    const digits_local = presenter.getDigits();
    for (let i = 0; i < presenter.matrix_result.length; i++) {
        const val = i + 1;
        const tile = digits.querySelector(`div[data-num="${val}"]`);
        if (!tile) {
            continue;
        }
        const used = digits_local[i];

        if (used) {
            tile.classList.add("disabled");
        }
        if (presenter.getActiveDigitIndex() === i) {
            tile.classList.add("active");
            if (presenter.isCurrentRed()) {
                tile.classList.add("comp");
            } else {
                tile.classList.add("player");
            }
        } else {
            tile.classList.remove("active");
            tile.classList.remove("comp");
            tile.classList.remove("player");
            tile.classList.remove("best");
        }
        if (i === presenter.matrix_result[presenter.getLastCompMove()] - 1) {
            tile.classList.add("comp");
        }
        if (i === presenter.matrix_result[presenter.getLastUserMove()] - 1) {
            tile.classList.add("player");
        }
        if (presenter.isBestDigit(i)) {
            tile.classList.add("best");
        }

        if (used) {
            await delay(650);
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    // DOM mutation
                    tile.remove();
                });
            } else {
                // Alternative if no browser support
                tile.remove();
            }
        }
    }
}
