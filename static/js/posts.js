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

async function postDataImage(url = '', data = {}) {
    // Default options are marked with *
    console.log('data ', data);
    return await fetch(url, {
        method: 'POST',
        // headers: myHeaders,
        body: data,
        redirect: 'follow',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }); // parses JSON response into native JavaScript objects
}

function addPost(){
    const parentDiv = $('.tab-content');
    const activeDiv = parentDiv.children('.active');
    const text = activeDiv.find('.custom-text-input');
    const image = activeDiv.find('.custom-file-input');

    console.log('activeDiv: ', activeDiv);
    console.log('text ', text)
    console.log('image ', image)
    console.log('VALUES:')
    console.log('text ', text.val())
    console.log('image ', image.get(0).files[0])
    // const postFile =$(addPostElem).closest('.custom-file-input');
    // const postText =$(addPostElem).closest('.form-group');
    // const postVisibility = $(addPostElem).closest('ul');
    // console.log(postFile)
    // console.log(postText)
    // console.log(postVisibility)
    // const url = backendBaseURL + '/post/change-likes?post_id=' + mainPostDiv.attr('id')
    // let photo = document.getElementById("image-file").files[0];
    // let formData = new FormData();
    // formData.append("image", image.get(0).files[0]);
    // for (var key of formData.entries()) {
    //     console.log(key[0] + ', ' + key[1]);
    // }
    // const url = backendBaseURL + '/post/upload-image'
    // postDataImage(url, formData)
    //     .then((data) => console.log(data.text()))

    // var settings = {
    //     "url": "http://127.0.0.1:8000/post/upload-image",
    //     "method": "POST",
    //     "timeout": 0,
    //     "headers": {
    //         'X-CSRF-TOKEN': getCookie("csrf_access_token")
    //     },
    //     "processData": false,
    //     "mimeType": "multipart/form-data",
    //     "contentType": false,
    //     "data": formData
    // };
    //
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    //     response.text((uuidImg) => console.log(uuidImg));
    // });

    var myHeaders = new Headers();
    myHeaders.append("X-CSRF-TOKEN", getCookie("csrf_access_token"));

    var formdata = new FormData();
    formdata.append("image", image.get(0).files[0]);
    // formdata.append("is_profile", "true");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
        credentials: 'include',
    };

    fetch("http://127.0.0.1:8000/post/upload-image", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
//
// post is result of response
function getHtmlPost(post_data) {
    return `
             <div class="card gedf-card main-post-div" id="${post_data.id}">
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
                                <a class="card-link" href="#"><i class="fa fa-clock-o"></i> ${post_data.time_from_now}</a>
                            </div>
                            <p class="card-text">
                               ${post_data.content}
                            </p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary card-link" onclick="changeLike(this)"><i class="fa fa-star"></i> ${post_data.likes} Like</button>
                            <!--<a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
                                <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a> -->
                        </div>
                    </div>
             </div>
`
}

function getHtmlImagePost(post_data) {
    return `
             <div class="card gedf-card main-post-div" id="${post_data.id}">
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
                                <a class="card-link" href="#"><i class="fa fa-clock-o"></i> ${post_data.time_from_now}</a>
                            </div>
                            <img class="rounded float-left mr-3 post-image" src="http://127.0.0.1:8000/post/get-image?image_id=${post_data.image_id}"/>
                            <p class="card-text">
                               ${post_data.content}
                            </p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary card-link" onclick="changeLike(this)"><i class="fa fa-star"></i> ${post_data.likes} Like</button>
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

function changeLike(likeElem) {
    const mainPostDiv =$(likeElem).closest('.main-post-div');
    const url = backendBaseURL + '/post/change-likes?post_id=' + mainPostDiv.attr('id')
    getData(url).then((data) => {
        data.json().then((numOfLikes) => {
            $(likeElem).html('<i class="fa fa-star"></i> ' + numOfLikes + ' Like');
        })
    })
}
