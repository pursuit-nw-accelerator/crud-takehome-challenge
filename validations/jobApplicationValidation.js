// Validate job application
const validateJobApplication = (data) => {

    if (!data || typeof data !== 'object') {
        return { error: 'Validation failed: Invalid data format' };
    }

    // Validate data fields
    const { company, url, status } = data;
    if (!company || !url || !status) {
        return { error: 'Validation failed: Missing or invalid data fields' };
    }

    // Validate status field
    const validStatus = ['APPLIED', 'CREATED', 'REJECTED', 'PHONE_SCREEN', 'ON_SITE', 'RECEIVED_OFFER', 'OFFER_ACCEPTED', 'OFFER_DECLINED'];
    if (!validStatus.includes(status)) {
        return { error: 'Validation failed: Invalid status value' };
    }

    return null;
};
let status = Object.values()
module.exports = {
    validateJobApplication
};
