let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');

let docRef = db.collection("blogs")
let allPosts;
docRef.get().then((doc) => {
    allPosts = doc.docs;
    console.log(allPosts)
    getAdminWrittenBlogs();
    document.getElementById("userName").innerHTML = auth.currentUser.email.split('@')[0];
})

auth.onAuthStateChanged((user) => {
    if (user) {
        login.style.display = "none";
    } else {
        setupLoginButton();
    }
})

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectURL) {
                login.style.display = "none";
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    })
}

//fetch user written blogs
const getAdminWrittenBlogs = () => {
    db.collection("blogs").where("author", "==", auth.currentUser.email.split('@')[0])
        .get()
        .then((blogs) => {
            blogs.forEach((blog) => {
                console.log(blog.data());
                createBlogForAdmin(blog);
            })
        })
        .catch((error) => {
            console.log(error);
        })
}


const createBlogForAdmin = (blog) => {
    const blogSection = document.getElementById('admin');
    let data = blog.data();
    console.log(blog.id)
    blogSection.innerHTML += `
    <div class="meal" id="${blog.id}">
    <img src="${data.bannerImage}" class="meal-img" alt="Avocado Salad" />
    <div class="meal-content">
        <div class="meal-tags">
            <span class="tag tag--vegan" style="background-color:#87489c; color:white;  text-transform: lowercase; padding:5px">${data.autori}</span>
            <span class="tag"style="border:3px solid#87489c;  text-transform: lowercase; padding:5px ; margin-left:25px">${data.date}</span>
        </div>
        <p class="meal-title"> ${data.title.substring(0, 100) + '...'}</p>
        <p>${data.article.substring(0, 200) + '...'}</p>
        <span class="tag tag--paleo" style="background-color:#87489c; color:white; text-transform:lowercase">${data.category}</span>
        <span class="tag" style="border:2px solid #87489c; text-transform:lowercase">${data.scategory}</span>
        <span class="tag tag--paleo" style="margin-left:40px; background-color:#FE4849"><a href="#" onclick="doit('${blog.id}')"  style="color:white; text-transform:lowercase; ">delete</a></span>
        </div>
`;
}

const doit = (id) => {

    db.collection("blogs").doc(id).delete().then(() => {
        location.replace("/posts");
    })
        .catch((error) => {
            console.log("error dleeting the blog");
        })
}


const goTo = () => {
    location.replace("/editor");
}
