import { info, success, error, defaults} from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';

defaults.animateSpeed = 'fast';
defaults.delay = 2000;

export function showInfo() {
    info({
        title: "☀",
        text: "What are you looking for?:)",
    });
}

export function showSuccess() {
    success({
        title: "🚀",
        text: "Loading.. Please wait ❣",
    });
}

export function showError() {
    error({
       title: "🤔",
        text: "Make sure all words are spelled correctly?",
    });
}