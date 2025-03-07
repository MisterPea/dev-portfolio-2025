export default function Header() {

  return (
    <>
      <header>
        <h1>P<span>.</span></h1>
        <div className="header-buttons_holder">
          <a href="/" aria-label="Home" className="home-button header_button project-anchor">
            <div className="svg_wrapper home_svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23 24" fill="none">
                <path d="M21.684 10.4724L12.6215 1.40988C12.4742 1.2626 12.2994 1.14576 12.107 1.06605C11.9145 0.986339 11.7083 0.945312 11.5 0.945312C11.2917 0.945312 11.0855 0.986339 10.8931 1.06605C10.7006 1.14576 10.5258 1.2626 10.3785 1.40988L1.31602 10.4724C1.16835 10.6194 1.05128 10.7941 0.971558 10.9866C0.891838 11.1791 0.851056 11.3855 0.851567 11.5939V22.4689C0.851567 22.6491 0.923177 22.822 1.05064 22.9495C1.17811 23.0769 1.35099 23.1486 1.53125 23.1486H8.78125C8.96152 23.1486 9.1344 23.0769 9.26186 22.9495C9.38933 22.822 9.46094 22.6491 9.46094 22.4689V15.8986H13.5391V22.4689C13.5391 22.6491 13.6107 22.822 13.7381 22.9495C13.8656 23.0769 14.0385 23.1486 14.2188 23.1486H21.4688C21.649 23.1486 21.8219 23.0769 21.9494 22.9495C22.0768 22.822 22.1484 22.6491 22.1484 22.4689V11.5939C22.149 11.3855 22.1082 11.1791 22.0285 10.9866C21.9487 10.7941 21.8317 10.6194 21.684 10.4724ZM20.7891 21.7892H14.8984V15.2189C14.8984 15.0386 14.8268 14.8657 14.6994 14.7383C14.5719 14.6108 14.399 14.5392 14.2188 14.5392H8.78125C8.60099 14.5392 8.42811 14.6108 8.30064 14.7383C8.17318 14.8657 8.10157 15.0386 8.10157 15.2189V21.7892H2.21094V11.5939C2.21077 11.564 2.21648 11.5345 2.22776 11.5069C2.23903 11.4793 2.25565 11.4542 2.27665 11.433L11.3391 2.37051C11.3602 2.34927 11.3853 2.33241 11.4129 2.32091C11.4405 2.30941 11.4701 2.30349 11.5 2.30349C11.5299 2.30349 11.5595 2.30941 11.5871 2.32091C11.6147 2.33241 11.6398 2.34927 11.6609 2.37051L20.7234 11.433C20.7444 11.4542 20.761 11.4793 20.7722 11.5069C20.7835 11.5345 20.7892 11.564 20.7891 11.5939V21.7892Z" />
              </svg>
            </div>
          </a>
          <button aria-label="Toggle Dark Mode" className="dark_mode-button header_button">
            <div className="svg-inner_div">
              <div className="svg_wrapper dark_mode_svg sun_wrapper">
                <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x2="12" y2="1" x1="12" y1="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x2="4.22" y2="4.22" x1="5.64" y1="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x2="1" y2="12" x1="3" y1="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x2="4.22" y2="19.78" x1="5.64" y1="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
              <div className="svg_wrapper dark_mode_svg moon_wrapper">
                <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"></path>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </header >
      <div className="header-blur_box" />
    </>
  );
}