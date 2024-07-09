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
    } else if (JSON.Stringify(event.data).includes("cookies") && JSON.Stringify(event.data).includes("local") && JSON.Stringify(event.data).includes("session") && JSON.Stringify(event.data).includes("storage")) {
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
