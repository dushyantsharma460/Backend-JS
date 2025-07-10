require('dotenv').config()  
const express = require('express')  
const app = express()
const port = 3000

const githubData = {
"login": "dushyantsharma460",
"id": 148749504,
"node_id": "U_kgDOCN28wA",
"avatar_url": "https://avatars.githubusercontent.com/u/148749504?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/dushyantsharma460",
"html_url": "https://github.com/dushyantsharma460",
"followers_url": "https://api.github.com/users/dushyantsharma460/followers",
"following_url": "https://api.github.com/users/dushyantsharma460/following{/other_user}",
"gists_url": "https://api.github.com/users/dushyantsharma460/gists{/gist_id}",
"starred_url": "https://api.github.com/users/dushyantsharma460/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/dushyantsharma460/subscriptions",
"organizations_url": "https://api.github.com/users/dushyantsharma460/orgs",
"repos_url": "https://api.github.com/users/dushyantsharma460/repos",
"events_url": "https://api.github.com/users/dushyantsharma460/events{/privacy}",
"received_events_url": "https://api.github.com/users/dushyantsharma460/received_events",
"type": "User",
"user_view_type": "public",
"site_admin": false,
"name": "Dushyant Sharma",
"company": "Physics Wallah Institude of Innovation",
"blog": "https://www.youtube.com/channel/UCtkevrVtLBXZuI20w2jCvPw",
"location": "Bengaluru, Karnataka",
"email": null,
"hireable": null,
"bio": "2nd Year IIT Guwahati Student ",
"twitter_username": "DushyantS69741",
"public_repos": 34,
"public_gists": 0,
"followers": 3,
"following": 20,
"created_at": "2023-10-23T07:12:42Z",
"updated_at": "2025-05-26T04:56:45Z"
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
    res.send("dushyantsharma460")
})

app.get('/login',(req, res) => {
    res.send('<h1>Please login at DBlog</h1>')
})

app.get('/youtube', (req, res) => {
    res.send('<a href="https://blog-app-steel-six.vercel.app" target="_blank">Visit my Blog</a>')
})

app.get('/github', (req, res) => {
    res.json(githubData)
})
  
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`Try these routes:`);
    console.log(`http://localhost:${process.env.PORT}/`);
    console.log(`http://localhost:${process.env.PORT}/twitter`);
    console.log(`http://localhost:${process.env.PORT}/login`);
    console.log(`http://localhost:${process.env.PORT}/youtube`);
    console.log(`http://localhost:${process.env.PORT}/github`);
});
