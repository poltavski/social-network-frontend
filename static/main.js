function getHtmlSearchResult(user_id, user_info) {
    return `
        <button class="list-group-item list-group-item-action" id="${user_id}">
            <strong>@${user_info.username}</strong><br/>${user_info.name}
        </button>
    `
}

function getHtmlSearchProfile(user_data){
    return `
    <div class="modal" tabindex="-1" role="dialog" id="profileModal" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">@${user_data.username } profile</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body card">
            <div class="card-body">
<!--                {% if user_data.profile_image is not none %}-->
<!--                    {% set profile_image = user_data.profile_image %}-->
<!--                {% else %}-->
<!--                    {% set profile_image = "" %}-->
<!--                {% endif %}-->
<!--${user_data.profile_image}-->
                <div class="image mb-2"><img class="rounded-circle" width="150" src="http://127.0.0.1:8000/post/get-image?image_id=&is_profile=true" alt=""></div>
                <div class="h5">${user_data.first_name} ${user_data.last_name}</div>
                <div>
                    <span class="h7 text-muted">@${user_data.username }</span>
                    <button class="btn btn-primary btn-sm ml-3" type="button">Follow</button>
                </div>
                <div class="h7">${user_data.description}</div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="h6 text-muted">Followers</div>
                    <div class="h5">${user_data.num_of_followers}</div>
                </li>
                <li class="list-group-item">
                    <div class="h6 text-muted">Following</div>
                    <div class="h5">${user_data.num_of_subscriptions}</div>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `
}

$("#search-user" ).keydown(function() {
    // console.log( this.value );
    const url = backendBaseURL + '/user/search-user?user_info=' + this.value
    getData(url)
        .then((data) => {
            if (data.status === 200) {
                data.json()
                    .then((users) => {
                        // console.log(Object.keys(users).length)
                        let search_results = ""
                        let search_layout = $('.search-layout')
                        if (Object.keys(users).length > 0){
                            for (const [user_id, user_info] of Object.entries(users)) {
                              search_results+=(getHtmlSearchResult(user_id, user_info))
                            }
                            // console.log(search_results)
                        }
                        search_layout.html(search_results);
                    })
            }
        })
        .catch((e) => console.log(e));
});

$(document).ready(function() {
    $('.search-layout').on('click', '.list-group-item', function(e) {
        let user_id = $(this).attr('id')
        console.log(user_id)

        const url = backendBaseURL + '/user/user-info-id?id=' + user_id
        getData(url)
            .then((data) => {
                if (data.status === 200) {
                    data.json()
                        .then((user_data) => {
                            // console.log(user_data)
                            let modal_results = ""
                            let modal_layout = $('.modal-layout')
                            if (Object.keys(user_data).length > 0){
                                modal_results+=(getHtmlSearchProfile(user_data))
                                // console.log(search_results)
                            }
                            console.log(modal_results)
                            modal_layout.html(modal_results);
                            $('#profileModal').modal('show');
                        })
                }
            })
            .catch((e) => console.log(e));


    });


    // add modal with user info and follow button
//     2 more modals with other shit holes
});

