if (!isAuthenticated) {
  alert('Please login to like or dislike projects.');
  return;
}

let likeDislikevalue = e.currentTarget?.value ?? 'null';
if (userLikeDislike[projectId] === likeDislikevalue) {
  likeDislikevalue = 'null';
}
setUserLikeDislike(prevState => ({
  ...prevState,
  [projectId]: likeDislikevalue,
}));
