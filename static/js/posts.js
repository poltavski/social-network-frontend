$( document ).ready(function() {
    getFeed()
});

// const backendBaseURL = "http://127.0.0.1:8000";
//
async function getData(url = '') {
    // Default options are marked with *
    return await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
    }); // parses JSON response into native JavaScript objects
}
//
// post is result of response
function getHtmlPost(post_data) {
    return `
             <div class="card gedf-card" id="${post_data.id}">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src="http://127.0.0.1:8000/post/get-image?image_id=${post_data.profile_image_id ? post_data.profile_image_id : ''}&is_profile=true" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0">${post_data.first_name + ' ' + post_data.last_name}</div>
                                    <div class="h7 text-muted" id="${post_data.user_id}">@${post_data.username}</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="dropdown">
                                        <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-h"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                            <a class="dropdown-item" href="#"><i class="fa fa-edit mr-2"></i>Edit</a>
                                            <a class="dropdown-item btn-outline-danger" href="#"><i class="fa fa-trash mr-2"></i>Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="text-muted h7 mb-2">
                                <a class="card-link" href="#"><i class="fa fa-clock-o"></i>${post_data.time_from_now}</a>
                            </div>
                            <p class="card-text">
                               ${post_data.content}
                            </p>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="card-link"><i class="fa fa-star"></i> Like</a>
                            <!--<a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
                                <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a> -->
                        </div>
                    </div>
             </div>
`
}

function getHtmlImagePost(post_data) {
    return `
             <div class="card gedf-card" id="${post_data.id}">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src="http://127.0.0.1:8000/post/get-image?image_id=${post_data.profile_image_id}&is_profile=true" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0">${post_data.first_name + ' ' + post_data.last_name}</div>
                                    <div class="h7 text-muted" id="${post_data.user_id}">@${post_data.username}</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="dropdown">
                                        <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-h"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                            <a class="dropdown-item" href="#"><i class="fa fa-edit mr-2"></i>Edit</a>
                                            <a class="dropdown-item btn-outline-danger" href="#"><i class="fa fa-trash mr-2"></i>Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="text-muted h7 mb-2">
                                <a class="card-link" href="#"><i class="fa fa-clock-o"></i>${post_data.time_from_now}</a>
                            </div>
                            <img class="rounded float-left mr-3 post-image" src="http://127.0.0.1:8000/post/get-image?image_id=${post_data.image_id}"/>
                            <p class="card-text">
                               ${post_data.content}
                            </p>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="card-link"><i class="fa fa-star"></i> Like</a>
                            <!--<a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
                                <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a> -->
                        </div>
                    </div>
             </div>
`
}

function getFeed() {
    const url = backendBaseURL + '/post/get-feed'

    getData(url, {})
        .then((data) => {
            if (data.status === 200) {
                data.json()
                    .then((posts) => {
                        if (posts.length > 0) {
                            posts.forEach((post) => {
                                let posts_layout = $('.posts-layout')
                                post.image_id
                                    ? posts_layout.append(getHtmlImagePost(post))
                                    : posts_layout.append(getHtmlPost(post))
                            })
                        }
                        else {
                            $('.posts-layout').append('NO POSTS!!!')
                        }
                    })
            }
        })
        .catch((e) => console.log(e));
}
//
//
// const ImagePostTemplate = (
//     `<div class="card gedf-card">
//                     <div class="card-header">
//                         <div class="d-flex justify-content-between align-items-center">
//                             <div class="d-flex justify-content-between align-items-center">
//                                 <div class="mr-2">
//                                     <img class="rounded-circle" width="45" src="hhttp://127.0.0.1:8000/post/get-image?image_id=${post_data.image_id}" alt="">
//                                 </div>
//                                 <div class="ml-2">
//                                     <div class="h5 m-0">Miracles Lee Cross</div>
//                                     <div class="h7 text-muted">
//
//                                     </div>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div class="dropdown">
//                                     <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1"
//                                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                         <i class="fa fa-ellipsis-h"></i>
//                                     </button>
//                                     <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
//                                         <a class="dropdown-item" href="#"><i class="fa fa-edit mr-2"></i>Edit</a>
//                                         <a class="dropdown-item btn-outline-danger" href="#"><i class="fa fa-trash mr-2"></i>Delete</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                     </div>
//                     <div class="card-body">
//                         <div class="text-muted h7 mb-2">
//                             <a class="card-link" href="#"><i class="fa fa-clock-o"></i>
//                                ${post.date}
// <!--                            TIME-->
//                             </a>
//                         </div>
//                         <img class="rounded float-left mr-3" src="https://picsum.photos/300/300"/>
//                         <p class="card-text">
//                             ${post.text}
// <!--                        TEXT-->
//                         </p>
//                     </div>
//                     <div class="card-footer">
//                         <a href="#" class="card-link"><i class="fa fa-star"></i> Like</a>
//                     </div>
//                 </div>`
// )