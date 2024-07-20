beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests, created by Lisel', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        // Change the test, so the passwords would match
        // Add assertion, that error message is not visible anymore
        // Add assertion, that submit button is now enabled
        cy.get('#username').type('Kasutaja')
        cy.get('#email').type('kasutaja321@gmail.com')
        cy.get('input[name="name"]').type('Lis')
        cy.get('input[name="lastName"]').type('Ka')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input#password').type('Sala321')
        cy.get('#confirm').type('Uussala321')
        cy.get('h2').contains('Password').click()   
        cy.get('[name="confirm"]').type('{enter}')
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#success_message').should('have.css', 'display', 'none')
        cy.get('#password_error_message').should('be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'block')
        cy.get("#password").clear().type("Sala321")
        cy.get("#confirm").clear().type("Sala321")
        cy.get('h2').contains('Password').click()   
        cy.get('[name="confirm"]').type('{enter}')
        cy.get('.submit_button').should('be.enabled')
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
        cy.get('#username').type('Kasutaja')
        cy.get('#email').type('kasutaja321@gmail.com')
        cy.get('input[name="name"]').type('Lis')
        cy.get('input[name="lastName"]').type('Ka')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input#htmlFavLanguage').click()
        cy.get('input#vehicle3').click()    
        cy.get("#cars").select(2)
        cy.get("#animal").select(3)
        cy.get('input#password').type('Sala321')
        cy.get('#confirm').type('Sala321')
        cy.get('h2').contains('Password').click()  
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        inputValidData('Kasutaja')
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    })

    // Add at least 1 test for checking some mandatory field's absence
    it('User can not submit form, when email field is empty', ()=>{   
        inputValidData('Kasutaja')
        cy.get('#email').clear()
        cy.get('h2').contains('Password').click()  
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#success_message').should('have.css', 'display', 'none')
        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests, created by Lisel', () => {
    it('Check that Cerebrum Hub logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        // Create similar test for checking the second picture
        cy.log('Will check logo source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo.png')
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 100).and('be.greaterThan', 70)  
    });


    it('Check navigation part, registration form 1', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part, registration form 3', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })



    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })
   // Create test similar to previous one verifying check boxes
    it('Check that checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('#vehicle1').next().eq(0).should('have.text','I have a bike')
        cy.get('#vehicle2').next().eq(0).should('have.text','I have a car')
        cy.get('#vehicle3').next().eq(0).should('have.text','I have a boat')
        cy.get('#vehicle1').should('not.be.checked')
        cy.get('#vehicle2').should('not.be.checked')
        cy.get('#vehicle3').should('not.be.checked')
        cy.get('#vehicle1').click().should('be.checked')
        cy.get('#vehicle2').should('not.be.checked')
        cy.get('#vehicle3').should('not.be.checked')
        cy.get('#vehicle1').should('be.checked')
        cy.get('#vehicle2').click().should('be.checked')
        cy.get('#vehicle3').should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        // // Here is just an example how to explicitely create screenshot from the code
        // // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it.only('Favourite animal dropdown is correct', () => {
        cy.get('#animal').select(5).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
    })

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('kasutaja321@gmail.com')
    cy.get('[data-cy="name"]').type('Lis')
    cy.get('#lastName').type('Ka')
    cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
    cy.get('#password').type('Sala321')
    cy.get('#confirm').type('Sala321')
    cy.get('h2').contains('Password').click()
}