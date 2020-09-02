const delBtn = document.getElementById('delBtn');
const delForm = document.getElementById('delForm');

delBtn.addEventListener('click', () => {
  alertify
    .confirm('Cancel button is focused by default.')
    .set('defaultFocus', 'cancel');
  alertify.confirm('Deleting').setHeader('<strong>Deleting</strong>');
  alertify.confirm('Closable: false').set('closable', false);
  alertify
    .confirm('Are you sure?', () => {
      alertify.message('OK');
    })
    .set('onok', () => delForm.submit()),
    () => {
      alertify.error('Cancel');
    };
});
