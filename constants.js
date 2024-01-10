// job application statuses
const applicationStatuses = {
  CREATED: 'CREATED', // the job was added to app, but no action taken yet
  APPLIED: 'APPLIED', // the user applied for the job
  REJECTED: 'REJECTED', // the user was notified they didn't get the job
  PHONE_SCREEN: 'PHONE_SCREEN', // the user was invited to do a phone screen
  ON_SITE: 'ON_SITE', // the user was invited to an on site interview
  RECEIVED_OFFER: 'RECEIVED_OFFER', // the user got a job offer
  OFFER_ACCEPTED: 'OFFER_ACCEPTED', // the user accepted the offer
  OFFER_DECLINED: 'OFFER_DECLINED', // the user declined the offer
};

module.exports = applicationStatuses;
