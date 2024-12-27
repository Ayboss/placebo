module.exports = function (){
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = 5;
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters[randomIndex];
    }
  const otpCreatedAt = Date.now() + (30*60*1000)
    return {otp, otpCreatedAt};
    
}