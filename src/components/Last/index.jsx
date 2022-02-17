import React from 'react';

const Last = () => (
  <div className="container-fluid bg-black">
    <section className="row justify-content-between py-2 my-bg-color">
      <div className="col-7 d-flex text-qhali">
        <div>
          <i className="bi bi-envelope" />
          <small className="mx-2">@qhalikay</small>
        </div>
        <div>
          <i className="bi bi-geo-alt" />
          <small className="mx-2">Lima, Perú</small>
        </div>
      </div>
      <div className="col-5">
        <span className="mx-2 text-qhali float-end">
          <i className="bi bi-facebook" />
        </span>
        <span className="mx-2 text-qhali float-end">
          <i className="bi bi-github" />
        </span>
        <span className="mx-2 text-qhali float-end">
          <i className="bi bi-google" />
        </span>
        <span className="mx-2 text-qhali float-end">
          <i className="bi bi-linkedin" />
        </span>
      </div>
    </section>
  </div>
);

export default Last;
