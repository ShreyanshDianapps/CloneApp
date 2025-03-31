import i18n from './local/i18n';

const translationKeys = {
  
 
  // Add other translation keys as needed
};

const strings = {
    letsTakeFirstStep: 'Let’s take the first step with devotion.',
  enterYourNumber: 'Enter Your Number',
  sixOtpSend: '6 digit OTP will be sent on this number.',
  phoneNumber: 'Phone Number',
  getOtp: 'Get OTP',
};

for (const [key, value] of Object.entries(strings)) {
  Object.defineProperty(strings, key, {
    get: () => i18n.t(value),
  });
}

export default strings;
