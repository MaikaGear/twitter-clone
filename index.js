import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const tweetDetails = document.querySelector('.tweet-details')
const myData = JSON.parse(localStorage.getItem('myTweet'))
const newInput = document.createElement('textarea')
const newBtn = document.createElement('button')

newBtn.setAttribute('id','reply-btn')
newBtn.setAttribute('class', 'reply-btn')
newInput.setAttribute('class', 'reply-textarea')
newInput.setAttribute('placeholder','Type a reply...')
newInput.setAttribute('id','reply-input')
newBtn.innerText = 'Post reply'
const replyInput = document.getElementById('reply-input')

// console.log(myData)

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.dataset.delete){
        handleDeleteClick(e.target.dataset.delete)
    }
    else if(e.target.id === 'replyBtn'){
        handleReplyBtnClick()
    }
})


function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}


function handleReplyClick(replyId){
    
    const repliesSection = document.getElementById(`replies-${replyId}`)
    repliesSection.classList.toggle('hidden')

    if(!repliesSection.contains(newInput)){
        repliesSection.appendChild(newInput)
        repliesSection.appendChild(newBtn)
    }
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@MaikaTheDragon`,
            profilePic: `images/maika.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
            canDelete: true,
        })
        localStorage.setItem('myTweet', JSON.stringify(tweetInput.value));
    tweetInput.value = ''
    }
    render()
}




function handleDeleteClick(tweetId){
    let tweetItem = document.querySelector('.tweet')
    const targetDelObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetDelObj.canDelete){
        tweetItem.remove()
    }
}

function handleReplyBtnClick(replyId){
    console.log('click')
}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        let deleteIconClass = ''
        if(!tweet.canDelete){
            deleteIconClass = 'deleted'
        }
        
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }
        
          
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
                <span class="tweet-detail delete-btn hidden" id="delete-${tweet.uuid}">
                <i class="fa-solid fa-trash-can" data-delete=${tweet.uuid}></i>
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
</div>
`



   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
    tweetsData.forEach(function(tweet){
        if(tweet.canDelete){
            document.querySelector('.delete-btn').classList.remove('hidden')
        }
    })
}

render()

