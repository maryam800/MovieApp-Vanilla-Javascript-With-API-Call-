const API_URL="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b587c0c13d2504c1c55ba863f105e194"
const imgUrl='https://image.tmdb.org/t/p/w500/'
const Search_URL='https://api.themoviedb.org/3/search/movie?api_key=b587c0c13d2504c1c55ba863f105e194'
let main=document.getElementById('main')
let form=document.getElementById('form')
let totalPages=500;
var currentPage=1;
let searchVal=document.getElementById('search')
function updateUI(movies){
    main.innerHTML=''
    for(let movie of movies){
        const{title , poster_path ,vote_average ,overview} = movie
        //console.log(movie)
        let content=`
        <div class="movie">
                <img src="${imgUrl + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getRatingColor(vote_average)}">${vote_average}</span>
                </div>
                <div class="movie-overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
            </div>
        `
        main.innerHTML+=content
    }
}
function getMovie(url ,pageNumber){
    fetch(`${url}&page=${pageNumber}`).
    then(response => response.json()).
    then(data =>{
        let results=data.results
        console.log(pageNumber)
        updateUI(results)
    })
}
getMovie(API_URL ,1)

// specify rate Class
function getRatingColor(voteVal){
    if(voteVal >= 8){
        return "green"
    }
    else if(voteVal >=5){
        return "orange"
    }
    else{
        return "red"
    }

}
//search function
form.addEventListener('submit' ,(e)=>{
    e.preventDefault()
    let searchTerm=searchVal.value
    if(searchTerm !== ''){
        getMovie(`${Search_URL}&query=${searchTerm}`,currentPage)
        searchVal.value=''
    }
    else{
        window.location.reload()
    }
})

//Prev And Next Function
let prev=document.getElementById('prev')
let next=document.getElementById('next')
prev.addEventListener('click' ,()=>{
    if(currentPage === 1){
        currentPage =totalPages;
        getMovie(API_URL ,currentPage)
    }
    else if(currentPage > 1){
        currentPage --;
        getMovie(API_URL ,currentPage)   
    }
})
next.addEventListener('click' ,()=>{
    if(currentPage === totalPages){
        currentPage =1;
        getMovie(API_URL ,currentPage)
    }
    else if(currentPage >=1){
        currentPage ++;
        getMovie(API_URL ,currentPage)
    }
})