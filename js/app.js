let posts=[ ];

const likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
    return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
    return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
    return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
    likedPostsId.push(id); 
    showPosts(posts);
};

const reportPost = (id) => {
    reportedPostsId.push(id);
    const remainingPosts = posts.filter((post) => !reportedPostsId.includes(post.id));
    showPosts(remainingPosts);
};

const displayContent = (text) => {
    return text.length < 30 ? text : text.slice(0, 30) + "<span class='fw-bold'>... read more</span>";
};

const switchTab = (id) => {
    if (id === "posts") {
        document.getElementById( "posts" ).style.display = "grid";
        document.getElementById( "liked" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";
    } else if (id === "liked") {
        document.getElementById( "liked" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";

        displayLikedPosts();
    } else {
        document.getElementById( "reported" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "liked" ).style.display = "none";

        displayReportedPosts();
    }
};
const createPost = (post) => {
  
    const image = post.image;
    const comment=post.comments[0]
    const div = document.createElement( "article" );
    div.classList.add( "post" );
    div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a href="https://github.com/ProgrammingHero1" target="_blank" class="post__avatar" >
                    <img src="${post.userImage}" alt="User Picture" />
             
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>
                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>
              <div class="post__content">
                <div class="post__medias">
                  <img class="post__media" src="${image}" alt="Post Content"/>
                </div>
              </div>
              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${isLiked(post.id) && "text-danger"}"></i>                  
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>               
                  <div class="post__indicators"></div>
                  <button class="post__button post__button--align-right" onclick="reportPost(${post.id})">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>
                <div class="post__content">${displayContent(post.description)}</div>
                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://tse1.mm.bing.net/th?id=OIP.0eMZtF3ImQ4e8sS8H17RbwHaHa&pid=Api&P=0&w=167&h=167" alt="User Picture" />
                    </a>
                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a>
                      </span>
                  </div>
                  <hr/>
                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#"> ${comment.user}</a>
                      <br>
                      ${comment.text}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
             `;
    return div;
};

const showPosts = (posts) => {
    const productsContainer = document.getElementById( "posts" );
    productsContainer.innerHTML = "";

    posts.forEach((post) => {
        const div = createPost(post);
        productsContainer.appendChild(div);
    });
};

const displayLikedPosts = () => {
    const likedPosts = getLikedPosts();
    document.getElementById( "liked" ).innerHTML=''
    likedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "liked" ).appendChild(div);
    });
};

const displayReportedPosts = () => {
    const reportedPosts = getReportedPosts();
    reportedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "reported" ).appendChild(div);
    });
};

const loadPosts = async () =>{
  let data = await fetch('../data/posts.json');
  posts = await data.json();
  showPosts(posts);
}

loadPosts();


/************************************************bonuse section ************************************************ */

const bonuse= (data) => {
  if (data === "js-work") {
      document.getElementById( "js-work" ).style.display = "block";
      document.getElementById( "event-loop" ).style.display = "none";
      document.getElementById( "local-session" ).style.display = "none";
  } else if (data === "event-loop") {
      document.getElementById( "event-loop" ).style.display = "block";
      document.getElementById( "js-work" ).style.display = "none";
      document.getElementById( "local-session" ).style.display = "none";

  } else {
      document.getElementById( "local-session" ).style.display = "block";
      document.getElementById( "js-work" ).style.display = "none";
      document.getElementById( "event-loop" ).style.display = "none";
  }
};