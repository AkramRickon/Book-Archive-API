
//Global declaration for repeating task
const resultFound=document.getElementById('result-found');
const bookContainer=document.getElementById('book-container');


// spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Handle search  event
document.getElementById('search-btn').addEventListener('click',()=>
{
    const searchBook=document.getElementById('search-book');
    const searchBookName=searchBook.value;
    // clear data
    searchBook.value='';
    bookContainer.innerHTML='';
    resultFound.innerHTML='';

    // Error Handling
    if(searchBookName==='')
    {
        // set error message
        resultFound.innerHTML="<h5 class='text-danger'>Search field can not be empty</h5>";
        return;
    }

    //Fetch desired data from server
    const url=` https://openlibrary.org/search.json?q=${searchBookName}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>showBooks(data))

    // display spinner
    toggleSpinner('block');

})

// Display Book details function
const showBooks=(data)=>
{
    // Error Handling
    if(data.numFound===0)
    {
        resultFound.innerHTML="<h5 class='text-danger'>No result found</h5>";
        // Hide spinner
         toggleSpinner('none');
        return;
    }
    else 
    {
         //set total number of found results
        resultFound.innerHTML=`<h4 class='text-success'>Total number of results found: ${data.numFound}</h4>`
    }

    const books=data.docs;
    // Loop through books array for book details
    books?.forEach(book=>{
        const div=document.createElement('div');
        div.classList.add('col');

        div.innerHTML=`
            <div class="card h-100 rounded shadow border border-secondary">
            <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top" height=300px alt="image not found">
            <div class="card-body">
            <p class="card-title"><b>Book Name</b>: ${book?.title}</p>
            <p class="card-text"><b>Author Name:</b>  ${book?.author_name?.[0]}</p>
            <p class="card-text"><b>Publisher: </b> ${book?.publisher?.[0]}</p>
            <p class="card-text"><b>First Publish Year:</b> ${book?.first_publish_year}</p>
        `;
        bookContainer.appendChild(div);
    })
    // Hide spinner
    toggleSpinner('none');
}
