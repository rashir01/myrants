const updateFormHandler = async (event) => {
  event.preventDefault();
  //initializations
  var titleDiv = document.getElementById("title-div");
  var bodyDiv = document.getElementById("body-div");
  let title = "";
  let content = "";

  //assign values to title and content if they exist
  if (titleDiv.hasChildNodes() && bodyDiv.hasChildNodes()) {
    title = document.getElementById("post-title").value.trim();
    content = document.getElementById('post-content').value.trim();
  }

  const postID = document.getElementById('post-id').textContent;

  //if the user provided a title and content, then update
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
  } else {
    //if no title and content, then show the labels and fileds
    removeAllChildNodes(titleDiv);
    removeAllChildNodes(bodyDiv);

    alert('unable to get title and content');
    var updateTitleLable = document.createElement("label");
    updateTitleLable.setAttribute('for', "project-name");
    updateTitleLable.textContent = "Post Title:";
    var updateTitleTextBox = document.createElement("input");
    updateTitleTextBox.setAttribute('class', "form-input");
    updateTitleTextBox.setAttribute('type', 'text');
    updateTitleTextBox.setAttribute('id', "post-title"); updateTitleTextBox.setAttribute('name', "project-name");
    titleDiv.appendChild(updateTitleLable);
    titleDiv.appendChild(updateTitleTextBox);

    var updateBodyLabel = document.createElement("label");
    updateBodyLabel.setAttribute('for', 'project-desc');
    updateBodyLabel.textContent = "Post Content:";
    var updateBodyTextBox = document.createElement("textarea");
    updateBodyTextBox.setAttribute('class', 'form-input');
    updateBodyTextBox.setAttribute('id', 'post-content');
    updateBodyTextBox.setAttribute('name', 'project-desc');

    bodyDiv.appendChild(updateBodyLabel);
    bodyDiv.appendChild(updateBodyTextBox);

  }
};

//clear children so that they dont keep getting added everytime user presses update
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

document
  .querySelector('.update-button')
  .addEventListener('click', updateFormHandler);