import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    //request loading
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);
    //error
    const [error, setError] = useState({show:false,msg:""});

    const searchGithubUser = async(user) => {
        //toggleError -> set to default before every request
        toggleError();
        //setLoading(true)
        setLoading(true);
        const response = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err))
        if(response){
            setGithubUser(response.data);
            //response.data consists of login:username and followers_url as followers link
            const {login, followers_url} = response.data;
            // ----BLOCK-----------------------------------------------------------------------------------------
            //below axios request gets the user's repos to display in the repos component
            //axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => setRepos(response.data)) 
            //below axios request gets the user's followers to display in the followers card inside info.js
            //axios(`${followers_url}?per_page=100`).then((response) => setFollowers(response.data)) 
            // ----BLOCK--------------------------------------------------------------------------------------------
            //the above block of code is not used bcoz it sends requests at diff time and hence page loads one component by other
            //to fix this, and load every requests at the same time use Promise.allSettled
            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),axios(`${followers_url}?per_page=100`)])
            .then((results) => {
                const [repos,followers] = results;
                const status = 'fulfilled';
                if(repos.status === status){
                    setRepos(repos.value.data)
                }
                if(followers.status === status){
                    setFollowers(followers.value.data)
                }
            }).catch((err) => console.log(err));
        }
        else{
            toggleError(true,'No user matched your search !')
        }
        checkRequests();
        setLoading(false)
    }

    //check rate limit, since github API is 60 requests per hour
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`).then(({data}) => {
            let {rate:{remaining}} = data;
            setRequests(remaining)
            if(remaining === 0){
                //throw an error
                toggleError(true,"Sorry, you exceeded your hourly rate limit!")
            }
        }).catch((err) => console.log(err))
    }

    function toggleError(show = false,msg = ''){
        setError({show,msg})
    }

     useEffect(checkRequests,[])

    return <GithubContext.Provider value={{githubUser,repos,followers,requests,error,searchGithubUser,loading}}>{children}</GithubContext.Provider>
}

export {GithubContext,GithubProvider};