
let docRef = db.collection("blogs")
let allPosts;
docRef.get().then((doc) => {
    allPosts = doc.docs;
    console.log(allPosts)
    getUserWrittenBlogs(allPosts);
})
const getUserWrittenBlogs = (blogs) => {
    blogs.forEach((blog) => {
        createBlogForUsers(blog);
    })
}


const createBlogForUsers = (blog) => {
    let blogSection = document.getElementById("all-blogs")
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="meal" id="${blog.id}">
    <img src="${data.bannerImage}" class="meal-img" alt="Avocado Salad" />
    <div class="meal-content">
        <div class="meal-tags">
            <span class="tag tag--vegan" style="background-color:#87489c; color:white;  text-transform: lowercase; padding:5px">${data.autori}</span>
            <span class="tag " style="border:3px solid#87489c;  text-transform: lowercase; padding:5px ; margin-left:25px" >${data.date}</span>
        </div>
        <p class="meal-title"> ${data.title.substring(0, 100)}</p>
        <p>${data.article.substring(0, 200)}</p>
        <span class="tag tag--paleo" style="background-color:#87489c; color:white; text-transform:lowercase">${data.category}</span>
        <span class="tag " style="border:2px solid #87489c; text-transform:lowercase">${data.scategory}</span>
        </div>
`;
}

const showFilteredPosts = (value) => {
    db.collection("blogs").get().then(snap => {
        console.log(snap.size)
    })
    let arrayTwo = [];
    let blogSection = document.getElementById("all-blogs")
    allPosts.forEach(blog => {
        console.log(blog.data().category)
        if (blog.data().category == value) {
            arrayTwo.push(blog);
        }
    })
    blogSection.innerHTML = "";
    getUserWrittenBlogs(arrayTwo);
}
const showAll = () => {
    let blogSection = document.getElementById("all-blogs")
    blogSection.innerHTML = "";
    getUserWrittenBlogs(allPosts)
}


const doit = (id) => {

    db.collection("blogs").doc(id).delete().then(() => {
        location.replace("/posts");
    })
        .catch((error) => {
            console.log("error dleeting the blog");
        })
}
