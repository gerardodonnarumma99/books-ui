---
layout: main
title: Books UI
---

<div class="nav-scroller bg-white shadow-sm">
  <nav class="nav nav-underline">
    <a class="nav-link" href="#" id="addNewBook">Aggiungi</a>
  </nav>
</div>

{% include alert.html %}

<div class="container pt-5">
  <div class="col-12">
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody id="bodyTable"></tbody>
    </table>
  </div>
</div>


{% include book-modal.html %}
{% include bookUpdate-modal.html %}
