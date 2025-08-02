const testIngredient: string = 'Флюоресцентная булка R2-D3';
const testDetails: string = 'Детали ингредиента';
const testProfile: string = 'Личный кабинет';
const testConstructor: string = '#burgerConstructor';

describe('service is available', function () {
	before(function () {
		cy.visit('/');
	});

	it('should open constructor page by default', function () {
		cy.contains('Соберите бургер');
	});

	it('should log in', function () {
		cy.visit('/');
		cy.contains(testProfile).click();
		cy.get('.input').as('login-form');
		cy.get('@login-form').find('[class^=text]').first().as('email-input');
		cy.get('@login-form').find('[class^=input__icon]').first().click();
		cy.get('@email-input').type('yolo@mail.ru');
		cy.get('@login-form')
			.find('[class^=text]')
			.last()
			.as('password-input')
			.type('12345');
		cy.contains('Войти').click();
	});

	it('should open and close modal by icon', function () {
		cy.contains(testIngredient).click();
		cy.contains(testDetails).should('be.visible');
		cy.contains(testIngredient).should('be.visible');
		cy.get('#modalCloseButton').click();
	});

	it('should open and close modal by overlay', function () {
		cy.contains(testIngredient).click();
		cy.contains(testDetails).should('be.visible');
		cy.contains(testIngredient).should('be.visible');
		cy.get('#modalOverlay').click(-20, -20, { force: true });
	});

	it('should check drag and drop and make order', function () {
		cy.contains(testIngredient).trigger('dragstart');
		cy.get(testConstructor).trigger('drop');
		cy.get(testConstructor).contains(testIngredient);
		cy.contains('Биокотлета из марсианской Магнолии').trigger('dragstart');
		cy.get(testConstructor).trigger('drop');
		cy.get(testConstructor).contains('Биокотлета из марсианской Магнолии');
		cy.contains('Кристаллы марсианских альфа-сахаридов').trigger('dragstart');
		cy.get(testConstructor).trigger('drop');
		cy.get(testConstructor).contains('Кристаллы марсианских альфа-сахаридов');
		cy.contains('Соус Spicy-X').trigger('dragstart');
		cy.get(testConstructor).trigger('drop');
		cy.get(testConstructor).contains('Соус Spicy-X');
		cy.contains('Оформить заказ').click();
		cy.wait(20000);
		cy.contains('Ваш заказ начали готовить').should('exist');
		cy.get('#modalCloseButton').click();
	});

	it('should log out', function () {
		cy.contains(testProfile).click();
		cy.contains('Выход').click();
		cy.contains('Конструктор').click();
	});
});
