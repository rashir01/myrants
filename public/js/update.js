const updateFormHandler = async (event) => {
  event.preventDefault();
  //initializations
  let titleDiv = document.getElementById("title-div");
  let bodyDiv = document.getElementById("body-div");
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
      alert('Failed to create post');
    }
  } else {
    //if no title and content, then show the labels and fileds
    removeAllChildNodes(titleDiv);
    removeAllChildNodes(bodyDiv);

    let updateTitleLable = document.createElement("label");
    updateTitleLable.setAttribute('for', "project-name");
    updateTitleLable.textContent = "Post Title:";
    let updateTitleTextBox = document.createElement("input");
    updateTitleTextBox.setAttribute('class', "form-input");
    updateTitleTextBox.setAttribute('type', 'text');
    updateTitleTextBox.setAttribute('id', "post-title"); 
    updateTitleTextBox.setAttribute('name', "project-name");
    titleDiv.appendChild(updateTitleLable);
    titleDiv.appendChild(updateTitleTextBox);

    let updateBodyLabel = document.createElement("label");
    updateBodyLabel.setAttribute('for', 'project-desc');
    updateBodyLabel.textContent = "Post Content:";
    let updateBodyTextBox = document.createElement("textarea");
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

const commentFormHandler = async (event) => {
  event.preventDefault();
  let commentDiv = document.getElementById("comment-div");
  //if the comment text area is shown 
  if(commentDiv.hasChildNodes()) {
    //get the text
    const post_id = document.getElementById('post-id').textContent;

    let content = document.getElementById("comment-text").value.trim();
    //add the comment to the post
    if (content) {
      const response = await fetch(`/api/comment/`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/api/posts/${post_id}`);
        location.reload();
  
      } else {
        alert('Failed to create comment');
      }
    }
    //remove the text area
    removeAllChildNodes(commentDiv);

  } else {
    //show the comment textarea

    let addCommentLabel = document.createElement("label");
    addCommentLabel.setAttribute('for', "project-name");
    addCommentLabel.textContent = "Comment:";
    let commentTextBox = document.createElement("textarea");
    commentTextBox.setAttribute('class', "form-input");
    commentTextBox.setAttribute('type', 'text');
    commentTextBox.setAttribute('id', "comment-text"); 
    commentTextBox.setAttribute('name', "project-name");
    commentDiv.appendChild(addCommentLabel);
    commentDiv.appendChild(commentTextBox);
  }

}

document.querySelector('.comment-button')
.addEventListener('click', commentFormHandler);
try {
document
  .querySelector('.update-button')
  .addEventListener('click', updateFormHandler);
} catch (err) {}