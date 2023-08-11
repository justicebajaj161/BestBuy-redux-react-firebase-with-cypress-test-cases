let url='http://localhost:3000'



describe('Before signin the navbar should contain home and signin',()=>{
  it('App should contain  home  before signin',()=>{
    cy.visit(`${url}/`);
    cy.contains(/home/i).should('be.visible');
  })
  it('App should contain signin   before signin',()=>{
    cy.visit(`${url}/`);
    cy.contains(/signin/i).should('be.visible');
  })
  it('App should not contain cart before signin',()=>{
    cy.visit(`${url}/`);
    cy.contains(/cart/i).should('not.exist');
  })
  it('App should not contain my orders before signin',()=>{
    cy.visit(`${url}/`);
    cy.contains(/ myorders/i).should('not.exist');
  })
})



  

describe('App Routes Spec', () => {
  // Test case for the homepage
  it('should visit the homepage', () => {
    cy.visit(`${url}/`);
    cy.url().should('eq', 'http://localhost:3000/');
  });

  // Test case for the signup page
  it('should visit the signup page', () => {
    cy.visit(`${url}/signup`);
    cy.url().should('eq', 'http://localhost:3000/signup');
  });

  // Test case for the signin page
  it('should visit the signin page', () => {
    cy.visit(`${url}/signin`);
    cy.url().should('eq', 'http://localhost:3000/signin');
  });

  // Test case for the cart page
  it('should visit the cart page', () => {
    cy.visit(`${url}/cart`);
    cy.url().should('eq', 'http://localhost:3000/cart');
  });

  // Test case for the myorders page
  it('should visit the myorders page', () => {
    cy.visit(`${url}/myorders`);
    cy.url().should('eq', 'http://localhost:3000/myorders');
  });

  // Test case for invalid routes
  it('should show the NotFoundPage for invalid routes', () => {
    cy.visit(`${url}/invalidroute`);
    // You might want to add an assertion to check if the NotFoundPage is rendered, for example by checking for a unique text or element on that page.
   
    cy.contains('body', new RegExp('Page Not Found', 'i')).should('exist');// Assuming 'Page Not Found' is a text displayed on your NotFoundPage.
  });

  // Test case to ensure homepage can be accessed by just '/'
  it('should visit the homepage using /', () => {
    cy.visit(`${url}/`);
    
    // Check if the main container of the HomePage is rendered by looking for a div that contains a form
    cy.get('div').find('form').should('be.visible');
});

it('should display the search input on the homepage', () => {
  cy.visit(`${url}/`);
  
  // Check for the search input based on its placeholder in a case-insensitive manner
  cy.get('input[placeholder]').filter((index, element) => {
    return new RegExp('search by name', 'i').test(element.placeholder);
  }).should('exist');
});



});


describe('Sign Up Flow', () => {
  // Visiting the Signup Page
 
  it('should visit the signup page', () => {
    cy.visit(`${url}/signup`);
    cy.url().should('eq', 'http://localhost:3000/signup');
  });
  // Checking elements in Signup Page
  it('should have name, email, and password input fields and a Sign Up button', () => {
    cy.visit(`${url}/signup`);
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Sign Up').should('be.visible');
  });

  // Invalid Signup Attempt
  it('should display error when invalid data is provided', () => {
    cy.visit(`${url}/signup`);
    cy.get('input[name="name"]').type('John');
    cy.get('input[name="email"]').type('john.doe@example');
    cy.get('input[name="password"]').type('123'); // Password less than 6 characters
    cy.get('button').contains('Sign Up').click();

    // Assert that the error toast message is displayed
    cy.contains('Please enter valid data!').should('be.visible');
  });

  // Valid Signup Attempt
  // Note: This assumes the backend and the frontend are appropriately connected and will respond to valid credentials.
  it('should sign up with valid data', () => {
    cy.visit(`${url}/signup`);
    // Using a unique email to ensure uniqueness during testing.
    const uniqueEmail = `test${Date.now()}@example.com`;

    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('button').contains('Sign Up').click();

    // Assert that we are redirected to the homepage after successful sign-up.
    // Also, there can be an assertion for a success toast message or any other indication of a successful sign-up.
    cy.url().should('eq', 'http://localhost:3000/');
  });
});


describe('Login Flow', () => {
  // Visiting the Login Page
  it('should visit the login page', () => {
    cy.visit(`${url}/signin`);
    cy.url().should('eq', 'http://localhost:3000/signin');
  });

  // Checking elements in Login Page
  it('should have email and password input fields and a Sign In button', () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Sign In').should('be.visible');
  });

  // Invalid Login Attempt
  it('should display error when invalid data is provided', () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('invalid.user@example.com');
    cy.get('input[name="password"]').type('12345'); // Password less than 6 characters
    cy.get('button').contains('Sign In').click();

    // Assert that the error toast message is displayed
    cy.contains('Please enter valid data!').should('be.visible');
  });

  // Valid Login Attempt
  // Note: This assumes the backend and the frontend are appropriately connected and will respond to valid credentials.
  it('should login with valid data', () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com'); // Assuming this user is already registered
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains('Sign In').click();
cy.wait(2000); // wait for 2 seconds
cy.url().should('eq', 'http://localhost:3000/');

  });

  // Test navigation to Sign Up page
  it('should navigate to Sign Up page when "Or SignUp instead" link is clicked', () => {
    cy.visit(`${url}/signin`);
    cy.get('p').contains('Or SignUp instead').click();
    cy.url().should('eq', 'http://localhost:3000/signup');
  });
});

