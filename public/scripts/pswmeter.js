document.getElementById('regBtn').disabled = true;
// Run pswmeter with options
const myPassMeter = passwordStrengthMeter({
  containerElement: '#pswmeter',
  passwordInput: '#psw-input',
  showMessage: true,
  messageContainer: '#pswmeter-message',
  messagesList: [
    'Write your password...',
    'Easy peasy!',
    'That is a simple one',
    'That is better',
    'Yeah! That password rocks',
  ],
  height: 6,
  borderRadius: 2,
  pswMinLength: 8,
});
myPassMeter.containerElement.addEventListener('onScore4', function () {
  document.getElementById('regBtn').disabled = false;
});
