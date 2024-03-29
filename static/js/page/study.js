let postRender = new Vue({
        el: '#content-post',
        data: {
            Contents: '<h1>로딩중</h1>', // 본문 서버에 요청할 내용 //
            title: '',
            time: ''
        },
    delimiters: ['[[',']]']
});
let postListRender = new Vue({
        el : '#postlist',
        data: {
            PostList: []
        },
        methods:{
            change_post: function(pid) {change(pid)}
        },
    delimiters: ['[[',']]']
});
let json_data = null;
let post_list_json = null;

function change(p)
{
    let requester = new XMLHttpRequest();
    requester.open("GET", "/api/post/".concat(p));
    requester.onreadystatechange = function(){
        if (!(requester.readyState === 4 && requester.status === 200)) return;
        json_data = requester.responseText;
        let data = JSON.parse(json_data);
        postRender.Contents = data['contents'];
        postRender.time = data['recent_date'];
        postRender.title = data['title']
    };

    requester.send();
}

function posts(id) {
    let requester2 = new XMLHttpRequest();
    requester2.open("GET", "/api/gallery/".concat(id));
    let data;
    requester2.onreadystatechange = function(){
        if (!(requester2.readyState === 4 && requester2.status === 200)) return;
        post_list_json = requester2.responseText;
        data= JSON.parse(post_list_json);
        let p_list = [];
        for(let i = 0; i < data['posts'].length; i++)
        {
            p_list[i] = {};
            p_list[i]['title'] = data['posts'][i]['title'];
            p_list[i]['pid'] = data['posts'][i]['pid'];
        }
        p_list.sort(function (a, b) {
            return a.pid - b.pid;
        });
        postListRender.PostList = p_list;
        change(p_list[0]['pid'])
    };
    requester2.send()
}

