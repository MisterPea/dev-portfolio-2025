const website = 'http://localhost:8080/';
const headline = "I'm Perry, Design-Minded Developer and Programmatic Pixel Pusher based in Brooklyn, NY.";

describe( 'Home Page', () => {
  beforeEach( () => {
    cy.visit( website );
  } );

  it( 'should show the proper headline', () => {
    cy.get( '.landing-headline' ).contains( headline );
  } );

  it( 'should not show the "Home" button', () => {
    cy.get( '.header-buttons_holder a' ).should( 'not.be.visible' );
  } );

  it( 'should toggle dark-mode when button is clicked', () => {
    cy.get( 'html' )
      .invoke( 'attr', 'data-color-scheme' )
      .then( ( currentMode ) => {
        const opposite = currentMode === 'light' ? 'dark' : 'light';
        cy.log( `Current mode: ${currentMode}, Expected after click: ${opposite}` );
        cy.get( 'button.dark_mode-button' ).click();
        cy.get( 'html' )
          .invoke( 'attr', 'data-color-scheme' )
          .should( 'eq', opposite )
          .then( ( newMode ) => {
            cy.log( `New mode after click: ${newMode}` );
          } );
      } );
  } );

  it( 'should have a section divider for "Selected Works"', () => {
    cy.get( '.section_divider' ).contains( 'Selected Works' );
  } );

  it( 'should have a 3 projects', () => {
    cy.get( '.landing-projects_section' ).find( 'a' ).should( 'have.length', 3 );
  } );

  /* Project click-throughs */
  it( 'should have a click-through for the project: Word Salad Sifter', () => {
    cy.get( '.landing-projects_section' )
      .find( 'a[href="/projects/word-salad-sifter"]' )
      .click();
    cy.url().should( 'contain', '/projects/word-salad-sifter' );
  } );

  it( 'should have a click-through for the project: the.times.pilot', () => {
    cy.get( '.landing-projects_section' )
      .find( 'a[href="/projects/the-times-pilot"]' )
      .click();
    cy.url().should( 'contain', '/projects/the-times-pilot' );
  } );

  it( 'should have a click-through for the project: Circuit Project', () => {
    cy.get( '.landing-projects_section' )
      .find( 'a[href="/projects/circuit-app"]' )
      .click();
    cy.url().should( 'contain', '/projects/circuit-app' );
  } );

  it( 'should have an "About" section divider', () => {
    cy.get( '.landing-about_section' ).find( '.section_divider' ).contains( 'About' );
  } );

  it( 'should have "About" section text', () => {
    cy.get( '.about_text' ).contains( 'multi-disciplinary maker based in New York City' );
  } );

  it( 'should have Colophon with proper links', () => {
    cy.get( '.about-colophon-text' )
      .find( 'a[href="https://www.11ty.dev"]' );
    cy.get( '.about-colophon-text' )
      .find( 'a[href="https://lokalcontainer.com/LCT-BDO-Grotesk-Test-Area"]' );
    cy.get( '.about-colophon-text' )
      .find( 'a[href="https://github.com/MisterPea/dev-portfolio-2025"]' );
  } );

  it( "should have a footer with links to LinkedIn, GitHub, and Email", () => {
    cy.get( 'footer' )
      .find( 'a[href="https://www.linkedin.com/in/perry-angelora/"]' );
    cy.get( 'footer' )
      .find( 'a[href="https://github.com/MisterPea"]' );
    cy.get( 'footer' )
      .find( 'button[class*="render-mail"]' );
  } );
} );