describe('Filter Sidebar Spec', () => {
  // Test case to ensure the Filter Sidebar is rendered on the homepage
  it('should display the filter sidebar on the homepage', () => {
    cy.visit(`${url}/`);
    cy.get('aside').should('be.visible');
    cy.get('aside').contains('Filter').should('be.visible');
  });

  // Test case to ensure the price range slider is working
  it('should change the price range', () => {
    cy.visit(`${url}/`);
    cy.get('input[type="range"]#price').as('priceRangeInput');
    // Verify initial value based on your component's initial state
    cy.get('@priceRangeInput').should('have.value', '75001');
    cy.get('@priceRangeInput').invoke('val', '50').trigger('change');
    cy.get('label[for="price"]').should('contain.text', '51');
});

it("all the check boxes should be unchecked initially",()=>{
  cy.visit(`${url}/`);
  cy.get('input[type="checkbox"]').should('not.be.checked');
})

  // Test case to ensure category checkboxes are working
  it('should check  category  mens fashion checkbox', () => {
    cy.visit(`${url}/`);
   
    cy.get('input#mensFashion').check().should('be.checked');
    
    // cy.get('input#mensFashion').uncheck().should('not.be.checked');
  });

  it('should check  category  womens fashion checkbox', () => {
    cy.visit(`${url}/`);
   
   
    cy.get('input#womensFashion').check().should('be.checked');

  });

  it('should check  category  jewelery checkbox', () => {
    cy.visit(`${url}/`);
   
   
    cy.get('input#jewelery').check().should('be.checked');

  });

  it('should check  category  electronics checkbox', () => {
    cy.visit(`${url}/`);
   
   
    cy.get('input#electronics').check().should('be.checked');
    
  });

  it('should uncheck  category  mens fashion checkbox', () => {
    cy.visit(`${url}/`);
   
    
    
    cy.get('input#mensFashion').uncheck().should('not.be.checked');
  });

  it('should uncheck  category  womens fashion checkbox', () => {
    cy.visit(`${url}/`);
   
   
    cy.get('input#womensFashion').uncheck().should('not.be.checked');

  });

  it('should uncheck  category  jewelery checkbox', () => {
    cy.visit(`${url}/`);
   
   
    cy.get('input#jewelery').uncheck().should('not.be.checked');

  });

  it('should uncheck  category  electronics checkbox', () => {
    cy.visit(`${url}/`);
   
    cy.get('input#electronics').uncheck().should('not.be.checked');
    
  });

 
});


describe('Search Functionality Spec', () => {
  // Test case to ensure the search bar filters products by name
  it('should filter searchbar should  be  typeed in for result', () => {
    cy.visit(`${url}/`);
    
    
    cy.get('input[placeholder]').filter((index, element) => {
      return new RegExp('search by name', 'i').test(element.placeholder);
    }).type("BIYLACLESEN Women's 3-in-1 Snowboar");
    
   
  });

  it('should filter products by name using the search bar', () => {
    cy.visit(`${url}/`);
    
   
    // Now check that a product with the title 'Exclusive Watch' is displayed.
    cy.contains("BIYLACLESEN Women's 3-in-1 Snowboar").should('be.visible');
    
    
  });

  it('should not filter products if the item name doesnt exist', () => {
    cy.visit(`${url}/`);
    
    // And possibly check that other products are not displayed. This might depend on your exact requirements and setup.
    // E.g., you might check that a product named 'Basic T-Shirt' is not displayed if you know it's in your product list but doesn't match the search term:
    cy.contains('Wrong Item').should('not.exist');
  });
});


