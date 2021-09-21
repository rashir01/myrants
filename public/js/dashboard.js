const newFormHandler = async (event) => {
  event.preventDefault();
  alert('this is newFormHandler in dashboard.js');

  const title = document.querySelector('#project-name').value.trim();
  const content = document.querySelector('#project-desc').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      //console.log("response ok... sending to /dashboard");
      //console.log("response stringify " + JSON.stringify(response))
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  alert('this is delete in dashboard.js');
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

const updateButtonHandler = async (event) => {
  alert('this is update in dashboard.js');

};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.btn-danger')
  .addEventListener('click', delButtonHandler);


