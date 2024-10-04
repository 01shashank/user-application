describe("User application tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should load the homepage and display the user data grid", () => {
    // Check if the Data Grid is displayed
    cy.get(".MuiDataGrid-root").should("exist");

    // Verify that the Data Grid contains expected headers
    cy.get(".MuiDataGrid-columnHeader").should("contain", "Username");
    cy.get(".MuiDataGrid-columnHeader").should("contain", "First Name");
    cy.get(".MuiDataGrid-columnHeader").should("contain", "Last Name");
    cy.get(".MuiDataGrid-columnHeader").should("contain", "Email");
  });

  it("should display the correct number of users in the table", () => {
    // get the data from users.json file
    cy.intercept("GET", "/users.json", { fixture: "users.json" }).as(
      "getUsers"
    );

    // Wait for the request to complete
    cy.wait("@getUsers");
    // Assert that the DataGrid is populated
    cy.get('[role="grid"]')
      .should("exist")
      .find('[role="row"]')
      .should("have.length.greaterThan", 0)
  });

  it("should open the user form and a new User should be created", () => {
    // Click the button to open the dialog
    cy.get("button").contains("Add a User").click();

    // Assert that the dialog is visible
    cy.get('[role="dialog"]').should("be.visible");

    // Check the dialog content
    cy.get('[role="dialog"]').within(() => {
      cy.get("p").should("contain.text", "USER FORM");
    });

    // Fill out the form fields
    cy.get('input[name="userName"]').type("testUser");
    cy.get('input[name="firstName"]').type("testFName");
    cy.get('input[name="lastName"]').type("testLName");
    cy.get('input[name="email"]').type("testEmail@example.com");

    // Submit the form
    cy.get('button[type="submit"]').click();
  });

  it("should call the generate user api and the user should be saved", () => {
    // Click the button to open the dialog
    cy.get("button").contains("Add a User").click();

    // Assert that the dialog is visible
    cy.get('[role="dialog"]').should("be.visible");
    
    //Generate the user by clicking Generate Button
    cy.get("button").contains("Generate").click();

    // Submit the form
    cy.get('button[type="submit"]').click();
  });
});
