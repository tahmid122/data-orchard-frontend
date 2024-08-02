import React from "react";
import MainNav from "./MainNav";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
const About = () => {
  return (
    <section id="about">
      <MainNav />
      <div className="about-container">
        <div className="about-content">
          <h1>About</h1>
          <div
            style={{
              marginTop: "50px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="response">
              <div className="contact-image-div">
                <img src="/alihaider.jpg" alt="ali haider" />
              </div>
              <div className="con-desc">
                <div className="cd-parts">
                  <FaUser className="cd-parts-icon" />
                  <span>Ali Haider (Chief Administrative Officer)</span>
                </div>
                <div className="cd-parts">
                  <FaLocationDot className="cd-parts-icon" />
                  <span>Lisbon, Portugal</span>
                </div>
                <div className="cd-parts">
                  <FaPhoneAlt className="cd-parts-icon" />
                  <span>
                    <a href="tel:+880 013xxxxx76">9875641545</a>
                  </span>
                </div>
                <div className="cd-parts">
                  <FaEnvelope className="cd-parts-icon" />
                  <span>
                    <a href="mailto:alidkhaida@gmail.com">
                      alidkhaida@gmail.com
                    </a>
                  </span>
                </div>
                <div className="cd-parts">
                  <FaFacebook className="cd-parts-icon" />
                  <span>
                    <a href="https://www.facebook.com/alidkhaida">Message Me</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
