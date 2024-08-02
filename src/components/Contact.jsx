import React from "react";
import MainNav from "./MainNav";

const Contact = () => {
  return (
    <section id="about">
      <MainNav />
      <div className="about-container">
        <div className="about-content">
          <h1>Contact</h1>
          <div className="contact-desc">
            <div className="short-message">
              <form action="mailto:alidkhaida@gmail.com">
                <input required type="text" placeholder="Your userId" />
                <input required type="email" placeholder="Your email" />
                <textarea
                  required
                  name="des"
                  id=""
                  placeholder="Message"
                ></textarea>
                <button className="btn">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
