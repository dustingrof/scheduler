describe('Appointments', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  });

  it('should book an interview', () => {
    cy.get('[alt=Add]').first().click();
    cy.get('[data-testid="student-name-input"]').type('Lydia Miller-Jones');
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains('Save').click();
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    cy.get('[alt=Edit]').first().click({ force: true });
    cy.get('[data-testid="student-name-input"]').clear().type('Dustin');
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains('Save').click();
    cy.contains('.appointment__card--show', 'Dustin');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should cancel an interview', () => {
    cy.get('[alt=Delete]').click({ force: true });
    cy.contains('button', 'Confirm').click();
    cy.contains('Deleting...').should('exist');
    cy.contains('Deleting...').should('not.exist');
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});

// describe('Post Resource', () => {
//   it('Creating a New Post', () => {
//     cy.visit('/posts/new'); // 1.

//     cy.get('input.post-title') // 2.
//       .type('My First Post'); // 3.

//     cy.get('input.post-body') // 4.
//       .type('Hello, world!'); // 5.

//     cy.contains('Submit') // 6.
//       .click(); // 7.

//     cy.url() // 8.
//       .should('include', '/posts/my-first-post');

//     cy.get('h1') // 9.
//       .should('contain', 'My First Post');
//   });
// });
