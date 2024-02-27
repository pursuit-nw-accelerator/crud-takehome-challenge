//validate job App

const validateJobApplication = (id, data) => {
    //check if id is a valid number
    if(isNaN(id) || id <= 0) {
        return { error: 'Invalid ID provided'};
    }

    //validate data
    const { company, url, createdAt, status, updatedAt } = data;
    if(!company ) {
        return { error: error.message }
    }
    if(!url){
        return {error: error.message}
    }
    if(isNaN(Date.parse(createdAt)) || isNaN(Date.parse(updatedAt))) {
        return {error: error.message}
    }
    const validStatus = ['APPLIED', 'CREATED', 'REJECTED', 'PHONE_SCREEN', 'ON_SITE', 'RECEIVED_OFFER', 'OFFER_ACCEPTED', 'OFFER_DECLINED']
    if(!validStatus.includes(status)) {
        return { error: error.message}
    }
    return null
}

module.exports = {
    validateJobApplication
}