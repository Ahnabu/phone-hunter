const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    console.log(phones)
    displayPhone(phones)
}


const displayPhone = (phones) => {
    // 1-get the element 
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container
    phoneContainer.textContent = '';
    // show 1st 12 phones
    
    const showAll = document.getElementById('show-all-btn');
    if (
        phones.length>12
    ) {
        showAll.classList.remove('hidden')
    }
    else if (phones.length < 12) {
        showAll.classList.add('hidden');
    }
    phones = phones.slice(0, 12);
    for (const phone of phones) {
        // console.log(phone);
        // 2-create a div 
        const phoneCard = document.createElement('div');
        // 3-set the inner html 
        phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                    <img src="${phone.image}" alt="Shoes"
                        class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
        `
        //  4- appned child 
        phoneContainer.appendChild(phoneCard);
    }
}

// search handler 
const searchHandler = () => {
    let search = document.getElementById('search-btn');
    const searchTerm = search.value;
    console.log(searchTerm);
   
    loadPhone(searchTerm);
    search.textContent = "";
}
