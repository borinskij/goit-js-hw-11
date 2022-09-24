export const markupCard = (element = []) => {
  return element
    .map(e => {
      return `
<div class="photo-card">
<img src="${e.webformatURL}" class="rounded mx-auto d-block img-thumbnail" alt="${e.tags}" loading="lazy" widht = "250" height = "250"/>

<li>
<p><b>Likes</b></p>
<p class="info-item">
      ${e.likes}
    </p></li>
<li>
<p><b>Views</b></p>
<p class="info-item">
      ${e.views}
    </p></li>
<li>
<p><b>Comments</b></p>
<p class="info-item">
      ${e.comments}
    </p></li>
<li>
<p> <b>Downloads</b></p>
<p class="info-item">
     ${e.downloads}
    </p></li>
</ul>
</div>`;
    })
    .join('');
};
