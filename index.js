const Letter = {
    async get() {
        let users = [];
        let posts = [];
        try {
            
            await fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then((data) => users = data);
               
            if (users.length === 0) {
                throw new Error("Empty Users Array");
            }
                
            await fetch('https://jsonplaceholder.typicode.com/posts')
                .then((response) => response.json())
                .then((data) => posts = data);
            
            if (posts.length === 0) {
                throw new Error("Empty Posts Array");
            }

            users.map(u => {
                let user = u;
                user.posts = [];
                posts.forEach(p => {
                    if (p.userId === user.id) {
                        let post = p;
                        delete post.userId;
                        user.posts.push(post);
                    }
                })
                return user;
            })
            
            return users;
        }
        catch(e) {
            throw new Error(e);
        }
    }
}

async function create() {
    let users = await Letter.get();
    console.log(users);
    let arrayText = '';
    arrayText = '[<br />';

    users.forEach(u => {
        arrayText += '&emsp;{<br />';
        arrayText += '&emsp;&emsp;"id": "' + u.id + '"<br />';
        arrayText += '&emsp;&emsp;"name": "' + u.name + '"<br />';
        arrayText += '&emsp;&emsp;"username": "' + u.username + '"<br />';
        arrayText += '&emsp;&emsp;"email": "' + u.email + '"<br />';
        arrayText += '&emsp;&emsp;"address": "' + u.address.street + ', ' + u.address.suite + ' - ' + u.address.zipcode + ' ' + u.address.city + '"<br />';
        arrayText += '&emsp;&emsp;"phone": "' + u.phone + '"<br />';
        arrayText += '&emsp;&emsp;"website": "' + u.website + '"<br />';
        arrayText += '&emsp;&emsp;"company": "' + u.company.name + '"<br />';
        arrayText += '&emsp;&emsp;"posts": [<br />';
        u.posts.forEach(p => {
            arrayText += '&emsp;&emsp;&emsp;{<br />';
            arrayText += '&emsp;&emsp;&emsp;&emsp;"id": "' + p.id + '"<br />';
            arrayText += '&emsp;&emsp;&emsp;&emsp;"title": "' + p.title + '"<br />';
            arrayText += '&emsp;&emsp;&emsp;&emsp;"body": "' + p.body + '"<br />';
            arrayText += '&emsp;&emsp;&emsp;}<br />';
        })
        arrayText += '&emsp;&emsp;]<br />';
        
        arrayText += '&emsp;}<br />';
    });

    arrayText += ']';
    document.getElementById("array").innerHTML = arrayText;
}


create();