import React from "react";
import style from "./Styles.module.css";
function Privacy() {
  return (
    <>
      <header className={style.header}>
        <h1>Foodernity Application</h1>
        <h2 className={style.title}>Privacy Notice</h2>
        <p>Last updated on March 30, 2022</p>
      </header>
      <article>
        <section>
          <h1 id="personal-info">Introduction</h1>
          <h4>
            Foodernity is a mobile application intented to serve as a donation
            platform that will bridge food donors, organizations, and
            beneficiaries. Through this application, redistributing excess food
            helps lessen the food waste while ensuring food security for
            beneficiaries' households. The data sent over the web server are
            managed by the developers and is stored in a third-party database.
            The processed data will be used by Most Holy Trinity Parish - Food
            Bank, an organization operating in Manila. These data will only be
            used within the application.
          </h4>
        </section>

        {/* <nav className={style.toTop}>
      <a href="#contents">back to top</a>
    </nav> */}

        <section>
          <h1 id="collection">Processing of Personal Data</h1>

          <h3>A. What The Application Collect from Users</h3>
          <h4>
            The application only collects the basic contact information of
            users. These data will only be used as the reference for the data
            posted in the mobile application, such as who made the donations.
            <br />
            &nbsp; &nbsp;• User's full name;
            <br /> &nbsp; &nbsp;• User's email address.
            <br />
            Optionally, users can upload any kind of profile picture and in the
            case of users uploading their real image, the image is stored in a
            third-party image hosting site. No other data will be collected
            aside from the ones mentioned before. By registering in the
            application, you acknowledge that the data will be collected by the
            application and will be used within the application.
          </h4>
          <h3>B. How Do We Use the Data Collected</h3>
          <h4>
            Personal data collected shall be used by the organization and only
            within the mobile application and web server. By default, user's
            personal information are only shown for the user itself. It will be
            the discretion of the user to make their personal information
            visible to other users as well within the application. In case of
            user making their information available to be seen by others, only
            the full name of the user and their donations will be visible. Other
            information such as profile picture and email address will not be
            and will never be seen by other users. Only the organization who
            handles the admin side will be able to see these information. The
            application strictly follows these rule to protect the identity of
            everyone.
          </h4>
          <h3>C. Storage, Retention and Destruction of the Collected Data</h3>
          <h4>
            The collected data are stored in a remote third-party database
            (MongoDB) which is securely stored as per their privacy policy -
          </h4>
          <blockquote>
            MongoDB, Inc. is committed to protecting your privacy. We have
            prepared this Privacy Policy to describe to you our practices
            regarding the Personal Data (as defined below) we collect from users
            of our website located at MongoDB.com and in connection with our
            MongoDB products and services (the "Products"). In addition, this
            Privacy Policy tells you about your privacy rights and how the law
            protects you.
          </blockquote>
          <h4>
            The web server that handles data transfer from the internet is
            tested with several security tools before being deployed - OWASP ZAP
            and Security Headers. All information gathered shall be retained
            until user requests their information to be removed. Moreover, all
            data collected will be immediately disposed upon the request of the
            organization.
          </h4>

          <h3>D.Who can Access the Collected Data</h3>
          <h4>
            Due to the sensitive and confidential nature of the personal data,
            only the user can access and see their own information in the
            application, unless they allow it to be visible to others. The
            organization shall be allowed to access such personal data, only to
            be used within the application only.
          </h4>
          <h3>E. Disclosure and Sharing of Data</h3>
          <h4>
            All users shall maintain the confidentiality and secrecy of their
            personal data that they post in the mobile application. Sharing of
            personal account to other users shall be prohibited. If such case
            happens, it will not be the liability of either the developers or
            the organization to deal with to possible consequences.
          </h4>
        </section>
      </article>
    </>
  );
}

export default Privacy;
