window.addEventListener('message', (event) => {
    if (event.origin !== 'https://crazystuffofficial.github.io' && event.origin) {
        alert("It seems like you aren't in the official website. Please try going to the official website https://crazystuffofficial.github.io")
        return;
    }
    if (event.data == "Save all games") {
        window.parent.postMessage({
            cookies: document.cookie.split('; '),
            storage: {
                local: JSON.parse(JSON.stringify(localStorage)),
                session: JSON.parse(JSON.stringify(sessionStorage))
            }
        }, '*');
    } else if (JSON.stringify(event.data).includes("cookies") && JSON.stringify(event.data).includes("local") && JSON.stringify(event.data).includes("session") && JSON.stringify(event.data).includes("storage")) {
        event.data.cookies.forEach(cookie => {
            if (cookie.trim()) {
                document.cookie = cookie.trim() + '; path=/';
            }
        });
        for (var key in event.data.storage.local) {
            localStorage.setItem(key, event.data.storage.local[key]);
        }
        for (var key in event.data.storage.session) {
            localStorage.setItem(key, event.data.storage.session[key]);
        }
    }
});
