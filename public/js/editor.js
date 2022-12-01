const blogTitleField = document.getElementById('title');
const articleFeild = document.getElementById('article');
const categoryFeild = document.getElementById("category");
const authorFeild = document.getElementById("autori");
const scategoryFeild = document.getElementById("subcategory");
const dateField = document.getElementById("data");
//banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;
const publishBtn = document.querySelector('.publish-btn');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);
        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                if (uploadType == "image") {
                    addImage(data, file.name);
                } else {
                    bannerPath = `${location.origin}/${data}`;
                }
            })
    } else {
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);

}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

let idD; //for published at info
db.collection("blogs").get().then(snap => {
    idD = snap.size + 1;
    console.log(idD)
})

publishBtn.addEventListener('click', () => {
    //access firestore with db variable
    db.collection("blogs").doc().set({
        number: idD,
        date: dateField.value,
        title: blogTitleField.value,
        article: articleFeild.value,
        bannerImage: bannerPath,

        category: categoryFeild.value,
        scategory: scategoryFeild.value,
        publishedAt: "",
        author: auth.currentUser.email.split("@")[0],
        autori: authorFeild.value

    }).then(() => {
        location.href = `/posts`;
    })
        .catch(() => {
            console.log(err);
        })
    idD++;
})

//checking for user logged in or not
auth.onAuthStateChanged((user) => {
    if (!user) {
        location.replace("/admin");
    }
})


let blogID = location.pathname.split("/");
blogID.shift();

if (blogID[0] != "editor") {
    //means we are in existing blog edit route
    let docRef = db.collection("blogs").doc(decodeURI(blogID[0]));
    docRef.get().then((doc) => {
        if (doc.exists) {
            let data = doc.data();
            bannerPath = data.bannerImage;
            banner.style.backgroundImage = `url(${bannerPath})`;
            blogTitleField.value = data.title;
            articleFeild.value = data.article;

        } else {
            location.replace("/");
        }
    })
}
