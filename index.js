let posts = [];
const GET_POSTS = "https://jsonplaceholder.typicode.com/posts";

function generateError() {
  const error = document.createElement("div");
  error.innerHTML = "Something is wrong with the post";
  error.classList.add("error");
  document.body.append(error);
}

function generatePost(id, title) {
  const post = document.createElement("div");

  const idElement = document.createElement("div");
  idElement.innerHTML = `ID: ${id}`;

  const titleElement = document.createElement("div");
  titleElement.innerHTML = `TITLE: ${title}`;

  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn-danger");
  button.innerHTML = "Remove";
  button.onclick = function () {
    let newPosts = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id !== id) newPosts.push(posts[i]);
    }
    posts = newPosts;
    post.remove();
  };

  post.classList.add("post");
  post.append(idElement);
  post.append(titleElement);
  post.append(button);

  return post;
}

function generatePosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.id = "posts";
  if (postsContainer) {
    postsContainer.innerHTML = "";
    for (let i = 0; i < posts.length; i++) {
      const newPost = generatePost(posts[i].id, posts[i].title);
      postsContainer.append(newPost);
    }
  }
}

$("#load-btn").click(function () {
  $.get(GET_POSTS, function (data, status) {
    if (status === "success") {
      posts = data;
      generatePosts(data);

      const loadButton = document.getElementById("load-btn");
      if (loadButton) {
        loadButton.innerHTML = "Reload posts";
      }
    } else {
      generateError();
    }
  }).fail(function () {
    generateError();
  });
});
