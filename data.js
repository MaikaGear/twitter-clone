
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
export const tweetsData = [   
    {
        handle: `@iLoveCookies🍪`,
        profilePic: `images/cookies.jpg`,
        likes: 14,
        retweets: 1,
        tweetText: `I sell custom made cookies 💰💰 DM me if you wanna buy I offer discounted prices`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    },    
    {
        handle: `@Monkey D. Luffy`,
        profilePic: `images/luffy.jpg`,
        likes: 988,
        retweets: 49,
        tweetText: `I need some crew members, I'm thinking of becoming a pirate! Who's interested?`,
        replies: [
                  {
                handle: `@Zoro`,
                profilePic: `images/zoro.jfif`,
                tweetText: `Sign me up`,
            },
                  {
                handle: `@Cowardly Usopp`,
                profilePic: `images/usopp.jpg`,
                tweetText: `Sounds scary, can I join?`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    },
        {
        handle: `@Clownfish112233`,
        profilePic: `images/clownfish.jpg`,
        likes: 35,
        retweets: 2,
        tweetText: `Has anybody seen my son his names nemo lolz`,
        replies: [
            {
                handle: `@Royal Blue Tang`,
                profilePic: `images/bluetang.webp`,
                tweetText: `I think so. Wait how'd I type this, I'm a fish. Am I a fish? What's a fish?`,
            }
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    },     
]