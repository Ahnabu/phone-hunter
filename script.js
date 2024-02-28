const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    console.log(phones)
    displayPhone(phones,isShowAll)
}
const loading = (isLoading) => {
    const loading = document.getElementById('loading');
    if (isLoading) {
        loading.classList.remove('hidden');
    }
    else {
        loading.classList.add('hidden');
    };
    
}


const displayPhone = (phones,isShowAll) => {
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
    // show all if show all doesn't clicked 
    console.log(isShowAll)
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    
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
                        <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
                    </div>
                </div>
        `
        //  4- append child 
        phoneContainer.appendChild(phoneCard);
    }
    // stop spinner or loader
    loading(false);
}

// handel showDetails
const showDetails = async(id) => { 
    console.log(id);
    // load individual details
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    console.log(data)
    showDetailsModal(data.data)

}
//show phone details modal
const showDetailsModal = (phone) => {
    const phoneName = document.getElementById('phone-name');
    console.log(phone.name)
    phoneName.innerText = phone.name;
    //show the details
    show_details_modal.showModal();
    const detailConatiner = document.getElementById('show-detail-container');
    detailConatiner.innerHTML = `
    <p>Phone Name: ${phone.brand}</p>
    <img src="${phone.image}"/>
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures}`
}
// search handler 
const searchHandler = (isShowAll) => {
    loading(true);
    let search = document.getElementById('search-btn');
    const searchTerm = search.value;
    console.log(searchTerm);
   
    loadPhone(searchTerm,isShowAll);
    search.textContent = ' ';
}
// show all handler 
const handelShowAll = () => {
    searchHandler(true)
}