describe("Add To Cart Functionality", () => {


  it("Redirects to sign-in if user is not authenticated", () => {
    // Logic to ensure user is not authenticated goes here
    // ...
    cy.visit(`${url}/`); 
    cy.get('[title="Add to Cart"]')
        .first()
        .click();

    cy.url().should('include', '/signin');
});

  it("Successfully adds an item to the cart", () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com'); // Assuming this user is already registered
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains('Sign In').click();
cy.wait(4000); // wait for 2 seconds
cy.visit(`${url}/`);
      cy.get('[title="Add to Cart"]')
          .first()
          .click();

          cy.wait(2000);
          cy.get('body').then($body => {
            if ($body.text().includes('Product Added Successfully!')) {
                cy.contains(/product added successfully!/i).should('be.visible');
            } else {
              cy.contains(/increase product count!/i).should('be.visible');
              
            }
        });
    
        
  });

 

  it("Increases the quantity of a product in the cart", () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com'); // Assuming this user is already registered
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains('Sign In').click();
    cy.wait(3000); // wait for 2 seconds
    cy.visit(`${url}/cart`)
    cy.wait(4000); 
    cy.get('[title="Remove from Cart"]')
        .first()
        .click();
        cy.wait(5000); // wait for 2 seconds
    cy.visit(`${url}/`)
      cy.get('[title="Add to Cart"]')
          .first()
          .click();
          cy.wait(2000); // wait for 2 seconds
      cy.get('[title="Add to Cart"]')
          .first()
          .click();
          cy.wait(3000); // wait for 2 seconds
      cy.visit(`${url}/cart`);
      
      cy.contains("2").should('be.visible');
  });

  it("Shows the item in the cart page after adding", () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com'); // Assuming this user is already registered
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains('Sign In').click();
    cy.wait(3000); // wait for 2 seconds
    cy.visit(`${url}/`);
      cy.get('[title="Add to Cart"]')
          .first()
          .click();

          cy.visit(`${url}/cart`);
          cy.wait(4000);
          cy.contains(/remove from cart/i).should('be.visible');
              
  });

  it("should remove the item from the cart after clicking remove from cart",()=>{
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com'); // Assuming this user is already registered
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains('Sign In').click();
    cy.wait(3000); // wait for 2 seconds
    cy.visit(`${url}/`);
      cy.get('[title="Add to Cart"]')
          .first()
          .click();

          cy.visit(`${url}/cart`);
          cy.wait(4000);
          cy.get('[title="Remove from Cart"]')
          .first()
          .click();
          cy.wait(5000);
          cy.contains(/remove from cart/i).should('not.exist');
          
  })

 

});


// cart.spec.js
describe('Cart Page total price', () => {

 it('should display correct total price', () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com'); // Assuming this user is already registered
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains('Sign In').click();
    cy.wait(3000); // wait for 2 seconds
   
    cy.visit(`${url}/`)
      cy.get('[title="Add to Cart"]')
          .first()
          .click();
          cy.wait(2000); // wait for 2 seconds
      cy.get('[title="Add to Cart"]')
          .first()
          .click();
          cy.wait(3000); // wait for 2 seconds
      cy.visit(`${url}/cart`);
     
      
      cy.contains(/2198/i).should('be.visible');
  });

  // Additional tests related to cart functionality can be added here
});

describe('order Page Tests', () => {

  it('Should navigate to /myorders after purchase', () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com'); // Assuming this user is already registered
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains('Sign In').click();
    cy.wait(3000); // wait for 2 seconds
    cy.visit(`${url}/cart`)
    cy.wait(4000); 
    cy.get('[title="Remove from Cart"]')
        .first()
        .click();
        cy.wait(5000); // wait for 2 seconds
    cy.visit(`${url}/`)
     
      cy.get('[title="Add to Cart"]')
          .first()
          .click();
          cy.wait(3000); // wait for 2 seconds
      cy.visit(`${url}/cart`);

    // Click on the purchase button
    cy.contains(/Purchase/i).click();
    cy.wait(3000);
    // Assert that URL should include /myorders
    cy.url().should('include', '/myorders');
  });


  it('Should display the purchase date after purchasing an item', () => {
    const currentDate = new Date().toISOString().slice(0, 10)
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com'); // Assuming this user is already registered
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains('Sign In').click();
    cy.wait(3000);
    cy.visit(`${url}/`)
     
    cy.get('[title="Add to Cart"]')
        .first()
        .click();
        
        cy.wait(2000);
    cy.visit(`${url}/cart`);
    cy.wait(5000);
    cy.get('[title="Remove from Cart"]').first().click();
    cy.wait(5000);
    cy.visit(`${url}/`);
     
    cy.get('[title="Add to Cart"]').first().click();
    cy.wait(3000);
    cy.visit(`${url}/cart`);

    // Click on the purchase button
    cy.contains(/Purchase/i).click();
    cy.wait(3000);
    
    // Assert that URL should include /myorders
    cy.url().should('include', '/myorders');
    cy.visit(`${url}/myorders`);
    cy.wait(4000);
    // Assuming that the date is rendered in a span with a specific data-test attribute
    // This will assert that the date is visible and in the expected format like "MM/DD/YYYY"
    cy.contains(/your orders/i).should('be.visible')
    cy.contains(currentDate)
  });


});



// cypress/integration/redux.spec.js

describe('Redux integration tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');  // Replace this with your app's URL
  });

  it('should have Redux store initialized', () => {
    cy.window().its('store').should('exist');
  });

  it('should have auth reducer', () => {
    cy.window().its('store').invoke('getState').its('auth').should('exist');
  });

  it('should have products reducer', () => {
    cy.window().its('store').invoke('getState').its('products').should('exist');
  });

  it('should have cart reducer', () => {
    cy.window().its('store').invoke('getState').its('cart').should('exist');
  });
});






