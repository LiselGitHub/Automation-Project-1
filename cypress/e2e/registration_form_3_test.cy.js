beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
        * checkboxes, their content and links
        * email format
*/

describe("Bonus: Visual tests, created by Lisel", () => {
    
    it("Check that radio button list is correct", () => {
      cy.get('input[type="radio"]').should("have.length", 4);
    
      cy.get("input[type=radio]").next().eq(0).should("have.text", "Daily");
      cy.get("input[type=radio]").next().eq(1).should("have.text", "Weekly");
      cy.get("input[type=radio]").next().eq(2).should("have.text", "Monthly");
      cy.get("input[type=radio]").next().eq(3).should("have.text", "Never");
    
      cy.get('input[type="radio"]').eq(0).should("not.be.checked");
      cy.get('input[type="radio"]').eq(1).should("not.be.checked");
      cy.get('input[type="radio"]').eq(2).should("not.be.checked");
      cy.get('input[type="radio"]').eq(3).should("not.be.checked");
    
      cy.get('input[type="radio"]').eq(3).check().should("be.checked");
      cy.get('input[type="radio"]').eq(2).check().should("be.checked");
      cy.get('input[type="radio"]').eq(3).should("not.be.checked");
    });

    it("Check that Country dropdown list is correct and City dropdown updates accordingly", () => {
      
      cy.get("#country").children().should("have.length", 4);
  
      cy.get("#country").select("Austria").should("have.value", "object:5");
  
      cy.get("#city").select("Vienna");
      cy.get("#city").should("contain", "Vienna");
  
      cy.get("#country").select("Estonia").should("have.value", "object:4");
  
      cy.get("#city").find("option").should("not.contain", "Vienna");
  
      cy.get("#city").select("Tallinn");
      cy.get("#city").should("contain", "Tallinn");
    });
  
    it("Check that checkbox list is correct", () => {
        cy.get('input[type="checkbox"]').should("have.length", 2);

        cy.get('input[type="checkbox"]').next().eq(0).should("have.text", "");
        cy.get('input[type="checkbox"]').next().eq(1).should("have.text", "Accept our cookie policy");
    
        cy.get('input[type="checkbox"]').eq(0).should("not.be.checked");
        cy.get('input[type="checkbox"]').eq(1).should("not.be.checked");
    
        cy.get('input[type="checkbox"]').eq(0).check().should("be.checked");
        cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");
    
        cy.get('button a[href="cookiePolicy.html"]').click();
        cy.url().should("include", "cookiePolicy.html");
        cy.go("back");
        cy.log('Back again in registration form 3')
    
        cy.get('input[type="checkbox"]').eq(0).check().should("be.checked");
        cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");
    });
  
    it("Check that email format is correct", () => {
      cy.get('input[name="email"]').type("email.com");
      cy.get('#emailAlert').should("be.visible").and("contain", "Invalid email address");
      cy.get('input[type="submit"]').should("be.disabled");
      cy.get('input[name="email"]').clear();
      cy.get('input[name="email"]').type("email@domain.com");
      cy.get('#emailAlert').should("not.be.visible");
    });

  });


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */
describe("Bonus: Functional tests, created by Lisel", () => {
   
    it("User can submit form with all fields valid", () => {
      cy.get('#name').type('Lis');
      cy.get('input[name="email"]').type('email@domain.com');
      cy.get('#emailAlert').should("not.be.visible");
      cy.get("#country").select("object:3").should("contain", "Spain");
      cy.get("#city").select("Malaga").should("contain", "Malaga");
  
      cy.get('input[type="date"]').first().type("2024-07-18");
      cy.get('input[type="radio"]').check("Daily");
      cy.get("#birthday").type('1991-07-10');
      cy.get('input[type="checkbox"]').eq(0).check();
      cy.get('input[type="checkbox"]').eq(0).should("be.checked");
      cy.get('input[type="checkbox"]').eq(1).check();
      cy.get('input[type="checkbox"]').eq(1).should("be.checked");
      cy.get("#checkboxAlert").should("not.be.visible");
      const fileNamex = "cypress/fixtures/image1.jpg";
  cy.get("#myFile").selectFile(fileNamex);
      cy.get('button[type="submit"]').click();
      cy.go("back");
      cy.log("Back again in Registration form 3");
    });
  

    it("User fills only mandatory fields", () => {
      cy.get("#name").type("Lis");
      cy.get('input[name="email"]').type("email@domain.com");
      cy.get("#emailAlert").should("not.be.visible");
      cy.get("#country").select("object:3").should("contain", "Spain");
      cy.get("#city").select("Malaga").should("contain", "Malaga");
      cy.get("#birthday").type("1991-07-10");
      cy.get('input[type="checkbox"]').eq(0).check();
      cy.get('input[type="checkbox"]').eq(0).should("be.checked");
      cy.get('input[type="checkbox"]').eq(1).check();
      cy.get('input[type="checkbox"]').eq(1).should("be.checked");
      cy.get("#checkboxAlert").should("not.be.visible");
      cy.get('button[type="submit"]').click();
      cy.go("back");
      cy.log("Back again in Registration form 3");

    });
  
    it("Mandatory fields are empty with corresponding assertions", () => {
      inputEmptyMandatoryFields();
    });
  
    it("Uploading a file", () => {
      const fileNamex = "cypress/fixtures/image1.jpg";
  cy.get("#myFile").selectFile(fileNamex);
      cy.get("button[type='submit']").should("contain", "Submit file").click();
      cy.go("back");
      cy.get("#myFile").should("have.value", "");
      cy.log("Back again in Registration form 3");
    });
  });
  
  function inputEmptyMandatoryFields() {
    cy.log("Leaving mandatory fields empty");
    cy.get('input[name="email"]').clear().type("a").clear().blur();
    cy.get("#name").clear().type("a").clear().blur();
    cy.get("div#emailAlert").should("be.visible");
    cy.get("div#emailAlert span[ng-show='myForm.email.$error.required']")
      .should("be.visible")
      .and("contain", "Email is required");
    cy.get('input[type="checkbox"]').eq(0).uncheck();
    cy.get("#checkboxAlert").should("not.be.visible")
    cy.get('input[type="checkbox"]').eq(0).should("have.class", "ng-invalid");
    cy.get('input[type="submit"]').should("be.disabled");
  
  }
  
