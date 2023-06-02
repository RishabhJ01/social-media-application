function likeDislike(_id){
    event.preventDefault();
    let res = action({
        _id: _id,
        type: event.target.name,
    }, "/like-dislike");
    res.then((val) => {
        // console.log(val);
        return val.json();
    }).then((val) => {
        document.getElementById(_id).childNodes[1].childNodes[3].innerHTML = val.count.likes
        document.getElementById(_id).childNodes[3].childNodes[3].innerHTML = val.count.dislikes
    })
}
async function action(data, url){
    
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let response = await fetch(url, options);
    return response;
}

function comment(_id){
    event.preventDefault()
    const formData = new FormData(event.target);
    let res = action({
        _id: _id,
        body: formData.get('body')
    }, "/comment");

    res.then((val) => {
        return val.json();
    }).then((val) => {
        console.log(console.log(val))
    })

}