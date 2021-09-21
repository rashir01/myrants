const updateFormHandler = async (event) => {
  event.preventDefault();
  console.log("xxxxxxxxxxxthis is new form handler!!!!!!!!!");
  //alert('This is update!')
  

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const postID =  document.getElementById('post-id').textContent;


  //alert(`title ${title} and content ${content} id ${postID}`);
  // console.log(event);

    if (title && content) {
      const response = await fetch(`/api/posts/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("response stringify " + JSON.stringify(response))
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
    }
};

document
  .querySelector('.update-button')
  .addEventListener('click', updateFormHandler);