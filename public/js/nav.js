let ul = document.querySelector('.links-container');

auth.onAuthStateChanged((user) => {
    if (user) {
        //user is loggin
        ul.innerHTML += `
        <li class="nav-item"><a href="/admin" class="nav-link">Përdoruesi</a></li>
        <li class="nav-item"><a class="nav-link" href="#" onclick="logoutUser()" class="link">Ç’kyçu</a></li>
        `
    } else {
        // no one is logged in
        ul.innerHTML += `
        <li class="nav-item"><a href="/admin" class="nav-link">Kycu</a></li>
        `
    }
})