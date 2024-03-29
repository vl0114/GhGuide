let gall_cards = new Vue(
    {
        el:"#glc",
        data:
            {
                galls:[
                    {img:"", title:"", info:"", gid:-1}
                ]

            },
        delimiters: ['[[',']]']
    }
);

function gall_list() {
    let requester = new XMLHttpRequest();
    requester.open("GET", "/api/gallery");
    requester.onreadystatechange = function () {
        if (!(requester.readyState === 4 && requester.status === 200)) return;
        let r = JSON.parse(requester.responseText);
        r.sort(function (a, b) {
            return a.gid - b.gid;
        });
        gall_cards.galls = r;
    };
    requester.send()
}